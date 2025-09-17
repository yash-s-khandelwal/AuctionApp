import React, { useState, useEffect } from "react";

const categories = [
  { id: 10011, name: "Vintage" },
  { id: 10012, name: "Fashion" },
  { id: 10013, name: "Technology" },
  // Add more categories as needed
];

function CategoryRow() {
  const [selectedId, setSelectedId] = useState(categories[0].id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/v0/category/getProductInCategory/${selectedId}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [selectedId]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ minWidth: "200px", marginRight: "32px" }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            style={{
              fontWeight: selectedId === cat.id ? "bold" : "normal",
              color: selectedId === cat.id ? "#7A1528" : "#222",
              cursor: "pointer",
              marginBottom: "16px"
            }}
            onClick={() => setSelectedId(cat.id)}
          >
            {cat.name}
          </div>
        ))}
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div>No products found for this category.</div>
        ) : (
          products.map(product => (
            <div key={product.productId} style={{ marginBottom: "24px", padding: "16px", border: "1px solid #eee", borderRadius: "8px" }}>
              <h3>{product.productName}</h3>
              <p>{product.productDescription}</p>
              <p>Minimum Bid: {product.minimumBid}</p>
              <p>
                Auction: {new Date(product.auctionStartDate).toLocaleString()} - {new Date(product.auctionEndDate).toLocaleString()}
              </p>
              <p>Seller: {product.user?.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryRow;
