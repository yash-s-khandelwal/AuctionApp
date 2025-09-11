import React, { useState } from "react";

const BuyBox = ({ product }) => {
  const [qty, setQty] = useState(1);

  return (
    <aside className="p-4 border rounded-xl bg-white shadow-sm">
      <div className="text-xl font-semibold">{product.currency} {product.price}</div>

      {/* Quantity */}
      <div className="mt-4">
        <label className="text-sm block">Quantity</label>
        <input
          type="number"
          value={qty}
          min="1"
          onChange={(e) => setQty(Number(e.target.value))}
          className="mt-1 w-24 px-2 py-1 border rounded"
        />
      </div>

      {/* Buttons */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Buy It Now
      </button>
      <button className="mt-2 w-full border py-2 rounded-lg">Add to Cart</button>

      {/* Shipping */}
      <div className="text-sm text-gray-600 mt-3">
        <div>Shipping: {product.shipping.cost}</div>
        <div>Est delivery: {product.shipping.estimated}</div>
      </div>
    </aside>
  );
};

export default BuyBox;
