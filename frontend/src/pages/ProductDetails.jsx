import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css";
import AuctionTimer from "../components/AuctionTimer";
import BidInput from "../components/BidInput";



function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]);
  const [product, setProduct] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v0/product/getProductDetails/${productId}`);
        setProduct(response.data.product);
        setBids(response.data.bids)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

   useEffect(() => {
        const pollForNewBids = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v0/bid/getBidsOnProduct/${productId}`);
                // Update the bids state with the new list of bids
                setBids(response.data);
            } catch (err) {
                console.error("Failed to poll for bids:", err);
            }
        };

        // this sets the bids to be refreshed every 5 seconds
        const intervalId = setInterval(pollForNewBids, 5000); // Polls every 5 seconds

        return () => clearInterval(intervalId);
    }, [productId]);

  const maxBid = bids && bids.length > 0 ? Math.max(...bids.map(bid => bid.price)) : product.minimumBid;


  if (loading) return <p>Loading product details...</p>;
  if (error) return null;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-details-card">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back to Auctions</button>
      <div className="product-details-flex">
        <div className="product-image-section">
          <img src={product.imageUrl?product.imageUrl:`https://picsum.photos/seed/${product.productId}/500/400`} alt={product.productName} className="product-details-img" />
          {/* Auction Timer below image */}
          <div className="auction-timer-box">
            <AuctionTimer endTime={product.auctionEndDate} />
          </div>
          {/* Place Bid input and button below timer */}
          <BidInput maxBid={maxBid} minimumBid={product.minimumBid} product={product}/>
        </div>
        <div className="product-info-section">
          <h2 className="product-title">{product.productName}</h2>
          <p className="product-minbid"><strong>Minimum Bid:</strong> ₹{product.minimumBid}</p>
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
                        ₹{bid.price}
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


export default ProductDetails;
