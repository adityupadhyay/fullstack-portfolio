import React, { useState } from "react";
import { motion } from "framer-motion";

interface ContactProps {
  currentMode?: string;
}

export const Contact: React.FC<ContactProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "clamp(3rem, 6vw, 5rem) 1rem clamp(4rem, 8vw, 6rem) 1rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          background: "rgba(11, 13, 20, 0.88)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "clamp(18px, 3vw, 24px)",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.65)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              color: "#38bdf8",
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
            }}
          >
             Connect
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#ffffff",
              margin: "0.5rem 0 0 0",
              fontWeight: 800,
            }}
          >
            Get In Touch
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: "0.5rem 0 0 0" }}>
            Have a project, role, or analytics pipeline to discuss? Send a direct message.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1rem",
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                background: "#080a10",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "12px 14px",
                color: "#ffffff",
                fontSize: "0.92rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                background: "#080a10",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "12px 14px",
                color: "#ffffff",
                fontSize: "0.92rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <textarea
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            style={{
              width: "100%",
              background: "#080a10",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              padding: "12px 14px",
              color: "#ffffff",
              fontSize: "0.92rem",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "opacity 0.2s ease",
            }}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <div style={{ color: "#34d399", fontSize: "0.9rem", textAlign: "center" }}>
              Message transmitted successfully!
            </div>
          )}
          {status === "error" && (
            <div style={{ color: "#f87171", fontSize: "0.9rem", textAlign: "center" }}>
              Failed to transmit message. Please check the backend connection.
            </div>
          )}
        </form>
      </motion.div>
    </section>
  );
};