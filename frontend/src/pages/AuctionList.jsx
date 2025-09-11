import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuctionList.css";

function AuctionList() {
  // State to store products
  const [products, setProducts] = useState([]);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v0/product/allProducts");
        setProducts(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="auction-list">
      <h2 className="auction-title">Available Auctions</h2>
      <div className="auction-grid">
        {products.map((p) => (
          <div className="auction-card" key={p.productId}>
            {/* Optional: Add an image if your API returns one */}
            {/* <img src={p.image} alt={p.productName} className="auction-img" /> */}
            <h3>{p.productName}</h3>
            <p>Price: ${p.price}</p>
            <p>
              Auction: {new Date(p.auctionStartDate).toLocaleDateString()} -{" "}
              {new Date(p.auctionEndDate).toLocaleDateString()}
            </p>
            <Link to={`/product/${p.productId}`} className="auction-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionList;
