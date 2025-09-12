import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css";
import AuctionTimer from "../components/AuctionTimer";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v0/product/getProductDetails/${productId}`);
        setData(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!data || !data.product) return <p>No product found.</p>;

  const { product, bids } = data;

  return (
    <div className="product-details-card">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back to Auctions</button>
      <div className="product-details-flex">
        <div className="product-image-section">
          <img src={`https://picsum.photos/seed/${product.productId}/500/400`} alt={product.productName} className="product-details-img" />
          {/* Auction Timer below image */}
          <div className="auction-timer-box">
            <AuctionTimer endTime={product.auctionEndDate} />
          </div>
          {/* Place Bid input and button below timer */}
          <BidInput bids={bids} minimumBid={product.minimumBid} />
        </div>
        <div className="product-info-section">
          <h2 className="product-title">{product.productName}</h2>
          <p className="product-minbid"><strong>Minimum Bid:</strong> ${product.minimumBid}</p>
          <p className="product-desc"><strong>Description:</strong> {product.productDescription}</p>
          <p><strong>Auction Dates:</strong> {new Date(product.auctionStartDate).toLocaleDateString()} - {new Date(product.auctionEndDate).toLocaleDateString()}</p>
          <p><strong>Seller:</strong> {product.user.firstName} {product.user.lastName} ({product.user.username})</p>
          <div className="bids-section">
            <h3>Bids</h3>
            {bids && bids.length > 0 ? (
              <ul>
                {(() => {
                  const maxBid = Math.max(...bids.map(bid => bid.price));
                  return bids.map(bid => (
                    <li key={bid.bidId}>
                      <span className="bid-price" style={{ color: bid.price === maxBid ? "green" : "black", fontWeight: bid.price === maxBid ? "bold" : "normal" }}>
                        ${bid.price}
                      </span> by {bid.user.firstName} {bid.user.lastName} <span className="bid-username">({bid.user.username})</span>
                    </li>
                  ));
                })()}
              </ul>
            ) : (
              <p className="no-bids">No bids yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// BidInput component for bid validation and error message
function BidInput({ bids, minimumBid }) {
  const [bidAmount, setBidAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const maxBid = bids && bids.length > 0 ? Math.max(...bids.map(bid => bid.price)) : minimumBid;

  const handleBid = () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= maxBid) {
      setErrorMsg(`Bid must be greater than $${maxBid}`);
    } else {
      setErrorMsg("");
      // TODO: Place bid API call here
      alert(`Bid of $${amount} placed!`);
    }
  };

  return (
    <div className="place-bid-box">
      <input
        type="number"
        min={minimumBid}
        value={bidAmount}
        onChange={e => setBidAmount(e.target.value)}
        placeholder="Enter bid amount"
        className="place-bid-input"
      />
      <button className="place-bid-btn" onClick={handleBid}>Place Bid</button>
      {errorMsg && <div style={{ color: "#a81c3a", marginLeft: "1rem", fontWeight: "500" }}>{errorMsg}</div>}
    </div>
  );
}

export default ProductDetails;
