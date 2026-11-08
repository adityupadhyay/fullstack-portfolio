import React from "react";

export const Navbar: React.FC = () => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "rgba(8, 9, 11, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "1rem 2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Brand */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "#ffffff",
            fontFamily: "'Oswald', sans-serif",
            fontSize: "1.25rem",
            letterSpacing: "0.08em",
            fontWeight: 800,
          }}
        >
          <span
            style={{
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "50%",
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 10px #f59e0b",
            }}
          />
          ADITYA UPADHYAY.
        </a>

        {/* Navigation Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
          }}
          className="hidden md:flex"
        >
          <a href="#about" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>01 // ABOUT</a>
          <a href="#projects" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>02 // PROJECTS</a>
          <a href="#skills" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>03 // SKILLS</a>
          <a href="#experience" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>04 // EXPERIENCE</a>
          <a href="#contact" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>05 // TRANSMISSION</a>
        </nav>

        {/* Let's Talk CTA */}
        <a
          href="#contact"
          className="interactive-btn"
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "0.25rem",
            backgroundColor: "#fbbf24",
            color: "#000000",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            boxShadow: "0 0 15px rgba(245, 158, 11, 0.35)",
          }}
        >
          LET'S TALK
        </a>
      </div>
    </header>
  );
};

export default Navbar;