import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

function CreateProduct() {
  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    minBid: "",
    startTime: "",
    endTime: "",
    categories: [] // This now stores category IDs, not names
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]); // State for fetched categories
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const {user} = useAuth();

  // Load the userId from localStorage and fetch categories on component mount
  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v0/category/getAllCategory");
        setAllCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetchCategories();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleCategoryToggle = catId => {
    setForm(f => {
      const exists = f.categories.includes(catId);
      return {
        ...f,
        categories: exists ? f.categories.filter(c => c !== catId) : [...f.categories, catId]
      };
    });
  };

  const uploadImageToCloudinary = async (file) => {
    // The Cloudinary upload URL
    const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dhqjlw5gi/image/upload`;
    
    // Create the FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "auctionApp");
    formData.append("api_key", "137382912588925");

    try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        
        // Return the secure URL of the uploaded image
        return response.data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new Error("Cloudinary upload failed.");
    }
};

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user.userId) {
      setMessage("You must be logged in to create a product.");
      return;
    }
    setLoading(true);

    // console.log("Image file in state:", form.image); // <-- Add this debug log

  if (!form.image) {
    setMessage("Please select an image file.");
    return;
  }

  setLoading(true);
  setMessage("")
    try {
    const imageUrl = await uploadImageToCloudinary(form.image);
    const productDetailsDto = {
      productDetails: {
        productName: form.title,
        productDescription: form.description,
        minimumBid: parseFloat(form.minBid),
        auctionStartDate: form.startTime,
        auctionEndDate: form.endTime,
        imageUrl: imageUrl,
        user: {
          userId: user.userId
        }
      },
      // Map the array of selected category IDs to a list of CategoryLink objects
      productCategoryLink: form.categories.map(catId => ({
        category: {
          categoryId: catId // Use the ID directly
        }
      }))
    };
 
      const res = await api.post("/api/v0/product/createProduct", productDetailsDto, {
        headers: {
        //   // "Content-Type": "multipart/form-data",
        }
      });
      if (res.status === 201) {
        setMessage("Product created successfully!");
        setForm({ image: null, title: "", description: "", minBid: "", startTime: "", endTime: "", categories: [] });
        setPreview(null);
      } else {
        setMessage("Failed to create product.");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      setMessage("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  if (categoriesLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      {/* Filter Sidebar */}
      <div style={{ width: "220px", background: "#f7f7f7", padding: "24px 16px", borderRight: "1px solid #555", fontSize: "18px" }}>
        <h3 style={{ color: "#7A1528" }}>All Category</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {allCategories.map(cat => (
            <li key={cat.categoryId}>
              <button
                style={{
                  background: form.categories.includes(cat.categoryId) ? "#7A1528" : "#fff",
                  color: form.categories.includes(cat.categoryId) ? "#fff" : "#7A1528",
                  border: "1px solid #7A1528",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  margin: "8px 0",
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => handleCategoryToggle(cat.categoryId)}
              >
                {cat.categoryName}
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
        <button type="submit" disabled={loading} style={{ background: "#7A1528", color: "#fff", padding: "12px 32px", borderRadius: "8px", fontWeight: "bold", fontSize: "16px", border: "none", cursor: "pointer" }}>{loading?"Creating Product":"Create Product"}</button>
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