// src/pages/CategoryPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css'; // Import the new CSS file

const CategoryPage = () => {
  const { categoryId, categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/v0/category/getProductInCategory/${categoryId}`);
        setProducts(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch products for this category.');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="auction-list stylish-bg">
      <h2 className="auction-title">Products in Category: {categoryName}</h2>
      <div className="auction-grid stylish-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div className="auction-card stylish-card" key={product.productId}>
              <img src={product.imageUrl?product.imageUrl:`https://picsum.photos/seed/${product.productId}/400/300`} alt={product.productName} className="auction-img" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#222', margin: '1rem 0 0.5rem' }}>{product.productName}</h3>
              <p style={{ fontWeight: '600', color: '#333' }}>
                Minimum Bid: <span style={{ color: 'rgba(18, 18, 19, 1)' }}>₹{product.minimumBid}</span>
              </p>
              <p style={{ color: '#555', fontSize: '1rem' }}>Auction: {new Date(product.auctionStartDate).toLocaleDateString()} - {new Date(product.auctionEndDate).toLocaleDateString()}</p>
              <Link to={`/product/${product.productId}`} className="auction-link" style={{ display: 'inline-block', marginTop: '1rem', background: '#7A1528', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s' }}>View Details</Link>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: '1.2rem', color: '#7A1528', fontWeight: '600' }}>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;