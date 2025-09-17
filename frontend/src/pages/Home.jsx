import React from "react";
import "./Home.css"; 

function Home() {
  const { currency, setCurrency } = typeof window !== 'undefined' && window.__AUCTION_CURRENCY_PROPS__ ? window.__AUCTION_CURRENCY_PROPS__ : { currency: 'USD', setCurrency: () => {} };
  const currencyFlags = [
    { code: 'USD', label: '🇺🇸' },
    { code: 'INR', label: '🇮🇳' },
    { code: 'EUR', label: '🇪🇺' },
    { code: 'GBP', label: '🇬🇧' }
  ];

  return (
    <div className="home">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="logo">
          <span className="heart">♥</span> rubylane<span className="dot">.com</span>
        </div>
        {/* Currency Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '32px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Currency:</span>
          {currencyFlags.map(flag => (
            <button
              key={flag.code}
              style={{ fontSize: '2rem', background: currency === flag.code ? '#7A1528' : 'transparent', color: currency === flag.code ? '#fff' : '#222', border: 'none', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer' }}
              onClick={() => setCurrency(flag.code)}
              title={flag.code}
            >
              {flag.label}
            </button>
          ))}
        </div>
        <nav className="menu">
          <a href="#">SHOP</a>
          <a href="#">SELL</a>
          <a href="#">RELAX</a>
        </nav>
        <div className="actions">
          <input type="text" placeholder="Search for items or dealers" />
          <a href="#">Sign In</a>
          <a href="#">Help</a>
          <a href="#">Cart 🛒</a>
        </div>
      </header>

      {/* Categories */}
      <div className="categories">
        <a href="#">Jewelry</a>
        <a href="#">Dolls</a>
        <a href="#">Collectibles</a>
        <a href="#">Art</a>
        <a href="#">Furniture & Lighting</a>
        <a href="#">Fashion</a>
        <a href="#">Glass</a>
        <a href="#">Porcelain & Pottery</a>
        <a href="#">Silver</a>
        <a href="#" className="sale">SALE!</a>
      </div>
    </div>
  );
}

export default Home;
