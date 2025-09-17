// src/pages/Profile.jsx
import React from "react";


function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <a href="/profile/create-product" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>Create Product</a>
        <a href="/profile/my-bids" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>My Bids</a>
        <a href="/profile/my-products" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>My Products</a>
        <a href="/profile/user-details" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>User Details</a>
      </div>
      <p><b>Name:</b> John Doe</p>
      <p><b>Role:</b> Buyer</p>
      <p><b>History:</b> Purchased 3 items</p>
    </div>
  );
}

export default Profile;
