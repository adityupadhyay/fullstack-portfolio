import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface DevProject {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
}

export const DeveloperPage: React.FC = () => {
  const [projects, setProjects] = useState<DevProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiBase =
          import.meta.env.VITE_API_URL ||
          (typeof window !== "undefined" && window.location.hostname === "localhost"
            ? "http://localhost:5000/api"
            : "https://fullstack-portfolio-2gkn.onrender.com/api");

        const res = await fetch(`${apiBase}/projects`);
        const data = await res.json();
        if (res.ok && data.status === "success" && data.data.length > 0) {
          const filtered = data.data.filter((p: any) => p.category === "developer");
          if (filtered.length > 0) {
            setProjects(filtered);
            return;
          }
        }
      } catch {
        // Fallback below
      }

      setProjects([
        {
          id: "dev_01",
          title: "3D Portfolio",
          description:
            "My custom WebGL site engineered with high-performance shader pipelines and responsive interactive geometry.",
          tags: ["React", "Three.js", "WebGL"],
          githubUrl: "#",
          liveUrl: "#",
          status: "Live Production",
        },
        {
          id: "dev_02",
          title: "SOFTWARE RELEASE RISK HEATMAP",
          description:
            "Full-stack production release risk management platform utilizing machine learning to analyze past commits, test coverage, and infrastructure logs to compute release failure probabilities.",
          tags: ["NEXT.JS", "PYTHON", "REDIS", "DOCKER"],
          githubUrl: "#",
          liveUrl: "#",
          status: "Live Production",
        },
        {
          id: "dev_03",
          title: "PAYMENT GATEWAY WITH HOSTED CHECKOUT",
          description:
            "End-to-end payment gateway infrastructure supporting merchant order processing, multi-currency conversion, cryptographic webhook verification, and zero double-charging transactions.",
          tags: ["SPRING BOOT", "POSTGRESQL", "KAFKA", "REDIS"],
          githubUrl: "#",
          liveUrl: "#",
          status: "PCI-DSS Compliant",
        },
      ]);
    };

    fetchProjects();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#06070a",
        color: "#d1d5db",
        minHeight: "100vh",
        width: "100%",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <header
        style={{
          width: "100%",
          padding: "1rem 1.25rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          boxSizing: "border-box",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          backgroundColor: "rgba(6, 7, 10, 0.95)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.15em",
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          PORTFOLIO.
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.25rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "9999px",
              backgroundColor: "#272a34",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            💻 Dev
          </span>
          <Link
            to="/analyst"
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "9999px",
              color: "#9ca3af",
              fontSize: "0.75rem",
              textDecoration: "none",
            }}
          >
            📊 Analyst
          </Link>
        </div>

        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem" }}>
          <Link to="/#about" style={{ color: "#9ca3af", textDecoration: "none" }}>About</Link>
          <Link to="/#contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact</Link>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "2rem 1rem 4rem",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.78rem",
              color: "#9ca3af",
              textDecoration: "none",
              padding: "0.45rem 0.85rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <ArrowLeft size={14} /> Back to Overview
          </Link>

          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#60a5fa",
              backgroundColor: "rgba(37, 99, 235, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              padding: "0.4rem 0.85rem",
              borderRadius: "9999px",
            }}
          >
            💻 SOFTWARE ENGINEERING TRACK
          </span>
        </div>

        <div
          style={{
            borderRadius: "1.25rem",
            padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)",
            textAlign: "center",
            background: "linear-gradient(180deg, #121927 0%, #0d121c 100%)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            marginBottom: "3rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.85rem, 5.5vw, 3.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.18,
              margin: "0 auto 1.25rem",
              maxWidth: "850px",
            }}
          >
            Full-Stack Web Development & Creative Engineering
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "clamp(0.88rem, 2.5vw, 1rem)",
              lineHeight: 1.65,
              maxWidth: "720px",
              margin: "0 auto 2.5rem",
            }}
          >
            Specializing in scalable client-server architectures, clean modular backends using Node and Express, and engaging browser experiences with React, TypeScript, and Three.js/WebGL simulations.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1.25rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(10, 14, 23, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#60a5fa", marginBottom: "0.85rem", fontWeight: 700 }}>
                LANGUAGES
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {["PHP", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.72rem",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "0.35rem",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "#cbd5e1",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(10, 14, 23, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#60a5fa", marginBottom: "0.85rem", fontWeight: 700 }}>
                FRONTEND & 3D
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {["React.js", "Three.js / WebGL", "Tailwind CSS", "Framer Motion", "Vite"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.72rem",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "0.35rem",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "#cbd5e1",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(10, 14, 23, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#60a5fa", marginBottom: "0.85rem", fontWeight: 700 }}>
                BACKEND & ARCHITECTURE
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {["Node.js", "Express.js", "RESTful APIs", "JSON Persistence", "Git & GitHub"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.72rem",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "0.35rem",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "#cbd5e1",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "clamp(1.25rem, 4vw, 1.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1.5rem" }}>
          Production Software Deliverables ({projects.length})
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: "rgba(14, 18, 28, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "1rem",
                padding: "clamp(1.25rem, 3.5vw, 1.75rem)",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>{p.title}</h3>
                <span style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: 600 }}>{p.status || "Live"}</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.35rem" }}>
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#60a5fa", textDecoration: "none", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                  >
                    GitHub Repository <ExternalLink size={13} />
                  </a>
                )}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#38bdf8", textDecoration: "none", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                  >
                    Live Demo <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DeveloperPage;