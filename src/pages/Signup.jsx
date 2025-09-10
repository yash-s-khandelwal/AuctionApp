import React from "react";

function Signup() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #00c6ff, #0077cc)",
      fontFamily: "Segoe UI, sans-serif",
    },
    card: {
      background: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      width: "100%",
      maxWidth: "380px",
      textAlign: "center",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Join and explore exclusive auctions</p>

        <form>
          <input type="text" placeholder="Full Name" style={styles.input} />
          <input type="email" placeholder="Email Address" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />

          <button type="submit" style={styles.btn}>Sign Up</button>
        </form>

        <p style={styles.footer}>
          Already have an account?
          <a href="/login" style={styles.link}> Log In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
