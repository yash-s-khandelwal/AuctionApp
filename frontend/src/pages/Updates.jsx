import React, { useEffect, useState } from "react";

function Updates() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate real-time data fetch (replace with your backend API)
    const fetchNews = async () => {
      try {
        // Example: fetch from /api/newsfeed
        // const response = await axios.get("/api/newsfeed");
        // setNews(response.data);
        setNews([
          { id: 1, title: "Auction closing soon!", time: "Just now" },
          { id: 2, title: "New product added: Vintage Watch", time: "2 min ago" },
          { id: 3, title: "Your bid was outbid!", time: "5 min ago" },
        ]);
      } catch (err) {
        setError("Failed to load updates.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    // Optionally, poll for updates every 30s
    // const interval = setInterval(fetchNews, 30000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(40,60,90,0.10)", padding: "2rem" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#7A1F28", marginBottom: "1.5rem" }}>Updates / Newsfeed</h2>
      {loading ? (
        <p>Loading updates...</p>
      ) : error ? (
        <p style={{ color: "#a81c3a" }}>{error}</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {news.map(item => (
            <li key={item.id} style={{ marginBottom: "1.2rem", padding: "1rem", background: "#f6f7fb", borderRadius: 8, boxShadow: "0 1px 4px rgba(40,60,90,0.05)" }}>
              <div style={{ fontWeight: 600, fontSize: "1.1rem", color: "#222" }}>{item.title}</div>
              <div style={{ fontSize: "0.95rem", color: "#7A1F28", marginTop: "0.3rem" }}>{item.time}</div>
            </li>
          ))}
        </ul>
      )}
      <button style={{ marginTop: "2rem", background: "#7A1F28", color: "#fff", border: "none", borderRadius: 8, padding: "0.9rem 2.2rem", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }} onClick={() => window.location.href = "/updates-full"}>
        View all updates
      </button>
    </div>
  );
}

export default Updates;
