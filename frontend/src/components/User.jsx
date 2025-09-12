import React, { useEffect, useState } from 'react';
import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v0/user/getAllUsers')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    fetch('http://localhost:8080/api/v0/user/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add user');
        return res.json();
      })
      .then(newUser => {
        setUsers([...users, newUser]);
        setMessage('User added successfully!');
        setName('');
        setEmail('');
      })
      .catch(() => setError('Failed to add user.'));
  };

  return (
    <div className="user-page">
      <h2>Users</h2>
      <div style={{color: 'red'}}>If you see this message, the User component is rendering.</div>
      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}
      <div className="user-grid">
        {users.length === 0 && <div className="empty-msg">No users found.</div>}
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <img className="user-avatar" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=007bff&color=fff`} alt="Avatar" />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
      <h3>Add User</h3>
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default User;