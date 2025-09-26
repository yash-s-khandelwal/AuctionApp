import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import MyBids from "../components/MyBids";

function Profile() {
  const { user } = useAuth(); // Get the authenticated user from the context
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user object exists and has a userId
    if (user?.userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await api.get(`api/v0/user/getUserDetailsById/${user.userId}`);
          setUserDetails(response.data);
        } catch (err) {
          setError("Failed to fetch user details.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    } else {
      setLoading(false);
      setError("Please log in to view your profile.");
    }
  }, [user]); // Re-run this effect if the user object in context changes

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: 'red' }}>Error: {error}</div>;
  }
  
  if (!userDetails) {
      return <div style={{ padding: "20px" }}>No user details found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#7A1528" }}>User Profile</h2>
      
      {/* Display User Details */}
      <div style={{ marginBottom: "24px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9" }}>
        <p><strong>Username:</strong> {userDetails.username}</p>
        <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/profile/create-product" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>Create Product</Link>
        {/* <Link to="/profile/my-bids" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>My Bids</Link> */}
        <Link to="/profile/my-products" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>My Products</Link>
        {/* <Link to="/profile/user-details" style={{ background: "#7A1528", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>User Details</Link> */}
      </div>
      <MyBids/>
    </div>
  );
}

export default Profile;