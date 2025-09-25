// src/frontend/src/components/Auth/SignupForm.jsx

import React, { useState } from 'react';
import api from '../../api/axiosConfig';

function SignupForm({ onClose }) {
  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\d{10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear errors for the current field on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Username is required.';
    if (!form.firstName.trim() || !nameRegex.test(form.firstName)) newErrors.firstName = 'First name is required and must not contain numbers.';
    if (!form.lastName.trim() || !nameRegex.test(form.lastName)) newErrors.lastName = 'Last name is required and must not contain numbers.';
    if (!form.phoneNumber.trim() || !phoneRegex.test(form.phoneNumber)) newErrors.phoneNumber = 'Phone number must be exactly 10 digits.';
    if (!form.email.trim() || !emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email address.';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    
    setErrors({});
    
    try {
      const response = await api.post('api/auth/signup', form);
      if (response.status === 201) {
        setMessage('Registration successful! You can now log in.');
        setForm({ username: '', firstName: '', lastName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An unexpected network error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modal}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {message && <div style={{ color: message.includes('successful') ? 'green' : 'red', marginBottom: '12px', fontSize: '0.95rem' }}>{message}</div>}
        
        <div style={styles.grid}>
          {/* First Column */}
          <div style={styles.gridItem}>
            <input name="username" type="text" placeholder="Username" style={styles.input} value={form.username} onChange={handleChange} />
            {errors.username && <span style={styles.error}>{errors.username}</span>}
          </div>
          <div style={styles.gridItem}>
            <input name="firstName" type="text" placeholder="First Name" style={styles.input} value={form.firstName} onChange={handleChange} />
            {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
          </div>
          <div style={styles.gridItem}>
            <input name="phoneNumber" type="tel" placeholder="Phone Number" style={styles.input} value={form.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <span style={styles.error}>{errors.phoneNumber}</span>}
          </div>
          <div style={styles.gridItem}>
            <input name="password" type="password" placeholder="Password" style={styles.input} value={form.password} onChange={handleChange} />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>
          
          {/* Second Column */}
          <div style={styles.gridItem}>
            <input name="lastName" type="text" placeholder="Last Name" style={styles.input} value={form.lastName} onChange={handleChange} />
            {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
          </div>
          <div style={styles.gridItem}>
            <input name="email" type="email" placeholder="Email" style={styles.input} value={form.email} onChange={handleChange} />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
          <div style={styles.gridItem}>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" style={styles.input} value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
          </div>
        </div>
        
        <button type="submit" style={styles.primaryBtn} disabled={loading}>{loading ? 'Registering...' : 'Sign Up'}</button>
      </form>
      <button style={styles.closeBtn} onClick={onClose}>
        Close
      </button>
    </div>
  );
}

// Re-using styles from your Navbar context
const styles = {
    modal: {
        background: "white",
        padding: "2px",
        borderRadius: "10px",
        width: "500px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
    input: {
        width: "100%",
        padding: "1px",
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
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
    },
    gridItem: {
        flex: '1 1 48%',
        minWidth: '150px',
    },
    error: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '-8px',
        display: 'block',
    }
};

export default SignupForm;