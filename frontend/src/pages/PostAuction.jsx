// src/pages/PostAuction.jsx
import React, { useState } from "react";

function PostAuction() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Auction Posted! (Frontend only)");
    console.log(formData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Post Auction Listing</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Item Title" onChange={handleChange} /><br />
        <input name="price" placeholder="Starting Price" onChange={handleChange} /><br />
        <input name="category" placeholder="Category" onChange={handleChange} /><br />
        <input name="image" placeholder="Image URL" onChange={handleChange} /><br />
        <button type="submit">Post Auction</button>
      </form>
    </div>
  );
}

export default PostAuction;
