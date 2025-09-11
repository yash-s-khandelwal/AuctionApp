import React, { useEffect, useState } from 'react';
import './Product.css';


const Product = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add product');
        return res.json();
      })
      .then(newProduct => {
        setProducts([...products, newProduct]);
        setMessage('Product added successfully!');
        setName('');
        setDescription('');
        setPrice('');
      })
      .catch(() => setError('Failed to add product.'));
  };

  return (
    <div className="product-page">
      <h2>Products</h2>
      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}
      <div className="product-grid">
        {products.length === 0 && <div className="empty-msg">No products found.</div>}
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img className="product-img" src="https://via.placeholder.com/150" alt="Product" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price || 'N/A'}</p>
              <button className="details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
      <h3>Add Product</h3>
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" min="0" step="0.01" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Product;