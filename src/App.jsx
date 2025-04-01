import { useState, useEffect } from "react";

const responses = [
  "Sorry, we cannot help you.",
  "This action violates a guideline we won't specify.",
  "This message is automated. Again.",
  "Please submit a new ticket to get the same reply.",
  "We reviewed nothing, but your ban stands.",
  "Try contacting us again. We will ignore you again.",
  "You have reached maximum support attempts. Please reinstall life."
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
  const [buttonLoading, setButtonLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [soundEnabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        "Connecting to Steam Support...",
        "Loading auto-response engine...",
        "Connection established. You are now ignored."
      ]);
      setLoading(false);
    }, 2000);

    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        "Looks like you've been waiting a while. We recommend launching Half-Life 3 while you wait."
      ]);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (buttonLoading || loading) return;
    setButtonLoading(true);
    setTimeout(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const ticket = generateTicketID();
      let response;
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);

      if (newClickCount === 10) {
        response = "You have reached maximum support attempts. Please reinstall life.";
      } else {
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      const message = `[${timestamp}] [Ticket #${ticket}]\n${response}`;
      setMessages((prev) => [...prev, message]);
      setButtonLoading(false);

      if (soundEnabled) {
        const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
        audio.play();
      }
    }, 700);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#1b2838",
      color: "#c7d5e0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      flexDirection: "column"
    }}>
      <div style={{
        backgroundColor: "#2a475e",
        padding: "1.5rem",
        borderRadius: "1rem",
        width: "100%", maxWidth: "500px",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        marginBottom: "1rem"
      }}>
        <h1 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
          Steam Support Simulator
        </h1>

        {/* Account Summary Panel */}
        <div style={{
          backgroundColor: "#1b2838",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          lineHeight: 1.6
        }}>
          <p><strong>Account:</strong> sunnydiego</p>
          <p><strong>Years on Steam:</strong> 10</p>
          <p><strong>VAC Bans:</strong> 0</p>
          <p><strong>Community Bans:</strong> 1</p>
          <p><strong>Support Tickets Ignored:</strong> 183</p>
        </div>

        <div style={{ marginBottom: "1rem", whiteSpace: "pre-wrap", maxHeight: "400px", overflowY: "auto" }}>
          {messages.map((msg, i) => (
            <p key={i} style={{ backgroundColor: "#1b2838", padding: "0.5rem", borderRadius: "0.5rem", marginBottom: "0.5rem" }}>
              {msg}
            </p>
          ))}
        </div>

        <button onClick={handleClick} disabled={loading || buttonLoading} style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: loading ? "#6b7280" : "#66c0f4",
          color: "#1b2838",
          border: "none",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: loading || buttonLoading ? "not-allowed" : "pointer",
          transition: "background-color 0.3s"
        }}>
          {loading ? "Please wait..." : buttonLoading ? "Loading..." : "Get Support Response"}
        </button>
      </div>
    </div>
  );
}

export default App;
