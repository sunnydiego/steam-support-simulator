import { useState, useEffect } from "react";

const responses = [
  "Sorry, we cannot help you.",
  "This action violates a guideline we won't specify.",
  "This message is automated. Again.",
  "Please submit a new ticket to get the same reply.",
  "We reviewed nothing, but your ban stands.",
  "Try contacting us again. We will ignore you again.",
];

const generateTicketID = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "HT-";
  for (let i = 0; i < 4; i++) id += chars[Math.floor(Math.random() * chars.length)];
  id += "-";
  for (let i = 0; i < 4; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
};

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        "Connecting to Steam Support...",
        "Loading auto-response engine...",
        "Connection established. You are now ignored."
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleClick = () => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ticket = generateTicketID();
    const response = responses[Math.floor(Math.random() * responses.length)];
    const message = `[${timestamp}] [Ticket #${ticket}]\n${response}`;
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#111827",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      flexDirection: "column"
    }}>
      <div style={{
        backgroundColor: "#1f2937",
        padding: "1.5rem",
        borderRadius: "1rem",
        width: "100%", maxWidth: "500px"
      }}>
        <h1 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
          Steam Support Simulator
        </h1>
        <div style={{ marginBottom: "1rem", whiteSpace: "pre-wrap" }}>
          {messages.map((msg, i) => (
            <p key={i} style={{ backgroundColor: "#374151", padding: "0.5rem", borderRadius: "0.5rem", marginBottom: "0.5rem" }}>
              {msg}
            </p>
          ))}
        </div>
        <button onClick={handleClick} disabled={loading} style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: loading ? "#6b7280" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer"
        }}>
          {loading ? "Please wait..." : "Get Support Response"}
        </button>
      </div>
    </div>
  );
}

export default App;