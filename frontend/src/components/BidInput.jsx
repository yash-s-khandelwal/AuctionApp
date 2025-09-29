import React, {memo, useState} from 'react';
import useRazorpayScript from '../hooks/useRazorpayScript';
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import "../pages/ProductDetails.css";


const BidInput = memo(({ maxBid, minimumBid, product }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
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
      setErrorMsg(`Bid must be greater than ₹${maxBid}`);
    } else {
      setErrorMsg("");
      if (!scriptLoaded) {
        alert("Network Error");
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
          key: "rzp_live_RNIHFWWsAqKCy1",
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
        alert(error.response.data.message);
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
});

export default BidInput;