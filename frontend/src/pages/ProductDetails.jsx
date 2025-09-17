import { useParams, useNavigate, data } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css";
import AuctionTimer from "../components/AuctionTimer";
import useRazorpayScript from '../hooks/useRazorpayScript';



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
        // Use mock data if API fails
        let mockData;
        // Fashion
        if (productId === '101') {
          mockData = {
            product: {
              productId: 101,
              productName: 'Designer Shoes',
              minimumBid: 2200,
              productDescription: 'High-end designer shoes, stylish and comfortable.',
              auctionStartDate: '2025-09-18',
              auctionEndDate: '2025-09-28',
              user: { firstName: 'Anna', lastName: 'Taylor', username: 'annataylor', email: 'anna@example.com' },
            },
            bids: [
              { bidId: 7, price: 2200, user: { firstName: 'Ben', lastName: 'King', username: 'benking' }, createdAt: '2025-09-19T10:00:00' },
              { bidId: 8, price: 2300, user: { firstName: 'Cara', lastName: 'Queen', username: 'caraqueen' }, createdAt: '2025-09-20T12:00:00' },
            ],
          };
        } else if (productId === '102') {
          mockData = {
            product: {
              productId: 102,
              productName: 'Luxury Sunglasses',
              minimumBid: 1800,
              productDescription: 'Premium sunglasses with UV protection and elegant design.',
              auctionStartDate: '2025-09-19',
              auctionEndDate: '2025-09-29',
              user: { firstName: 'David', lastName: 'Stone', username: 'davidstone', email: 'david@example.com' },
            },
            bids: [
              { bidId: 9, price: 1800, user: { firstName: 'Ella', lastName: 'Rose', username: 'ellarose' }, createdAt: '2025-09-20T09:00:00' },
              { bidId: 10, price: 1900, user: { firstName: 'Finn', lastName: 'Gray', username: 'finngray' }, createdAt: '2025-09-21T11:00:00' },
            ],
          };
        } else if (productId === '103') {
          mockData = {
            product: {
              productId: 103,
              productName: 'Handmade Necklace',
              minimumBid: 900,
              productDescription: 'Beautiful handmade necklace, unique and elegant.',
              auctionStartDate: '2025-09-20',
              auctionEndDate: '2025-09-30',
              user: { firstName: 'Grace', lastName: 'Hill', username: 'gracehill', email: 'grace@example.com' },
            },
            bids: [
              { bidId: 11, price: 900, user: { firstName: 'Hank', lastName: 'Fox', username: 'hankfox' }, createdAt: '2025-09-21T14:00:00' },
              { bidId: 12, price: 950, user: { firstName: 'Ivy', lastName: 'Wolf', username: 'ivywolf' }, createdAt: '2025-09-22T16:00:00' },
            ],
          };
        }
        // Technology
        else if (productId === '201') {
          mockData = {
            product: {
              productId: 201,
              productName: 'Smartphone',
              minimumBid: 3200,
              productDescription: 'Latest smartphone with high-end specs and sleek design.',
              auctionStartDate: '2025-09-21',
              auctionEndDate: '2025-09-31',
              user: { firstName: 'Jack', lastName: 'Black', username: 'jackblack', email: 'jack@example.com' },
            },
            bids: [
              { bidId: 13, price: 3200, user: { firstName: 'Kate', lastName: 'Red', username: 'katered' }, createdAt: '2025-09-22T10:00:00' },
              { bidId: 14, price: 3300, user: { firstName: 'Leo', lastName: 'Green', username: 'leogreen' }, createdAt: '2025-09-23T12:00:00' },
            ],
          };
        } else if (productId === '202') {
          mockData = {
            product: {
              productId: 202,
              productName: 'Gaming Console',
              minimumBid: 4000,
              productDescription: 'Next-gen gaming console for immersive entertainment.',
              auctionStartDate: '2025-09-22',
              auctionEndDate: '2025-10-01',
              user: { firstName: 'Mia', lastName: 'Silver', username: 'miasilver', email: 'mia@example.com' },
            },
            bids: [
              { bidId: 15, price: 4000, user: { firstName: 'Nina', lastName: 'Gold', username: 'ninagold' }, createdAt: '2025-09-23T09:00:00' },
              { bidId: 16, price: 4100, user: { firstName: 'Oscar', lastName: 'Brown', username: 'oscarbrown' }, createdAt: '2025-09-24T11:00:00' },
            ],
          };
        } else if (productId === '203') {
          mockData = {
            product: {
              productId: 203,
              productName: 'Sports Bicycle',
              minimumBid: 2500,
              productDescription: 'High-performance sports bicycle for speed and comfort.',
              auctionStartDate: '2025-09-23',
              auctionEndDate: '2025-10-02',
              user: { firstName: 'Paul', lastName: 'White', username: 'paulwhite', email: 'paul@example.com' },
            },
            bids: [
              { bidId: 17, price: 2500, user: { firstName: 'Quinn', lastName: 'Blue', username: 'quinnblue' }, createdAt: '2025-09-24T14:00:00' },
              { bidId: 18, price: 2600, user: { firstName: 'Rita', lastName: 'Pink', username: 'ritapink' }, createdAt: '2025-09-25T16:00:00' },
            ],
          };
        }
        // Art
        else if (productId === '301') {
          mockData = {
            product: {
              productId: 301,
              productName: 'Antique Vase',
              minimumBid: 3500,
              productDescription: 'Rare antique vase, perfect for art collectors.',
              auctionStartDate: '2025-09-24',
              auctionEndDate: '2025-10-04',
              user: { firstName: 'Sara', lastName: 'Violet', username: 'saraviolet', email: 'sara@example.com' },
            },
            bids: [
              { bidId: 19, price: 3500, user: { firstName: 'Tom', lastName: 'Indigo', username: 'tomindigo' }, createdAt: '2025-09-25T10:00:00' },
              { bidId: 20, price: 3600, user: { firstName: 'Uma', lastName: 'Cyan', username: 'umacyan' }, createdAt: '2025-09-26T12:00:00' },
            ],
          };
        } else if (productId === '302') {
          mockData = {
            product: {
              productId: 302,
              productName: 'Modern Painting',
              minimumBid: 5000,
              productDescription: 'Stunning modern painting, vibrant colors and bold style.',
              auctionStartDate: '2025-09-25',
              auctionEndDate: '2025-10-05',
              user: { firstName: 'Victor', lastName: 'Red', username: 'victorred', email: 'victor@example.com' },
            },
            bids: [
              { bidId: 21, price: 5000, user: { firstName: 'Wendy', lastName: 'Orange', username: 'wendyorange' }, createdAt: '2025-09-26T09:00:00' },
              { bidId: 22, price: 5100, user: { firstName: 'Xander', lastName: 'Yellow', username: 'xanderyellow' }, createdAt: '2025-09-27T11:00:00' },
            ],
          };
        } else if (productId === '303') {
          mockData = {
            product: {
              productId: 303,
              productName: 'Sculpture',
              minimumBid: 4200,
              productDescription: 'Elegant sculpture, a masterpiece for any collection.',
              auctionStartDate: '2025-09-26',
              auctionEndDate: '2025-10-06',
              user: { firstName: 'Yara', lastName: 'Magenta', username: 'yaramagenta', email: 'yara@example.com' },
            },
            bids: [
              { bidId: 23, price: 4200, user: { firstName: 'Zane', lastName: 'Silver', username: 'zanesilver' }, createdAt: '2025-09-27T14:00:00' },
              { bidId: 24, price: 4300, user: { firstName: 'Amy', lastName: 'Gold', username: 'amygold' }, createdAt: '2025-09-28T16:00:00' },
            ],
          };
        }
        // Collectibles
        else if (productId === '401') {
          mockData = {
            product: {
              productId: 401,
              productName: 'Rare Coin',
              minimumBid: 1200,
              productDescription: 'Rare collectible coin, highly sought after by collectors.',
              auctionStartDate: '2025-09-27',
              auctionEndDate: '2025-10-07',
              user: { firstName: 'Brian', lastName: 'Copper', username: 'briancopper', email: 'brian@example.com' },
            },
            bids: [
              { bidId: 25, price: 1200, user: { firstName: 'Cathy', lastName: 'Bronze', username: 'cathybronze' }, createdAt: '2025-09-28T10:00:00' },
              { bidId: 26, price: 1300, user: { firstName: 'Derek', lastName: 'Steel', username: 'dereksteel' }, createdAt: '2025-09-29T12:00:00' },
            ],
          };
        } else if (productId === '402') {
          mockData = {
            product: {
              productId: 402,
              productName: 'Vintage Stamp',
              minimumBid: 800,
              productDescription: 'Vintage stamp, a piece of history for your collection.',
              auctionStartDate: '2025-09-28',
              auctionEndDate: '2025-10-08',
              user: { firstName: 'Ethan', lastName: 'Paper', username: 'ethanpaper', email: 'ethan@example.com' },
            },
            bids: [
              { bidId: 27, price: 800, user: { firstName: 'Fiona', lastName: 'Ink', username: 'fionaink' }, createdAt: '2025-09-29T09:00:00' },
              { bidId: 28, price: 850, user: { firstName: 'Gina', lastName: 'Post', username: 'ginapost' }, createdAt: '2025-09-30T11:00:00' },
            ],
          };
        } else if (productId === '403') {
          mockData = {
            product: {
              productId: 403,
              productName: 'Collector Card',
              minimumBid: 1500,
              productDescription: 'Collector card, rare and valuable for enthusiasts.',
              auctionStartDate: '2025-09-29',
              auctionEndDate: '2025-10-09',
              user: { firstName: 'Holly', lastName: 'Mint', username: 'hollymint', email: 'holly@example.com' },
            },
            bids: [
              { bidId: 29, price: 1500, user: { firstName: 'Ian', lastName: 'Foil', username: 'ianfoil' }, createdAt: '2025-09-30T14:00:00' },
              { bidId: 30, price: 1550, user: { firstName: 'Jill', lastName: 'Rare', username: 'jillrare' }, createdAt: '2025-10-01T16:00:00' },
            ],
          };
        }
        // Vintage
        else if (productId === '1') {
          mockData = {
            product: {
              productId: 1,
              productName: 'Vintage Leather Bag',
              minimumBid: 1500,
              productDescription: 'A classic vintage leather bag, perfect for collectors and fashion lovers.',
              auctionStartDate: '2025-09-15',
              auctionEndDate: '2025-09-25',
              user: {
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                email: 'john@example.com',
              },
            },
            bids: [
              { bidId: 1, price: 1500, user: { firstName: 'Alice', lastName: 'Smith', username: 'alicesmith' }, createdAt: '2025-09-16T10:00:00' },
              { bidId: 2, price: 1600, user: { firstName: 'Bob', lastName: 'Brown', username: 'bobbrown' }, createdAt: '2025-09-17T12:00:00' },
            ],
          };
        } else if (productId === '2') {
          mockData = {
            product: {
              productId: 2,
              productName: 'Vintage Watch',
              minimumBid: 1200,
              productDescription: 'A beautiful vintage watch, gold finish, collectible for enthusiasts.',
              auctionStartDate: '2025-09-16',
              auctionEndDate: '2025-09-26',
              user: {
                firstName: 'Jane',
                lastName: 'Smith',
                username: 'janesmith',
                email: 'jane@example.com',
              },
            },
            bids: [
              { bidId: 3, price: 1200, user: { firstName: 'Charlie', lastName: 'Lee', username: 'charlielee' }, createdAt: '2025-09-17T09:00:00' },
              { bidId: 4, price: 1300, user: { firstName: 'Dana', lastName: 'White', username: 'danawhite' }, createdAt: '2025-09-18T11:00:00' },
            ],
          };
        } else if (productId === '3') {
          mockData = {
            product: {
              productId: 3,
              productName: 'Classic Camera',
              minimumBid: 2500,
              productDescription: 'Retro DSLR camera with excellent optics, sturdy build, and perfect for collectors.',
              auctionStartDate: '2025-09-17',
              auctionEndDate: '2025-09-27',
              user: {
                firstName: 'Sam',
                lastName: 'Green',
                username: 'samgreen',
                email: 'sam@example.com',
              },
            },
            bids: [
              { bidId: 5, price: 2500, user: { firstName: 'Eve', lastName: 'Black', username: 'eveblack' }, createdAt: '2025-09-18T14:00:00' },
              { bidId: 6, price: 2600, user: { firstName: 'Frank', lastName: 'Blue', username: 'frankblue' }, createdAt: '2025-09-19T16:00:00' },
            ],
          };
        } else {
          mockData = {
            product: {
              productId,
              productName: 'Unknown Product',
              minimumBid: 1000,
              productDescription: 'No description available.',
              auctionStartDate: '2025-09-15',
              auctionEndDate: '2025-09-25',
              user: {
                firstName: 'Unknown',
                lastName: 'User',
                username: 'unknown',
                email: 'unknown@example.com',
              },
            },
            bids: [],
          };
        }
        setData(mockData);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return null;
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
  const [scriptLoaded, scriptError] = useRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');

  function handleRazorpaySuccess(response) {
    console.log(response);
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
            userId: 10008
          },
          product: {
            productId: 10013
          },
        }
        console.log(postData);
        const response = await axios.post('http://localhost:8080/api/v0/bid/createBid', postData);

        const orderId = response.data;
        console.log(orderId);

        const options = {
          key: "rzp_test_RGPAKmqn2T4bDQ",
          amount: bidAmount * 100, // Amount in currency subunits
          currency: "INR",
          name: data.productName,
          description: "Bid for " + data.productName,
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

export default ProductDetails;
