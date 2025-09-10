import React from "react";
import "./Login.css";
function Login() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1a73e8, #00c6ff)",
      fontFamily: "Segoe UI, sans-serif",
    },
    card: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(12px)",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "380px",
      textAlign: "center",
      animation: "fadeIn 0.8s ease-in-out",
      color: "#fff",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "15px",
      color: "#e0e0e0",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "14px",
      margin: "12px 0",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
      background: "rgba(255, 255, 255, 0.1)",
      color: "#fff",
      transition: "0.3s",
    },
    inputFocus: {
      border: "1px solid #00c6ff",
      boxShadow: "0 0 6px rgba(0, 198, 255, 0.6)",
    },
    btn: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(135deg, #0077cc, #00c6ff)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "14px",
      transition: "all 0.3s ease",
    },
    btnHover: {
      transform: "scale(1.05)",
      boxShadow: "0 4px 12px rgba(0, 198, 255, 0.5)",
    },
    footer: {
      marginTop: "18px",
      fontSize: "14px",
      color: "#f1f1f1",
    },
    link: {
      color: "#00c6ff",
      textDecoration: "none",
      fontWeight: "bold",
      marginLeft: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Log in to continue bidding</p>

        <form>
          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            onFocus={(e) => (e.target.style = { ...styles.input, ...styles.inputFocus })}
            onBlur={(e) => (e.target.style = styles.input)}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onFocus={(e) => (e.target.style = { ...styles.input, ...styles.inputFocus })}
            onBlur={(e) => (e.target.style = styles.input)}
          />

          <button
            type="submit"
            style={styles.btn}
            onMouseEnter={(e) => (e.target.style = { ...styles.btn, ...styles.btnHover })}
            onMouseLeave={(e) => (e.target.style = styles.btn)}
          >
            Log In
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account?
          <a href="/signup" style={styles.link}> Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
