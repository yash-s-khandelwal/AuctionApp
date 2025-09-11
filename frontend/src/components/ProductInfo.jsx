import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-sm text-gray-500 mt-1">{product.condition}</p>

      <div className="mt-4">
        <div className="text-3xl font-semibold">{product.currency} {product.price}</div>
        <p className="text-sm text-gray-600 mt-1">Free returns • 30-day returns</p>
      </div>

      <div className="mt-6">
        <h3 className="font-medium">Seller</h3>
        <p className="text-sm text-gray-700 mt-1">
          {product.seller.name} • {product.seller.rating}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
