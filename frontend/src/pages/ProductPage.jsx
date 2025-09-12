import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [placingBid, setPlacingBid] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v0/product/getProductDetails/10026`);
        setProductData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (!productData) return <p className="text-center py-10">Product not found!</p>;

  const { product, bids } = productData;

  // Sort bids by created time (or fallback)
  const sortedBids = [...bids].sort(
    (a, b) => new Date(a.createdAt || a.product.auctionStartDate) - new Date(b.createdAt || b.product.auctionStartDate)
  );

  const highestBid = bids.length > 0 ? Math.max(...bids.map((b) => b.price)) : product.minimumBid;

  // Place a new bid
  const handlePlaceBid = async () => {
    if (!bidAmount || isNaN(bidAmount)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (parseFloat(bidAmount) <= highestBid) {
      alert(`Your bid must be higher than the current highest bid (${highestBid}).`);
      return;
    }

    try {
      setPlacingBid(true);
      // Example POST request — adjust endpoint & payload according to your backend
      await axios.post(`http://localhost:8080/api/v0/product/${id}/bid`, {
        price: parseFloat(bidAmount),
        userId: 10041, // Replace with logged-in user ID
      });

      alert("Bid placed successfully!");
      setBidAmount("");

      // Refresh product data to show updated bids
      const updatedResponse = await axios.get(`http://localhost:8080/api/v0/product/${id}`);
      setProductData(updatedResponse.data);

    } catch (err) {
      alert("Failed to place bid: " + (err.response?.data?.message || err.message));
    } finally {
      setPlacingBid(false);
    }
  };

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-[400px] h-[400px] bg-gray-200 flex items-center justify-center rounded-lg shadow">
          <span className="text-gray-500">Product Image</span>
        </div>

        {/* Product Info */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            Minimum Bid: ${product.minimumBid}
          </p>

          {/* Seller Info */}
          <div className="space-y-1 text-gray-700 mb-4">
            <p><span className="font-semibold">Seller:</span> {product.user.firstName} {product.user.lastName}</p>
            <p><span className="font-semibold">Username:</span> {product.user.username}</p>
            <p><span className="font-semibold">Email:</span> {product.user.email}</p>
          </div>

          {/* Buy Box */}
          <div className="border p-4 rounded-lg shadow mt-4">
            <h3 className="text-xl font-semibold mb-2">Place Your Bid</h3>
            <p className="mb-2 text-gray-700">
              Current highest bid: <span className="font-bold">${highestBid}</span>
            </p>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="border rounded p-2 w-full mb-3"
              placeholder={`Enter bid (min > ${highestBid})`}
              min={highestBid + 1}
            />
            <button
              onClick={handlePlaceBid}
              disabled={placingBid}
              className={`w-full px-4 py-2 rounded text-white font-semibold transition ${
                placingBid ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {placingBid ? "Placing..." : "Place Bid"}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Item Description</h2>
        <p className="text-gray-700">{product.productDescription}</p>
      </div>

      {/* Bids Table */}
      {bids.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Bids</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Bidder Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Bid Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Bid Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedBids.map((bid) => (
                <tr key={bid.bidId}>
                  <td className="border border-gray-300 px-4 py-2">
                    {bid.user.firstName} {bid.user.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">${bid.price}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(bid.createdAt || bid.product.auctionStartDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
