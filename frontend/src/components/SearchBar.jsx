// src/components/SearchBar.jsx
import React from "react";

function SearchBar({ value, onChange, onSearch }) {
  // Local state for input value
  const [inputValue, setInputValue] = React.useState(value || "");

  React.useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Handle input change and propagate to parent
  const handleInputChange = e => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  // Handle search action (Enter or button click)
  const handleSearch = () => {
    if (onSearch) onSearch(inputValue);
  };
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: "25px",
      padding: "5px 10px",
      border: "1px solid #660000",
      maxWidth: "450px",
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
      color: "#660000",
      padding: "8px 14px",
      borderRadius: "20px",
      cursor: "pointer",
      fontWeight: "bold",
      marginLeft: "8px",
    },
  };

  // Remove duplicate handleInputChange (already declared above)
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search items & sellers..."
        style={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button style={styles.button} tabIndex={-1} onClick={handleSearch}>🔍</button>
    </div>
  );
}

export default SearchBar;
