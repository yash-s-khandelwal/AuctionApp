import React, { useState } from "react";
import productMock from "../data/productMock";

const categories = [
  "VINTAGE",
  "FASHION",
  "TECHNOLOGY",
  "ART",
  "COLLECTIBLES"
];

function getCategoryForProduct(product) {
  // Direct mapping by category for filtering
  if (!product.category) return "OTHER";
  return product.category.toUpperCase();
}

function CategoryProducts() {
  const [selected, setSelected] = useState("VINTAGE");
  const filtered = productMock.filter(
    p => getCategoryForProduct(p) === selected
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "64px", margin: "32px 0" }}>
        {categories.map(cat => (
          <span
            key={cat}
            style={{
              fontSize: "1.5rem",
              fontWeight: 500,
              letterSpacing: "2px",
              cursor: "pointer",
              color: selected === cat ? "#7A1528" : "#222",
              borderBottom: selected === cat ? "2px solid #7A1528" : "none"
            }}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px" }}>
        {filtered.length === 0 ? (
          <div style={{ fontSize: "1.2rem", color: "#7A1528" }}>No products found for {selected}.</div>
        ) : (
          filtered.map(product => (
            <div key={product.id} style={{ border: "1px solid #eee", borderRadius: "8px", padding: "16px", width: "220px", textAlign: "center" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px" }} />
              <h3 style={{ margin: "12px 0 6px", fontSize: "1.1rem" }}>{product.name}</h3>
              <div style={{ color: "#7A1528", fontWeight: "bold" }}>{product.price}</div>
              <div style={{ fontSize: "0.95rem", margin: "8px 0" }}>{product.description}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
