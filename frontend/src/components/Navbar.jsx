import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useSearch } from "../context/SearchContext";
import CategoryList from "../pages/CategoryList";
import api from "../api/axiosConfig";
import LoginForm from "./Auth/LoginForm"; // Import the new components
import SignupForm from "./Auth/SignupForm";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

function Navbar({ currency = 'INR', setCurrency = () => { } }) { // INR default
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const { user, logout } = useAuth();
  const currencyFlags = [
    { code: 'USD', label: '🇺🇸' },
    { code: 'INR', label: '🇮🇳' },
    { code: 'EUR', label: '🇪🇺' },
    { code: 'GBP', label: '🇬🇧' }
  ];
  const isLoggedIn = localStorage.getItem("token");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Use global search context
  const { searchQuery, setSearchQuery } = useSearch();
  // Button click handler (optional)
  const handleSearchButtonClick = () => {
    // You can add navigation or focus logic here
    // For now, just log the query
    console.log("Search button clicked:", searchQuery);
  };
  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#d1d1d1',
        padding: '0 24px',
        height: '65px',
        minHeight: '64px',
        maxHeight: '72px',
        gap: '0',
        boxSizing: 'border-box',
        borderBottom: '1px solid #e0e0e0'
      }}>
        {/* Left: Logo */}
        <div className="logo" style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', height: '100%' }}>
          <Link
            to="/"
            title="Go to Home"
            style={{
              textDecoration: "none",
              color: "#7A1528",
              fontWeight: "bold",
              fontSize: '2.4rem',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              transition: 'background 0.2s',
              borderRadius: '12px',
              padding: '0 12px',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseOver={e => (e.currentTarget.style.background = "#f5e6ec")}
            onMouseOut={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ marginRight: "10px", fontSize: "2.1rem", display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#7A1528" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9h-6v-6h-2v6H5v-9H2z" /></svg>
            </span>
            <span className="brand" style={{ fontSize: '2.4rem', fontWeight: 'bold', letterSpacing: '0.04em' }}>RareSphere</span>
          </Link>
        </div>

        {/* Center: Search Bar & Currency Selector (flags only, INR default, smaller, left of auth) */}
        <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', height: '100%' }}>
          {/* Search Bar First */}
          <div className="search-container" style={{ flex: '1 1 auto', minWidth: '340px', maxWidth: '520px', marginRight: '32px', height: '100%', display: 'flex', alignItems: 'center' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearchButtonClick} />
          </div>
          {/* Currency Selector (flags only, smaller, INR default) */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', marginRight: '8px' }}>
            <button
              style={{
                background: '#7A1528',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '4px 10px',
                cursor: 'pointer',
                minWidth: '40px',
                fontSize: '1.3rem',
                boxShadow: '0 2px 8px #a0a0a0',
                transition: 'background 0.1s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              onMouseOver={e => (e.currentTarget.style.background = '#a0213a')}
              onMouseOut={e => (e.currentTarget.style.background = '#7A1528')}
            >
              {currencyFlags.find(f => f.code === currency)?.label || '🇮🇳'}
              <span style={{ marginLeft: '2px', fontSize: '1rem' }}>▼</span>
            </button>
            {showCurrencyDropdown && (
              <div style={{
                position: 'absolute',
                top: '20px',
                left: 0,
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 8px #aaa',
                zIndex: 90,
                minWidth: '48px',
                overflow: 'hidden'
              }}>
                {currencyFlags.map(flag => (
                  <div
                    key={flag.code}
                    style={{
                      padding: '8px 10px',
                      cursor: 'pointer',
                      background: currency === flag.code ? '#7A1528' : 'transparent',
                      color: currency === flag.code ? '#fff' : '#222',
                      fontWeight: 'bold',
                      fontSize: '1.3rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'background 0.1s'
                    }}
                    onClick={() => { setCurrency(flag.code); setShowCurrencyDropdown(false); }}
                    onMouseOver={e => (e.currentTarget.style.background = '#f5e6ec')}
                    onMouseOut={e => (e.currentTarget.style.background = currency === flag.code ? '#7A1528' : 'transparent')}
                  >
                    {flag.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Auth Buttons */}
        <div className="auth" style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <>
            <Link to="/profile" className="profile-btn" style={{ marginLeft: "16px", background: "#7A1528", color: "#fff", padding: "8px 18px", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>{user.username}</Link>
            <button onClick={logout} className="profile-btn" style={{ marginLeft: "16px", background: "#7A1528", color: "#fff", padding: "8px 18px", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>Log Out</button>
            </>
          ) : (
            <>
              <button className="login" style={{ background: 'transparent', color: '#222', fontWeight: '500', fontSize: '1.1rem', border: 'none', marginRight: '8px', cursor: 'pointer' }} onClick={() => {setShowLogin(true)}} >
                Log In
              </button>
              <button className="signup" style={{ background: '#7A1528', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', borderRadius: '8px', padding: '8px 18px', cursor: 'pointer'}} onClick={() => {setShowSignup(true)}}
                >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

       {showLogin && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {showSignup && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modal, padding: '60px 48px', borderRadius: '16px', minWidth: '480px', minHeight: '520px', maxWidth: '600px' }}>
            <SignupForm onClose={() => setShowSignup(false)} />
          </div>
        </div>
      )}

      {/* Menu Bar - auctions sequence */}
      <div className="menu-bar">
        <Link to="/live-auctions" className="menu-link">LIVE AUCTION</Link>
        <Link to="/passed-auctions" className="menu-link">PAST AUCTION</Link>
        <Link to="/category/vintage" className="menu-link">VINTAGE</Link>
        <Link to="/category/fashion" className="menu-link">FASHION</Link>
        <Link to="/category/technology" className="menu-link">TECHNOLOGY</Link>
        <Link to="/category/art" className="menu-link">ART</Link>
        <Link to="/category/collectibles" className="menu-link">COLLECTIBLES</Link>
        <span
          className="menu-link"
          style={{ cursor: "pointer", fontWeight: 500 }}
          onClick={() => setShowCategories(!showCategories)}
        >
          All Category ⬇
        </span>
      </div>

      {/* Category Popup below All Category menu link */}
      <div style={{ position: "relative" }}>
        {showCategories && (
          <div className="category-popup" style={{ position: "absolute", top: "32px", right: 0, zIndex: 100 }}>
            <CategoryList onClose={() => setShowCategories(false)} />
          </div>
        )}
      </div>

      {/* Login and Signup Popups (unchanged) */}
      

      
    </>
  );
}

// ...existing styles and export...

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
