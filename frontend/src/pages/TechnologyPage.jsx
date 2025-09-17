import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TechnologyPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v0/category/getProductInCategoryByName/technology`
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

  // Mock technology products if API fails or returns no products
  const mockTechnology = [
    {
      productId: 201,
      productName: 'Smartphone',
      price: 3200,
      auctionStartDate: '2025-09-21',
      auctionEndDate: '2025-09-31',
      imagePath: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    },
    {
      productId: 202,
      productName: 'Gaming Console',
      price: 4000,
      auctionStartDate: '2025-09-22',
      auctionEndDate: '2025-10-01',
      imagePath: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    },
    {
      productId: 203,
      productName: 'Sports Bicycle',
      price: 2500,
      auctionStartDate: '2025-09-23',
      auctionEndDate: '2025-10-02',
      imagePath: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=400&q=80',
    },
  ];
  const showProducts = products.length > 0 ? products : mockTechnology;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#7A1528', marginBottom: '2rem'}}>Technology Auctions</h2>
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

export default TechnologyPage;
