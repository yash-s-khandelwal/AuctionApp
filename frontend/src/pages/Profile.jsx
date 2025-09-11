// src/pages/Profile.jsx
import React from "react";
import ".Profile.css";

function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <p><b>Name:</b> John Doe</p>
      <p><b>Role:</b> Buyer</p>
      <p><b>History:</b> Purchased 3 items</p>
    </div>
  );
}

export default Profile;
