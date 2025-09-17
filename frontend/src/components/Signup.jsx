import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginSignup.css';

function Signup() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", city: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/profile");
  };

  const styles = {
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
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      width: "100%",
      maxWidth: "380px",
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
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
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
              <input name="firstName" type="text" placeholder="First Name" style={styles.input} value={form.firstName} onChange={handleChange} />
              <input name="lastName" type="text" placeholder="Last Name" style={styles.input} value={form.lastName} onChange={handleChange} />
              <input name="email" type="email" placeholder="Email Address" style={styles.input} value={form.email} onChange={handleChange} />
              <input name="phone" type="text" placeholder="Phone Number" style={styles.input} value={form.phone} onChange={handleChange} />
              <button type="submit" style={styles.btn}>Sign Up</button>
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

