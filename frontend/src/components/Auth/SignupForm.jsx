// src/frontend/src/components/Auth/SignupForm.jsx

import React, { useState } from 'react';
import api from '../../api/axiosConfig';

function SignupForm({ onClose }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Regex patterns for validation
  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\d{10}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim() || !nameRegex.test(form.firstName)) {
      newErrors.firstName = 'First name cannot be empty and must not contain numbers.';
    }
    if (!form.lastName.trim() || !nameRegex.test(form.lastName)) {
      newErrors.lastName = 'Last name cannot be empty and must not contain numbers.';
    }
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim() || !phoneRegex.test(form.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
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
        setForm({ firstName: '', lastName: '', phone: '', email: '', password: '', confirmPassword: '' });
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
    <div>
    <form onSubmit={handleSubmit}>
      {message && <div style={{ color: message.includes('successful') ? 'green' : 'red', marginBottom: '12px', fontSize: '0.95rem' }}>{message}</div>}
      
      <div style={styles.grid} className="signup-grid">
        <div style={styles.gridItem} className="signup-grid-item">
          <input name="firstName" type="text" placeholder="First Name" style={styles.input} value={form.firstName} onChange={handleChange} />
          {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
        </div>
        <div style={styles.gridItem} className="signup-grid-item">
          <input name="lastName" type="text" placeholder="Last Name" style={styles.input} value={form.lastName} onChange={handleChange} />
          {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
        </div>
        <div style={styles.gridItem} className="signup-grid-item">
          <input name="phone" type="tel" placeholder="Phone Number" style={styles.input} value={form.phone} onChange={handleChange} />
          {errors.phone && <span style={styles.error}>{errors.phone}</span>}
        </div>
        <div style={styles.gridItem} className="signup-grid-item">
          <input name="email" type="email" placeholder="Email" style={styles.input} value={form.email} onChange={handleChange} />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>
        <div style={styles.gridItem} className="signup-grid-item">
          <input name="password" type="password" placeholder="Password" style={styles.input} value={form.password} onChange={handleChange} />
          {errors.password && <span style={styles.error}>{errors.password}</span>}
        </div>
        <div style={styles.gridItem} className="signup-grid-item">
          <input name="confirmPassword" type="password" placeholder="Confirm Password" style={styles.input} value={form.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
        </div>
      </div>

          <button
            type="submit"
            style={{ ...styles.primaryBtn, width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <button style={{ ...styles.closeBtn, width: '120px' }} onClick={onClose}>
          Close
        </button>
      </div>
  
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
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
};


export default SignupForm;