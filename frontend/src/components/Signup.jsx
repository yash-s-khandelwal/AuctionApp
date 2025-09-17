import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginSignup.css';

function Signup() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "" });
  const isPasswordMatch = form.password === form.confirmPassword;
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/profile");
  };

  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '32px',
    },
    gridItem: {
      width: '100%',
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #00c6ff, #0077cc)",
      fontFamily: "Segoe UI, sans-serif",
      position: "relative"
    },
    card: {
      background: "#fff",
      padding: "60px 48px",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
      width: "100%",
      maxWidth: "600px",
      minHeight: "520px",
      textAlign: "center",
      zIndex: 2,
      position: "relative"
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      zIndex: 1
    },
    title: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#222",
    },
    subtitle: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "20px",
    },
    input: {
  width: '100%',
  padding: '14px 12px',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxSizing: 'border-box',
  marginBottom: '0',
  background: '#f8f8fc',
    },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#0077cc",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
    },
    footer: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#0077cc",
      textDecoration: "none",
      fontWeight: "bold",
      marginLeft: "5px",
    },
    topBtn: {
      position: "absolute",
      top: 32,
      right: 48,
      fontWeight: 700,
      fontSize: "1.2rem",
      color: "#0077cc",
      letterSpacing: "1px",
      background: "#fff",
      border: "1px solid #0077cc",
      borderRadius: "8px",
      padding: "8px 20px",
      cursor: "pointer",
      zIndex: 3
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 600px) {
          .signup-grid {
            display: block !important;
          }
          .signup-grid-item {
            width: 100% !important;
            margin-bottom: 15px;
          }
        }
      `}</style>
      <button style={styles.btn} onClick={() => setShowForm(true)}>
        Sign Up
      </button>
      {showForm && (
        <>
          <div style={styles.overlay} onClick={() => setShowForm(false)} />
          <div style={styles.card}>
            <h2 style={styles.title}>Create Account 🚀</h2>
            <p style={styles.subtitle}>Join and explore exclusive auctions</p>
            <form onSubmit={handleSubmit}>
              <div style={styles.grid} className="signup-grid">
                <div style={styles.gridItem} className="signup-grid-item">
                  <input name="firstName" type="text" placeholder="First Name" style={styles.input} value={form.firstName} onChange={handleChange} />
                </div>
                <div style={styles.gridItem} className="signup-grid-item">
                  <input name="lastName" type="text" placeholder="Last Name" style={styles.input} value={form.lastName} onChange={handleChange} />
                </div>
                <div style={styles.gridItem} className="signup-grid-item">
                  <input name="phone" type="tel" placeholder="Phone Number" style={styles.input} value={form.phone} onChange={handleChange} />
                </div>
                <div style={styles.gridItem} className="signup-grid-item">
                  <input name="email" type="email" placeholder="Email" style={styles.input} value={form.email} onChange={handleChange} />
                </div>
                <div style={styles.gridItem} className="signup-grid-item">
                  <input name="password" type="password" placeholder="Password" style={styles.input} value={form.password} onChange={handleChange} />
                </div>
                <div style={styles.gridItem} className="signup-grid-item">
                  <input name="confirmPassword" type="password" placeholder="Confirm Password" style={styles.input} value={form.confirmPassword} onChange={handleChange} />
                </div>
              </div>
              {!isPasswordMatch && form.confirmPassword.length > 0 && (
                <div style={{ color: 'red', marginBottom: '12px', fontSize: '0.95rem' }}>
                  Password and Confirm Password do not match.
                </div>
              )}
              <button type="submit" style={{ ...styles.btn, opacity: isPasswordMatch ? 1 : 0.5, pointerEvents: isPasswordMatch ? 'auto' : 'none', width: '100%', fontSize: '1.2rem', padding: '16px 0', marginBottom: '16px' }} disabled={!isPasswordMatch}>Sign Up</button>
              <button type="submit" style={{ ...styles.btn, opacity: isPasswordMatch ? 1 : 0.5, pointerEvents: isPasswordMatch ? 'auto' : 'none' }} disabled={!isPasswordMatch}>Sign Up</button>
            </form>
            <p style={styles.footer}>
              Already have an account?
              <a href="/login" style={styles.link}> Log In</a>
            </p>
            <button style={{ ...styles.btn, background: "#eee", color: "#333", marginTop: "8px" }} onClick={() => setShowForm(false)}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;

