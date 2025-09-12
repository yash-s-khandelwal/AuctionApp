import React, { useState } from "react";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import Login from "../pages/Login";
import CategoryList from "../pages/CategoryList";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCategories, setShowCategories] = useState(false); // 👈 NEW STATE

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="brand">Rare</span>Sphere
            {/* <p style={{ color: "#C28787" }}>Rare Finds. Real Wins</p> */}

        </div>

        <div className="search-container">
          <SearchBar />
        </div>

        <div className="auth">
          <span>❤️ Saved</span>
          <span>🔔 Notifications</span>

          <button className="login" onClick={() => setShowLogin(true)}>
            Log In
          </button>
          <button className="signup" onClick={() => setShowSignup(true)}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Menu Bar */}
      <div className="menu-bar">
        <button
          className="category-btn"
          onClick={() => setShowCategories(!showCategories)}
        >
          Category filters ⬇
        </button>
        <a href="#">AUCTIONS</a>
        <a href="#">ITEM LOCATION</a>
        <a href="#">FINE ART</a>
        <a href="#">DECORATIVE ART</a>
        <a href="#">SHIPPING</a>
        <a href="#">COLLECTIBLES</a>
        <a href="#">FURNITURE</a>
      </div>

      {/* Category Popup */}
      {showCategories && (
        <div className="category-popup">
          <CategoryList onClose={() => setShowCategories(false)} />
        </div>
      )}

      {/* Login and Signup Popups (unchanged) */}
      {showLogin && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />
            <button style={styles.primaryBtn}>Login</button>
            <button style={styles.closeBtn} onClick={() => setShowLogin(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showSignup && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Full Name" style={styles.input} />
            <input type="email" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />
            <button style={styles.primaryBtn}>Sign Up</button>
            <button style={styles.closeBtn} onClick={() => setShowSignup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#7A1F28",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  closeBtn: {
    marginTop: "10px",
    padding: "8px 14px",
    backgroundColor: "#ddd",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
