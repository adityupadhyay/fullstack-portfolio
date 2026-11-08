import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface AnalystProject {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
}

export const AnalystPage: React.FC = () => {
  const [projects, setProjects] = useState<AnalystProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiBase = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";
        const res = await fetch(`${apiBase}/projects`);
        const data = await res.json();
        if (res.ok && data.status === "success" && data.data.length > 0) {
          const filtered = data.data.filter((p: any) => p.category === "analyst");
          if (filtered.length > 0) {
            setProjects(filtered);
            return;
          }
        }
      } catch {
        // Fallback
      }

      setProjects([
        {
          id: "analyst_01",
          title: "POLICYGUARD AI",
          description:
            "An automated guardrail platform engineered for zero-trust cloud security policy analysis and continuous compliance. Features autonomous rule evaluation, automated risk scoring, and zero-day threat monitoring.",
          tags: ["FASTAPI", "REACT.JS", "DOCKER", "AWS"],
          githubUrl: "#",
          liveUrl: "#",
          status: "Live Production",
        },
        {
          id: "analyst_02",
          title: "NEURALSTREAM PIPELINE",
          description:
            "High-throughput asynchronous event-driven streaming pipeline for real-time model inference, anomaly detection, and distributed token batching with Kafka broker orchestration.",
          tags: ["PYTHON", "KAFKA", "TENSORFLOW", "FASTAPI"],
          githubUrl: "#",
          liveUrl: "#",
          status: "Operational",
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
          <Link
            to="/developer"
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "9999px",
              color: "#9ca3af",
              fontSize: "0.75rem",
              textDecoration: "none",
            }}
          >
            💻 Dev
          </Link>
          <span
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "9999px",
              backgroundColor: "#2a2d39",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            📊 Analyst
          </span>
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
              color: "#2dd4bf",
              backgroundColor: "rgba(13, 148, 136, 0.15)",
              border: "1px solid rgba(45, 212, 191, 0.3)",
              padding: "0.4rem 0.85rem",
              borderRadius: "9999px",
            }}
          >
            📊 DATA ANALYTICS & AI TRACK
          </span>
        </div>

        <div
          style={{
            borderRadius: "1.25rem",
            padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)",
            textAlign: "center",
            background: "linear-gradient(180deg, #102422 0%, #0a1715 100%)",
            border: "1px solid rgba(45, 212, 191, 0.25)",
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
            AI Data Analytics & Empirical Intelligence
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
            Converting raw, ambiguous information into verified decisions. Experienced in terminal AI agent evaluation, structured data pipelines, and quantitative exploratory modeling.
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
                backgroundColor: "rgba(8, 18, 17, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "0.95rem", color: "#2dd4bf", marginBottom: "0.5rem", fontWeight: 700 }}>
                Python Data Wrangling
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                Preprocessing, cleaning noisy datasets, and missing-value imputation using Pandas and NumPy.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "rgba(8, 18, 17, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "0.95rem", color: "#2dd4bf", marginBottom: "0.5rem", fontWeight: 700 }}>
                SQL & Query Optimization
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                Extracting business metrics with relational joins, groupings, and exploratory data analysis (EDA).
              </p>
            </div>

            <div
              style={{
                backgroundColor: "rgba(8, 18, 17, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "0.95rem", color: "#2dd4bf", marginBottom: "0.5rem", fontWeight: 700 }}>
                AI Model Evaluation
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                Hands-on benchmarking of terminal-based AI agents, testing context retention, and reasoning accuracy.
              </p>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "clamp(1.25rem, 4vw, 1.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1.5rem" }}>
          Analytical Case Studies & Pipelines ({projects.length})
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: "rgba(10, 20, 19, 0.7)",
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
                <span style={{ fontSize: "0.72rem", color: "#2dd4bf", fontWeight: 600 }}>{p.status || "Live"}</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.35rem" }}>
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#2dd4bf", textDecoration: "none", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                  >
                    View Repository <ExternalLink size={13} />
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

export default AnalystPage;