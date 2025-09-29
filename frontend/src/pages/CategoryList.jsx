import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v0/category/getAllCategory");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setCategories(response.data);
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
    <div style={{ }}>
      <h1 style={{fontWeight:"bold", padding:"5spx", textAlign:"center"}}>Categories</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((category) => {
          return (
            <li key={category.categoryId} style={{ marginBottom: "8px" }}>
              <Link to={`/category/${category.categoryId}/${category.categoryName}`} style={{ textDecoration: "none", color: "black" }}>
                {category.categoryName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
