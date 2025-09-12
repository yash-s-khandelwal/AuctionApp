import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v0/category/getProductInCategory/${id}`
        );
        console.log("Products API Response:", response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Invalid product data received");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products in Category (ID: {id})</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              {product.productName} – {product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
