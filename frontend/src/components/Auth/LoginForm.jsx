// src/frontend/src/components/Auth/LoginForm.jsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosConfig';

function LoginForm({ onClose }) {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get the login function from context

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(loginForm)
    try {
      const response = await api.post('api/v0/auth/login', loginForm);
      login(response.data); // Store JWT token in context
      onClose(); // Close the modal
    } catch (err) {
      console.log(err)
      setError('Invalid username or password.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-modal" style={{ padding:'20px', margin:'auto'}}>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <input type="text" name="username" placeholder="Username" style={styles.input} value={loginForm.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" style={styles.input} value={loginForm.password} onChange={handleChange} required />
        <button type="submit" style={{ ...styles.primaryBtn, width: '100%' }}
          disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
      </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>

      <button className="close-btn" style={{ ...styles.closeBtn, width: '120px' }} onClick={onClose}>Close</button>
    </div>
  );
}
const styles = {
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#7A1F28",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  closeBtn: {
    marginTop: "10px",
    padding: "8px 14px",
    backgroundColor: "#ddd",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
}
export default LoginForm;