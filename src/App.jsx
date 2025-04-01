import { useState } from "react";

const responses = [
  "Sorry, we cannot help you.",
  "This action violates a guideline we won't specify.",
  "This message is automated. Again.",
  "Please submit a new ticket to get the same reply.",
  "We reviewed nothing, but your ban stands.",
  "Try contacting us again. We will ignore you again.",
];

function App() {
  const [messages, setMessages] = useState([
    "Welcome to Steam Support. Please wait... Forever.",
  ]);

  const handleClick = () => {
    const newMessage =
      responses[Math.floor(Math.random() * responses.length)];
    setMessages((prev) => [...prev, newMessage]);
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
        <div style={{ marginBottom: "1rem" }}>
          {messages.map((msg, i) => (
            <p key={i} style={{ backgroundColor: "#374151", padding: "0.5rem", borderRadius: "0.5rem", marginBottom: "0.5rem" }}>
              {msg}
            </p>
          ))}
        </div>
        <button onClick={handleClick} style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          cursor: "pointer"
        }}>
          Get Support Response
        </button>
      </div>
    </div>
  );
}

export default App;
