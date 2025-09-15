import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuctionList.css";

function PassedAuctionList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v0/product/allProducts");
        // Only show auctions where current time > auctionEndDate
        const now = new Date();
        let passed = response.data.filter(p => new Date(p.auctionEndDate) <= now);
        // If no passed auctions, add some mock data
        if (passed.length === 0) {
          passed = [
            {
              productId: "mock1",
              productName: "Vintage Clock",
              price: 120,
              auctionStartDate: "2025-08-01T10:00:00Z",
              auctionEndDate: "2025-08-10T10:00:00Z"
            },
            {
              productId: "mock2",
              productName: "Antique Vase",
              price: 250,
              auctionStartDate: "2025-07-15T09:00:00Z",
              auctionEndDate: "2025-07-20T09:00:00Z"
            }
          ];
        }
        setProducts(passed);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading passed auctions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="auction-list stylish-bg">
      <h2 className="auction-title" style={{fontSize: '2.2rem', fontWeight: '700', color: '#222', marginBottom: '2rem'}}>Passed Auctions</h2>
      <div className="auction-grid stylish-grid">
        {products.map((p) => (
          <div className="auction-card stylish-card" key={p.productId}>
            <img src={`https://picsum.photos/seed/${p.productId}/400/300`} alt={p.productName} className="auction-img" style={{borderRadius: '16px', boxShadow: '0 2px 12px rgba(255, 255, 255, 0.1)'}} />
            <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ffffffff', margin: '1rem 0 0.5rem'}}>{p.productName}</h3>
            <p style={{fontWeight: '600', color: '#333'}}>MinimumBid: <span style={{color: 'rgba(18, 18, 19, 1)'}}>${p.price}</span></p>
            <p style={{color: '#555', fontSize: '1rem'}}>Auction: {new Date(p.auctionStartDate).toLocaleDateString()} - {new Date(p.auctionEndDate).toLocaleDateString()}</p>
            <Link to={`/product/${p.productId}`} className="auction-link" style={{display: 'inline-block', marginTop: '1rem', background: '#7A1528', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s'}}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassedAuctionList;
