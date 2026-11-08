import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  const devSkills = [
    "PHP",
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Node.js",
    "Express.js",
    "RESTful APIs",
    "Tailwind CSS",
    "Three.js / WebGL",
    "Git & GitHub",
  ];

  const analystSkills = [
    "Python",
    "Data Cleaning",
    "Pandas & NumPy",
    "EDA Pipelines",
    "SQL / Relational DBs",
    "AI Systems Evaluation",
    "Statistical Modeling",
    "Data Visualization",
    "Feature Engineering",
    "Jupyter Lab",
  ];

  return (
    <section
      id="about"
      style={{
        maxWidth: "1150px",
        margin: "0 auto",
        padding: "clamp(3rem, 6vw, 5rem) 1rem clamp(4rem, 8vw, 6rem) 1rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        style={{
          background: "rgba(11, 13, 20, 0.88)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "clamp(18px, 3vw, 24px)",
          padding: "clamp(1.5rem, 4vw, 3.5rem)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.65)",
        }}
      >
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              color: "#38bdf8",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "0.75rem",
            }}
          >
            Technical Competencies
          </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 4.5vw, 2.7rem)",
              color: "#f8fafc",
              margin: 0,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
            }}
          >
            Bridging Software Development & Data Intelligence
          </h2>
        </div>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
            lineHeight: 1.75,
            margin: "0 0 2rem 0",
            maxWidth: "920px",
          }}
        >
          I am a technologist pursuing a Bachelor of Computer Applications, combining practical experience across full-stack engineering and data analytics. Having completed hands-on internships in AI Data Analytics and full-stack web development, I build clean, deterministic web architectures while leveraging Python and SQL to clean, model, and extract actionable meaning from complex datasets.
        </p>

        {/* Dual Stack Cards: Auto-fit down to mobile dimensions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {/* Card 1: Developer Stack */}
          <div
            style={{
              background: "rgba(37, 99, 235, 0.05)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "16px",
              padding: "clamp(1.25rem, 3vw, 1.75rem)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#38bdf8" }}>
                💻 Web & Software Dev
              </div>
              <Link
                to="/developer"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Open Page →
              </Link>
            </div>

            <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.6 }}>
              Crafting scalable web architectures, clean RESTful backend services with PHP and Node, modular frontend apps, and interactive 3D WebGL interfaces.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
              {devSkills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "rgba(56, 189, 248, 0.08)",
                    border: "1px solid rgba(56, 189, 248, 0.2)",
                    color: "#e2e8f0",
                    padding: "3px 9px",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Data Analyst Stack */}
          <div
            style={{
              background: "rgba(13, 148, 136, 0.05)",
              border: "1px solid rgba(45, 212, 191, 0.3)",
              borderRadius: "16px",
              padding: "clamp(1.25rem, 3vw, 1.75rem)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2dd4bf" }}>
                📊 Data Analytics & AI
              </div>
              <Link
                to="/analyst"
                style={{
                  background: "#0d9488",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Open Page →
              </Link>
            </div>

            <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.6 }}>
              Conducting data cleansing, pipeline engineering, AI model/agent benchmarking, and converting noisy multi-source metrics into clear business actions.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
              {analystSkills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "rgba(45, 212, 191, 0.08)",
                    border: "1px solid rgba(45, 212, 191, 0.2)",
                    color: "#e2e8f0",
                    padding: "3px 9px",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};