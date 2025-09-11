import { useParams } from "react-router-dom";
import productMock from "../data/productMock";
import BuyBox from "../components/BuyBox";

function ProductPage() {
  const { id } = useParams();
  const product = productMock.find((p) => p.id === parseInt(id));

  if (!product) return <div className="text-center py-10 text-xl">Product not found!</div>;

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-[400px] h-[400px] object-cover rounded-lg shadow"
        />

        {/* Product Info */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">{product.price}</p>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-semibold">Condition:</span> {product.condition}</p>
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold">Color:</span> {product.color}</p>
            <p><span className="font-semibold">Material:</span> {product.material}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Type:</span> {product.type}</p>
            <p><span className="font-semibold">Country of Manufacture:</span> {product.country}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Buy It Now
            </button>
            <button className="bg-gray-200 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Item Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Seller Info */}
      {product.seller && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-2">About this seller</h3>
          <p className="font-bold">{product.seller.name}</p>
          <p className="text-gray-600">{product.seller.feedback} feedback</p>
          <p className="text-gray-600">{product.seller.itemsSold} items sold</p>
          <p className="text-gray-600">Member since {product.seller.memberSince}</p>
          <p className="text-gray-600">{product.seller.responseTime}</p>

          <h4 className="text-lg font-semibold mt-4">Recent Sales:</h4>
          <ul className="list-disc list-inside text-gray-700">
            {product.seller.recentSales.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
