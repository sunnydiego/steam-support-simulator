import { useState, useEffect } from "react";

const supportMessages = [
  "I don’t have the intention of bothering anyone, but I can’t get real help. On help.steampowered.com I only receive automated replies. I’ve done nothing wrong, yet my accounts were banned. Please help me.",
  "I’ve spent 10 years on Steam and never broken any rules. I opened new accounts to protect my CS skins from scams — not for commercial use. But I was banned for something I didn’t do. That’s all I ask: to be heard.",
  "I’ve never sold skins for money, never worked with gambling sites, and never violated the agreement. I’m being falsely labeled. Just because 99% might be guilty doesn’t mean I am.",
  "I feel like I’ve lost everything. My accounts, my work, my identity. I was banned without doing anything wrong. Please don’t ignore this like another ticket.",
  "All I want is fairness. I’m innocent. Yet every message I get is automated. Can someone — anyone — look at my case with human eyes? That’s all I ask."
];

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
        { from: "system", text: "Connecting to Steam Support..." },
        { from: "system", text: "Loading auto-response engine..." },
        { from: "system", text: "Connection established. You are now ignored." }
      ]);
      setLoading(false);
    }, 2000);

    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: "system", text: "Looks like you've been waiting a while. We recommend launching Half-Life 3 while you wait." }
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
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);

      const userText = supportMessages[Math.floor(Math.random() * supportMessages.length)];
      const response =
        newClickCount === 10
          ? "You have reached maximum support attempts. Please reinstall life."
          : responses[Math.floor(Math.random() * responses.length)];

      const reply = `[${timestamp}] [Ticket #${ticket}]\n${response}`;

      setMessages(prev => [
        ...prev,
        { from: "user", text: userText },
        { from: "support", text: reply }
      ]);

      setButtonLoading(false);

      if (soundEnabled) {
        const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
        audio.play();
      }
    }, 700);
  };

  const renderMessage = (msg, i) => {
    const baseStyle = {
      padding: "0.75rem",
      borderRadius: "0.75rem",
      marginBottom: "0.5rem",
      maxWidth: "80%",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
    };
    let style = {};
    if (msg.from === "user") {
      style = { ...baseStyle, backgroundColor: "#66c0f4", color: "#1b2838", alignSelf: "flex-end" };
    } else if (msg.from === "support") {
      style = { ...baseStyle, backgroundColor: "#1b2838", color: "#c7d5e0", alignSelf: "flex-start" };
    } else {
      style = { ...baseStyle, backgroundColor: "#374151", color: "#c7d5e0", alignSelf: "center", textAlign: "center" };
    }
    return <p key={i} style={style}>{msg.text}</p>;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #1b2838, #121a24)",
      color: "#c7d5e0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      flexDirection: "column"
    }}>
      <header style={{
        backgroundColor: "#2a475e",
        width: "100%",
        padding: "1rem",
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: "1rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
      }}>
        Steam Support Simulator
      </header>

      <div style={{
        backgroundColor: "#2a475e",
        padding: "1.5rem",
        borderRadius: "1rem",
        width: "100%", maxWidth: "500px",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Account Summary Panel */}
        <div style={{
          backgroundColor: "#1b2838",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          lineHeight: 1.6
        }}>
          <p><strong>Account:</strong> <a href="https://steamcommunity.com/id/sunnydieg0/" target="_blank" rel="noopener noreferrer" style={{ color: "#66c0f4" }}>https://steamcommunity.com/id/sunnydieg0/</a></p>
          <p><strong>Years on Steam:</strong> 10</p>
          <p><strong>VAC Bans:</strong> 0</p>
          <p><strong>Community Bans:</strong> 1</p>
          <p><strong>Support Tickets Ignored:</strong> 183</p>
        </div>

        {/* Chat */}
        <div style={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          whiteSpace: "pre-wrap",
          maxHeight: "400px",
          overflowY: "auto"
        }}>
          {messages.map((msg, i) => renderMessage(msg, i))}
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
          {loading ? "Please wait..." : buttonLoading ? "Loading..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}

export default App;