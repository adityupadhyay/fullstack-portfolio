import React from "react";
import { motion } from "framer-motion";
import type { Project, Mode } from "../types/index";

interface ProjectsProps {
  projects: Project[];
  currentMode: Mode;
  loading: boolean;
  onSelectMode: (mode: Mode) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  currentMode,
  loading,
  onSelectMode,
}) => {
  const isDev = currentMode === "developer";
  const filteredProjects = projects.filter((p) => p.category === currentMode);

  return (
    <section
      id="projects"
      style={{
        maxWidth: "1150px",
        margin: "0 auto",
        padding: "4rem 2rem 6rem 2rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2.4rem", color: "#ffffff", margin: "0 0 0.5rem 0", fontWeight: 800 }}>
          {currentMode === null
            ? "Selected Portfolio Works"
            : isDev
            ? "Developer & Software Projects"
            : "Data Analytics & AI Deliverables"}
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", margin: 0 }}>
          {currentMode === null
            ? "Select a track to inspect engineering builds or analytical case studies"
            : isDev
            ? "Displaying web architectures, full-stack applications, and interactive platforms"
            : "Displaying exploratory data pipelines, machine learning benchmarks, and reports"}
        </p>
      </div>

      {currentMode === null ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            onClick={() => onSelectMode("developer")}
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "16px",
              padding: "2.5rem 2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💻</div>
            <h3 style={{ color: "#38bdf8", margin: "0 0 0.5rem 0", fontSize: "1.3rem" }}>
              Explore Developer Track
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              View full-stack web applications, PHP/Node services, and interactive 3D demos.
            </p>
          </div>

          <div
            onClick={() => onSelectMode("analyst")}
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(45, 212, 191, 0.3)",
              borderRadius: "16px",
              padding: "2.5rem 2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📊</div>
            <h3 style={{ color: "#2dd4bf", margin: "0 0 0.5rem 0", fontSize: "1.3rem" }}>
              Explore Data Analyst Track
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Inspect data cleaning models, Python analytics notebooks, and AI evaluations.
            </p>
          </div>
        </div>
      ) : loading ? (
        <div style={{ textAlign: "center", color: "#64748b", padding: "3rem" }}>
          Loading deliverables...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3.5rem 2rem",
            background: "rgba(15, 23, 42, 0.5)",
            borderRadius: "16px",
            border: "1px dashed rgba(255, 255, 255, 0.15)",
            color: "#94a3b8",
          }}
        >
          <p style={{ margin: 0, fontSize: "1.05rem" }}>
            No projects published for the <strong>{isDev ? "Developer" : "Data Analyst"}</strong> track yet.
          </p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            Use the admin portal via the footer to upload your first project.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: isDev ? "#38bdf8" : "#2dd4bf",
                  }}
                >
                  {project.category}
                </span>
                <h3 style={{ margin: "4px 0 0 0", color: "#f8fafc", fontSize: "1.2rem" }}>
                  {project.title}
                </h3>
              </div>

              <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.6 }}>
                {project.description}
              </p>

              <div style={{ display: "flex", gap: "1rem", marginTop: "auto", paddingTop: "0.5rem" }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#38bdf8", fontSize: "0.85rem", textDecoration: "none" }}
                  >
                    GitHub →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#2dd4bf", fontSize: "0.85rem", textDecoration: "none" }}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};