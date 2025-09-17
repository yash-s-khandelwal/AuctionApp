
import React, { useEffect, useState } from "react";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/v0/product/myProducts");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch {
        setProducts([]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ color: "#7A1528", marginBottom: "24px" }}>My Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
          {products.map((prod, idx) => (
            <div key={idx} style={{ border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 2px 8px #eee", padding: "24px", background: "#fff" }}>
              {prod.imageUrl && <img src={prod.imageUrl} alt={prod.title} style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "16px" }} />}
              <h3 style={{ color: "#7A1528", marginBottom: "8px" }}>{prod.title}</h3>
              <p style={{ marginBottom: "8px" }}><b>Description:</b> {prod.description}</p>
              <p style={{ marginBottom: "8px" }}><b>Minimum Bid:</b> ₹{prod.minBid}</p>
              <p style={{ marginBottom: "8px" }}><b>Auction Start:</b> {prod.startTime}</p>
              <p style={{ marginBottom: "8px" }}><b>Auction End:</b> {prod.endTime}</p>
              <p style={{ marginBottom: "8px" }}><b>Categories:</b> {Array.isArray(prod.categories) ? prod.categories.join(", ") : prod.categories}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
