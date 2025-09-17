import React, { useState, useEffect } from "react";

function MyBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get userId from localStorage (or your auth context)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      return;
    }
    setLoading(true);
    fetch(`/api/v0/bid/getBidsOfUser/${userId}`)
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch bids."))
      .then(data => {
        setBids(data);
        setError("");
      })
      .catch(err => {
        setError(typeof err === "string" ? err : "Error connecting to server.");
        setBids([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ color: "#7A1528", marginBottom: "24px", fontSize: "28px" }}>My Bids</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : bids.length === 0 ? (
        <div>No bids found.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#7A1528", color: "#fff" }}>
              <th style={{ padding: "12px", border: "1px solid #141313ff" }}>Product Name</th>
              <th style={{ padding: "12px", border: "1px solid #eee" }}>My Bid</th>
              <th style={{ padding: "12px", border: "1px solid #eee" }}>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, idx) => (
              <tr key={idx} style={{ textAlign: "center" }}>
                <td style={{ padding: "12px", border: "1px solid #eee" }}>{bid.product?.productName}</td>
                <td style={{ padding: "12px", border: "1px solid #eee" }}>₹{bid.price}</td>
                <td style={{ padding: "12px", border: "1px solid #eee" }}>{bid.orderStatus || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBids;
