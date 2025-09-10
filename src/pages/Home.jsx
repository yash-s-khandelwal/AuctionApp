import React from "react";
import "./Home.css"; 

function Home() {
  return (
    <div className="home">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="logo">
          <span className="heart">♥</span> rubylane<span className="dot">.com</span>
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
