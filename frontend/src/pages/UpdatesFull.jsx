import React, { useState } from "react";

const updatesData = [
  // Bidding Updates
  { id: 1, type: "bid", icon: "🎯", text: "You are the highest bidder on Vintage Watch!", link: "/product/1", time: "10 sec ago", highlight: false },
  { id: 2, type: "bid", icon: "🎯", text: "Someone just placed a higher bid on Antique Vase.", link: "/product/2", time: "2 min ago", highlight: true },
  { id: 3, type: "bid", icon: "🎯", text: "Auction ended: You won! 🎉", link: "/product/3", time: "Today at 3:00 PM", highlight: true },
  // Personalized Suggestions
  { id: 4, type: "suggestion", icon: "💡", text: "Recommended for you: Rare Painting starting at $50.", link: "/product/4", time: "5 min ago", highlight: false },
  { id: 5, type: "suggestion", icon: "💡", text: "Trending item in your category: Classic Chair.", link: "/product/5", time: "8 min ago", highlight: false },
  // System Notifications
  { id: 6, type: "system", icon: "🔔", text: "Your profile is 80% complete — finish setup for better recommendations.", link: "/profile", time: "Yesterday", highlight: false },
  { id: 7, type: "system", icon: "🔔", text: "Payment reminder: Complete checkout for the item you won.", link: "/checkout", time: "Today at 2:00 PM", highlight: true },
  // Auction Highlights
  { id: 8, type: "highlight", icon: "🔥", text: "Hot Auction: 50 bids in the last 10 minutes.", link: "/auctions", time: "Just now", highlight: true },
  { id: 9, type: "highlight", icon: "🚀", text: "New Auction: Designer Handbag just went live!", link: "/product/6", time: "1 min ago", highlight: false },
];

const tagOptions = ["All", "Bids", "Suggestions", "System", "Highlights"];

function UpdatesFull() {
  const [filter, setFilter] = useState("All");
  const [readIds, setReadIds] = useState([]);

  const filteredUpdates = filter === "All"
    ? updatesData
    : updatesData.filter(u => {
        if (filter === "Bids") return u.type === "bid";
        if (filter === "Suggestions") return u.type === "suggestion";
        if (filter === "System") return u.type === "system";
        if (filter === "Highlights") return u.type === "highlight";
        return true;
      });

  const markAsRead = id => setReadIds([...readIds, id]);
  const clearAll = () => setReadIds([]);

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px rgba(40,60,90,0.10)", padding: "2.5rem" }}>
      <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#7A1F28", marginBottom: "1.5rem" }}>All Updates / Newsfeed</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        {tagOptions.map(tag => (
          <button
            key={tag}
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: 8,
              border: filter === tag ? "2px solid #7A1F28" : "1.5px solid #cfd8dc",
              background: filter === tag ? "#e9eafc" : "#f6f7fb",
              color: filter === tag ? "#7A1F28" : "#444",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
        <button onClick={clearAll} style={{ marginLeft: "auto", background: "#fff", color: "#a81c3a", border: "1.5px solid #a81c3a", borderRadius: 8, padding: "0.5rem 1.2rem", fontWeight: 600, cursor: "pointer" }}>Clear All</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredUpdates.map(item => (
          <li
            key={item.id}
            style={{
              marginBottom: "1.2rem",
              padding: "1.1rem 1rem",
              background: item.highlight ? "#fffbe6" : "#f6f7fb",
              borderRadius: 8,
              boxShadow: "0 1px 4px rgba(40,60,90,0.05)",
              opacity: readIds.includes(item.id) ? 0.5 : 1,
              position: "relative",
              cursor: "pointer"
            }}
            onClick={() => window.location.href = item.link}
          >
            <span style={{ fontSize: "1.3rem", marginRight: "0.7rem" }}>{item.icon}</span>
            <span style={{ fontWeight: 600, fontSize: "1.1rem", color: "#222" }}>{item.text}</span>
            <span style={{ fontSize: "0.95rem", color: "#7A1F28", marginLeft: "1rem" }}>{item.time}</span>
            <button
              onClick={e => { e.stopPropagation(); markAsRead(item.id); }}
              style={{ position: "absolute", right: 12, top: 12, background: "#fff", border: "1px solid #cfd8dc", borderRadius: 6, padding: "0.2rem 0.7rem", fontSize: "0.9rem", color: "#7A1F28", cursor: "pointer" }}
            >Mark as Read</button>
          </li>
        ))}
      </ul>
      <button style={{ marginTop: "2rem", background: "#7A1F28", color: "#fff", border: "none", borderRadius: 8, padding: "0.9rem 2.2rem", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }} onClick={() => window.location.href = "/updates"}>
        View all updates
      </button>
    </div>
  );
}

export default UpdatesFull;
