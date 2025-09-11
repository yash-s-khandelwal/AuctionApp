import { useParams } from "react-router-dom";
import productMock from "../data/productMock";

function ProductPage() {
  const { id } = useParams();
  const product = productMock.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found!</div>;

  return (
    <div className="product-page" style={{ padding: "20px" }}>
      <div className="product-top" style={{ display: "flex", gap: "20px" }}>
        <img src={product.image} alt={product.name} style={{ width: "400px", height: "400px", objectFit: "cover" }} />
        
        <div className="product-info" style={{ maxWidth: "600px" }}>
          <h1>{product.name}</h1>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{product.price}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Material:</strong> {product.material}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Country of Manufacture:</strong> {product.country}</p>

          <div className="purchase-buttons" style={{ marginTop: "20px" }}>
            <button style={{ marginRight: "10px", padding: "10px 20px" }}>Buy It Now</button>
            <button style={{ padding: "10px 20px" }}>Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="product-description" style={{ marginTop: "40px" }}>
        <h2>Item Description</h2>
        <p>{product.description}</p>
      </div>
      
{/* Seller Info */}
{product.seller && (
  <div className="seller-info" style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
    <h3>About this seller</h3>
    <p><strong>{product.seller.name}</strong></p>
    <p>{product.seller.feedback} feedback</p>
    <p>{product.seller.itemsSold} items sold</p>
    <p>Member since {product.seller.memberSince}</p>
    <p>{product.seller.responseTime}</p>
    <h4>Recent Sales:</h4>
    <ul>
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
