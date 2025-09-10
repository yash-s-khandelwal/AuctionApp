import React from "react";
import AuctionTimer from "./AuctionTimer";  // import timer
import "./Card.css";

function Card({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      {/* Auction countdown */}
      <AuctionTimer endTime={product.endTime} />

      <button>View Details</button>
    </div>
  );
}

export default Card;
