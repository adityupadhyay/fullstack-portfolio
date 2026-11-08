import React from "react";

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer style={{
      position: "relative",
      zIndex: 10,
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      padding: "2.5rem 1.5rem",
      textAlign: "center",
      background: "rgba(4, 5, 10, 0.9)",
      color: "#6b7280",
      fontSize: "0.85rem"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem"
      }}>
        <p style={{ margin: 0 }}>
          Designed & Built with React, Three.js & Express.
        </p>
        <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
          © {new Date().getFullYear()} All rights reserved.
          {/* Discreet Admin Trigger Symbol */}
          <span
            onClick={onOpenAdmin}
            title=""
            style={{
              opacity: 0.15,
              cursor: "pointer",
              transition: "opacity 0.2s ease",
              userSelect: "none",
              padding: "0 2px"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.15")}
          >
            π
          </span>
        </p>
      </div>
    </footer>
  );
};