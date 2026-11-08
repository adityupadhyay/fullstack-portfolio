import React from "react";
import { ArrowRight, Download } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        position: "relative",
        zIndex: 10,
        boxSizing: "border-box",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Status Badge */}
          <div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                color: "#fbbf24",
                padding: "0.35rem 0.85rem",
                borderRadius: "9999px",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                backgroundColor: "rgba(245, 158, 11, 0.08)",
                display: "inline-block",
              }}
            >
              AVAILABLE FOR HIGH-IMPACT ROLES
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 0.95,
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            I BUILD <br />
            <span
              className="shimmer-text"
              style={{
                background: "linear-gradient(135deg, #FFF9D2 0%, #F59E0B 50%, #8A6E24 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DIGITAL
            </span>{" "}
            <br />
            EXPERIENCES
          </h1>

          {/* Subtags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {["FULL STACK DEVELOPER", "UI/UX DESIGNER", "DATA SCIENCE"].map((role) => (
              <span
                key={role}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#9ca3af",
                  padding: "0.25rem 0.65rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "0.25rem",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                }}
              >
                {role}
              </span>
            ))}
          </div>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: "34rem",
              margin: 0,
            }}
          >
            I turn bold ideas into seamless digital experiences, where frontend meets powerful backend, and code transforms into real-world impact.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem" }}>
            <a
              href="#projects"
              className="interactive-btn"
              style={{
                padding: "0.85rem 1.75rem",
                borderRadius: "0.25rem",
                backgroundColor: "#fbbf24",
                color: "#000000",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 800,
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)",
              }}
            >
              EXPLORE MY WORK <ArrowRight size={15} />
            </a>

            <a
              href="d_resume.pdf"
              //target="_blank"
              rel="noreferrer"
              style={{
                padding: "0.85rem 1.5rem",
                borderRadius: "0.25rem",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                color: "#ffffff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              DOWNLOAD RESUME <Download size={15} />
            </a>
          </div>
        </div>

        {/* Right Column: Avatar Glass Card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="interactive-card"
            style={{
              width: "100%",
              maxWidth: "380px",
              borderRadius: "1rem",
              backgroundColor: "rgba(14, 16, 20, 0.9)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "360px",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backgroundColor: "#000000",
              }}
            >
              <img
                src="/profile.png"
                alt="Aditya Upadhyay"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                }}
              />
            </div>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  color: "#fbbf24",
                  textTransform: "uppercase",
                }}
              >
                CODE IS MY CRAFT, IMPACT IS MY GOAL.
              </span>
              <h3
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Aditya Upadhyay
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;