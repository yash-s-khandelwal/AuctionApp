import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuctionList.css";
import productMock from '../data/productMock';

function LiveAuctionList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v0/product/allProducts");
        // Only show auctions where current time < auctionEndDate
        const now = new Date();
        const live = response.data.filter(p => new Date(p.auctionEndDate) > now);
        setProducts(live);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Currency conversion logic
  const conversionRates = { USD: 1, INR: 83, EUR: 0.93, GBP: 0.8 };
  const currencySymbols = { USD: '$', INR: '₹', EUR: '€', GBP: '£' };
  const currency = typeof window !== 'undefined' && window.__AUCTION_CURRENCY_PROPS__ ? window.__AUCTION_CURRENCY_PROPS__.currency : 'USD';
  function convertPrice(price, from, to) {
    if (from === to) return price;
    return Math.round(price * (conversionRates[to] / conversionRates[from]));
  }

  // Filter products by search query (name, description, seller fields)
  const filteredProducts = products.filter(p => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const seller = p.user || {};
    return (
      (p.productName && p.productName.toLowerCase().includes(query)) ||
      (p.productDescription && p.productDescription.toLowerCase().includes(query)) ||
      (seller.username && seller.username.toLowerCase().includes(query)) ||
      (seller.email && seller.email.toLowerCase().includes(query)) ||
      (seller.firstName && seller.firstName.toLowerCase().includes(query)) ||
      (seller.lastName && seller.lastName.toLowerCase().includes(query))
    );
  });
  if (loading) return <p>Loading live auctions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="auction-list stylish-bg">
      <h2 className="auction-title" style={{fontSize: '2.2rem', fontWeight: '700', color: '#222', marginBottom: '2rem'}}>Live Auctions</h2>
      <div className="auction-grid stylish-grid">
        {filteredProducts.map((p) => {
          // Try to get image from API, else fallback to productMock by name
          let imgSrc = p.image;
          if (!imgSrc) {
            const mock = productMock.find(m => m.name === p.productName || m.name === p.name);
            imgSrc = mock ? mock.image : `https://picsum.photos/seed/${p.productId}/400/300`;
          }
          return (
            <div className="auction-card stylish-card" key={p.productId} style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
              padding: '1.2rem 0.8rem 1.1rem',
              margin: '1.2rem 0',
              border: '0.2px solid #e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '260px',
              maxWidth: '340px',
            }}>
              <img src={imgSrc} alt={p.productName} className="auction-img" style={{
                borderRadius: '14px',
                boxShadow: '0 6px 24px rgba(122,21,40,0.13)',
                width: '100%',
                maxWidth: '300px',
                height: '210px',
                objectFit: 'cover',
                marginBottom: '1.3rem',
                border: 'none',
                outline: 'none',
                transition: 'box-shadow 0.2s',
              }} />
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#222',
                margin: '0 0 0.7rem',
                textAlign: 'center',
                letterSpacing: '0.02em',
              }}>{p.productName}</h3>
              <p style={{
                fontWeight: '500',
                color: '#444',
                fontSize: '1.08rem',
                margin: '0 0 0.7rem',
                textAlign: 'center',
              }}>
                MinimumBid: <span style={{color: '#7A1528', fontWeight: '700'}}>{currencySymbols[currency]}{convertPrice(p.price, 'USD', currency)}</span>
              </p>
              <p style={{
                color: '#7A1528',
                fontSize: '1.08rem',
                fontWeight: '600',
                margin: '0 0 1.2rem',
                textAlign: 'center',
              }}>
                Auction: {new Date(p.auctionStartDate).toLocaleDateString()} - {new Date(p.auctionEndDate).toLocaleDateString()}
              </p>
              <Link to={`/product/${p.productId}`} className="auction-link" style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                background: 'linear-gradient(90deg, #7A1528 60%, #a83250 100%)',
                color: '#fff',
                padding: '0.7rem 2.2rem',
                borderRadius: '7px',
                fontWeight: '700',
                fontSize: '1.08rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(122,21,40,0.08)',
                border: 'none',
                transition: 'background 0.2s',
                letterSpacing: '0.03em',
              }}>View Details</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveAuctionList;
