import { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // ✅ initialize as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v0/category/getAllCategory");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setCategories(response.data); // ✅ directly set the array
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Invalid category data received");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>{category.categoryName}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
