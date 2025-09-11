import React, { useEffect, useState } from 'react';
import './Bid.css';

const Bid = () => {
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/bids')
      .then(res => res.json())
      .then(data => setBids(data));
  }, []);

  const handleAddBid = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    fetch('http://localhost:8080/bids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, userId, productId })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add bid');
        return res.json();
      })
      .then(newBid => {
        setBids([...bids, newBid]);
        setMessage('Bid placed successfully!');
        setAmount('');
        setUserId('');
        setProductId('');
      })
      .catch(() => setError('Failed to place bid.'));
  };

  const highestBid = bids.reduce((max, bid) => bid.amount > max ? bid.amount : max, 0);

  return (
    <div className="bid-page">
      <h2>Bids</h2>
      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}
      <div className="bid-grid">
        {bids.length === 0 && <div className="empty-msg">No bids found.</div>}
        {bids.map(bid => (
          <div className={`bid-card${bid.amount == highestBid ? ' highest' : ''}`} key={bid.id}>
            <div className="bid-info">
              <h3>Bid: ${bid.amount}</h3>
              <p>User ID: {bid.userId}</p>
              <p>Product ID: {bid.productId}</p>
              {bid.amount == highestBid && <span className="highest-badge">Highest</span>}
            </div>
          </div>
        ))}
      </div>
      <h3>Add Bid</h3>
      <form className="add-bid-form" onSubmit={handleAddBid}>
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" type="number" min="0" step="0.01" required />
        <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" required />
        <input value={productId} onChange={e => setProductId(e.target.value)} placeholder="Product ID" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Bid;