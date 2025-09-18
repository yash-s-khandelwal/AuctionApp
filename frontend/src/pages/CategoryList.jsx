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
    <div style={{ padding: "20px" }}>
      <h1>Categories</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((category) => {
          // let linkTo = `/category/${category.categoryId}`;
          // const name = category.categoryName.toLowerCase();
          // if (name === 'vintage') linkTo = '/category/vintage';
          // if (name === 'fashion') linkTo = '/category/fashion';
          // if (name === 'technology') linkTo = '/category/technology';
          // if (name === 'art') linkTo = '/category/art';
          // if (name === 'collectibles') linkTo = '/category/collectibles';
          // if (name === 'jewelry') linkTo = '/category/jewelry';
          // if (name === 'home and living' || name === 'home & living' || name === 'home-and-living') linkTo = '/category/home-and-living';
          // if (name === 'sports memorabilia' || name === 'sports-memorabilia') linkTo = '/category/sports-memorabilia';
          return (
            <li key={category.categoryId} style={{ marginBottom: "8px" }}>
              <Link to='/category/'{...category.categoryId} style={{ textDecoration: "none", color: "black" }}>
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
