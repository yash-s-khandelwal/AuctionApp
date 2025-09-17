import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ArtPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v0/category/getProductInCategoryByName/art`
        );
        if (Array.isArray(response.data)) {
          const now = new Date();
          const liveAuctions = response.data.filter(product => {
            const start = new Date(product.auctionStartDate);
            const end = new Date(product.auctionEndDate);
            return start <= now && now < end;
          });
          setProducts(liveAuctions);
        } else {
          setProducts([]); // fallback to mock
        }
      } catch (err) {
        setProducts([]); // fallback to mock
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  // Currency conversion logic
  const conversionRates = { USD: 1, INR: 83, EUR: 0.93, GBP: 0.8 };
  const currencySymbols = { USD: '$', INR: '₹', EUR: '€', GBP: '£' };
  function convertPrice(price, from, to) {
    if (from === to) return price;
    return Math.round(price * (conversionRates[to] / conversionRates[from]));
  }

  // Mock art products if API fails or returns no products
  const mockArt = [
    {
      productId: 301,
      productName: 'Antique Vase',
      price: 3500,
      auctionStartDate: '2025-09-24',
      auctionEndDate: '2025-10-04',
      imagePath: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    },
    {
      productId: 302,
      productName: 'Modern Painting',
      price: 5000,
      auctionStartDate: '2025-09-25',
      auctionEndDate: '2025-10-05',
      imagePath: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    },
    {
      productId: 303,
      productName: 'Sculpture',
      price: 4200,
      auctionStartDate: '2025-09-26',
      auctionEndDate: '2025-10-06',
      imagePath: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
  ];
  const showProducts = products.length > 0 ? products : mockArt;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#7A1528', marginBottom: '2rem'}}>Art Auctions</h2>
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center", background: "#f5f5f5", padding: "32px 0" }}>
        {showProducts.map((product, idx) => (
          <div key={product.productId || idx} style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
            width: "340px",
            margin: "16px",
            padding: "1.2rem 0.8rem 1.1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "0.2px solid #e0e0e0",
          }}>
            <img src={product.imagePath} alt={product.productName} style={{
              width: "100%",
              maxWidth: "300px",
              height: "210px",
              objectFit: "cover",
              borderRadius: "14px",
              marginBottom: "1.3rem",
              boxShadow: "0 6px 24px rgba(122,21,40,0.13)",
              border: "none",
              outline: "none",
              transition: "box-shadow 0.2s",
            }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#222',
              margin: '0 0 0.7rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}>{product.productName}</h3>
            <div style={{
              fontWeight: '500',
              color: '#444',
              fontSize: '1.08rem',
              margin: '0 0 0.7rem',
              textAlign: 'center',
            }}>
              MinimumBid: <span style={{color: '#7A1528', fontWeight: '700'}}>{currencySymbols['USD']}{convertPrice(product.price, 'USD', 'USD')}</span>
            </div>
            <div style={{
              color: '#7A1528',
              fontSize: '1.08rem',
              fontWeight: '600',
              margin: '0 0 1.2rem',
              textAlign: 'center',
            }}>
              Auction: {new Date(product.auctionStartDate).toLocaleDateString()} - {new Date(product.auctionEndDate).toLocaleDateString()}
            </div>
            <a
              href={`/product/${product.productId}`}
              style={{
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
                cursor: 'pointer',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtPage;
