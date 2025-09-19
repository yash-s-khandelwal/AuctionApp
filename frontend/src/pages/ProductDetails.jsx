import { useParams, useNavigate, data } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css";
import AuctionTimer from "../components/AuctionTimer";
import useRazorpayScript from '../hooks/useRazorpayScript';
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";



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

        // this sets the bids to be refreshed every 10 seconds
        const intervalId = setInterval(pollForNewBids, 10000); // Polls every 10 seconds

        return () => clearInterval(intervalId);
    }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return null;
  if (!product) return <p>No product found.</p>;

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

  // BidInput component for bid validation and error message
function BidInput({ bids, minimumBid }) {
  const [bidAmount, setBidAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const maxBid = bids && bids.length > 0 ? Math.max(...bids.map(bid => bid.price)) : minimumBid;
  const [scriptLoaded, scriptError] = useRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  const {user} = useAuth();
  async function handleRazorpaySuccess(response) {
        const putData= {
          bidId: window.bidId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: window.razorpayOrderId,
          bidStatus:"paid"
        }
        console.log(response);
        console.log(putData);
        const successResponse = await api.put('/api/v0/bid/updateBid', putData);
        successResponse ? alert("Bid placed successfully") : alert("Bid status not updated. Amount will be refunded")
  }

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= maxBid) {
      setErrorMsg(`Bid must be greater than $${maxBid}`);
    } else {
      setErrorMsg("");
      if (!scriptLoaded) {
        alert('Payment script not loaded yet!');
        return;
      }

      try {
        const postData= {
          price: bidAmount,
          user: {
            userId: user.userId
          },
          product: {
            productId: product.productId
          },
        }
        console.log(postData);
        const bidDetails = await api.post('/api/v0/bid/createBid', postData);

        // const [orderId, bidId] = bidDetails.data.split("|");
        const orderId=bidDetails.data;
        console.log(orderId);
        const bidId = bidDetails.data.receipt;
        window.bidId=bidId
        console.log(bidId);
        window.razorpayOrderId=orderId.id;
        

        const options = {
          key: "rzp_test_RGPAKmqn2T4bDQ",
          amount: bidAmount * 100, // Amount in currency subunits
          currency: "INR",
          name: "RareSphere",
          image:'https://res.cloudinary.com/dhqjlw5gi/image/upload/v1758222971/1_prcley.png',
          description: "Bid for " + product.productName,
          order_id: orderId, // The ID you got from your backend
          handler: (response) => {
            handleRazorpaySuccess(response);
          },
          // prefill: {
          //   name: user.firstName + " " + user.lastName,
          //   email: user.email,
          //   contact: user.contact,
          // },
          theme: { color: "#7a1528" }
          
        };

        // Step 3: Open the Razorpay popup
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          alert('Payment failed: ' + response.error.description);
        });
        rzp1.open();

        if (scriptError) {
          return <div>Failed to load payment script.</div>;
        }

      } catch (error) {
        console.log(error)
        console.error("Failed to create Razorpay order:", error.response.data, error.response.description);
        alert("Failed to create payment order.");
      }
    };

    // alert(`Bid of $${amount} placed!`);
  }



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
      <button className="place-bid-btn" onClick={handlePlaceBid}>Place Bid</button>
      {errorMsg && <div style={{ color: "#a81c3a", marginLeft: "1rem", fontWeight: "500" }}>{errorMsg}</div>}
    </div>
  );
}
}


export default ProductDetails;
