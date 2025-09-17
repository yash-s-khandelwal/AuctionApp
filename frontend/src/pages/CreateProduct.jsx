
import React, { useState } from "react";

function CreateProduct() {

  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    minBid: "",
    startTime: "",
    endTime: "",
    categories: []
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleCategoryToggle = cat => {
    setForm(f => {
      const exists = f.categories.includes(cat);
      return {
        ...f,
        categories: exists ? f.categories.filter(c => c !== cat) : [...f.categories, cat]
      };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", form.image);
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("minBid", form.minBid);
    data.append("startTime", form.startTime);
    data.append("endTime", form.endTime);
    data.append("categories", JSON.stringify(form.categories));
    try {
      const res = await fetch("/api/v0/product/createProduct", {
        method: "POST",
        body: data
      });
      if (res.ok) {
        setMessage("Product created successfully!");
        setForm({ image: null, title: "", description: "", minBid: "", startTime: "", endTime: "", categories: [] });
        setPreview(null);
      } else {
        setMessage("Failed to create product.");
      }
    } catch {
      setMessage("Error connecting to server.");
    }
  };
  
  // Expanded filter options
  const categories = [
    "Art", "Fashion", "Technology", "Collectibles", "Vintage",
    "Jewelry", "Books", "Sports", "Furniture", "Toys", "Music", "Antiques"
  ];

  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      {/* Filter Sidebar */}
      <div style={{ width: "220px", background: "#f7f7f7", padding: "24px 16px", borderRight: "1px solid #555",fontSize: "18px" }}>
        <h3 style={{ color: "#7A1528" }}>All Category</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map(cat => (
            <li key={cat}>
              <button
                style={{
                  background: form.categories.includes(cat) ? "#7A1528" : "#fff",
                  color: form.categories.includes(cat) ? "#fff" : "#7A1528",
                  border: "1px solid #7A1528",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  margin: "8px 0",
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => handleCategoryToggle(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Product Form */}
      <form onSubmit={handleSubmit} style={{ flex: 1, padding: "32px 40px" }}>
        <h2 style={{ color: "#7A1528", marginBottom: "24px",fontSize: "32px"}}>Create Product</h2>
        <div style={{ marginBottom: "18px" }}>
          <label>Image:</label><br />
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" style={{ marginTop: "10px", maxWidth: "180px", borderRadius: "8px" }} />}
        </div>
        <div style={{ marginBottom: "18px" }}>
          <label>Title:</label><br />
          <input type="text" name="title" value={form.title} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} required />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <label>Description:</label><br />
          <textarea name="description" value={form.description} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} required />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <label>Minimum Bid:</label><br />
          <input type="number" name="minBid" value={form.minBid} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} required />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <label>Auction Start Time:</label><br />
          <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} required />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <label>Auction End Time:</label><br />
          <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} required />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <label>Categories:</label><br />
          <input type="text" name="categories" value={form.categories.join(", ")} readOnly style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
        </div>
        <button type="submit" style={{ background: "#7A1528", color: "#fff", padding: "12px 32px", borderRadius: "8px", fontWeight: "bold", fontSize: "16px", border: "none", cursor: "pointer" }}>Create Product</button>
        {message && <div style={{ marginTop: "18px", color: message.includes("success") ? "green" : "red" }}>{message}</div>}
      </form>
    </div>
  );
}


// Calendar color override for input[type="datetime-local"]
const style = document.createElement('style');
style.innerHTML = `
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(22%) sepia(80%) saturate(747%) hue-rotate(330deg) brightness(90%) contrast(90%);
}
input[type="datetime-local"]:focus {
  border-color: #7A1528 !important;
  box-shadow: 0 0 0 2px #7A152833 !important;
}
`;
document.head.appendChild(style);

export default CreateProduct;
