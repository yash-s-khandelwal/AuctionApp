function BuyBox({ product }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button style={{ marginRight: "10px", padding: "10px 20px" }}>
        Buy {product.name}
      </button>
      <button style={{ padding: "10px 20px" }}>Add to Cart</button>
    </div>
  );
}

export default BuyBox;
