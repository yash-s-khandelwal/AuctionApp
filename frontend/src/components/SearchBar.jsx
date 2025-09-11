// src/components/SearchBar.jsx
import React from "react";

function SearchBar() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f5f5f5", // ✅ Light gray background
      borderRadius: "25px",
      padding: "5px 10px",
      border: "1px solid #ccc",
      maxWidth: "400px",
      flex: 1,
    },
    input: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      padding: "8px",
      fontSize: "14px",
      color: "#333",
    },
    button: {
      border: "none",
      background: "#fff", // ✅ Blue search button
      color: "#fff",
      padding: "8px 14px",
      borderRadius: "20px",
      cursor: "pointer",
      fontWeight: "bold",
      marginLeft: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search items & sellers..."
        style={styles.input}
      />
      <button style={styles.button}>🔍</button>
    </div>
  );
}

export default SearchBar;
