import React, { useState } from "react";
import type { Project } from "../types/index";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

interface SubscriberItem {
  id: string;
  email: string;
  tier: "Standard" | "Pro Lead" | "Recruiter";
  subscribedAt: string;
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onProjectUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  onProjectUpdated,
}) => {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "overview" | "messages" | "subscriptions">("projects");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([
    { id: "sub-1", email: "talent-lead@google.com", tier: "Recruiter", subscribedAt: "2026-10-18T10:14:00Z" },
    { id: "sub-2", email: "contact@techflow.ai", tier: "Pro Lead", subscribedAt: "2026-10-19T14:32:00Z" },
    { id: "sub-3", email: "dev-partner@startup.io", tier: "Standard", subscribedAt: "2026-10-20T08:20:00Z" },
  ]);

  // Project Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"developer" | "analyst">("developer");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  if (!isOpen) return null;

  // Dark Neumorphic Styling Tokens
  const neuCard: React.CSSProperties = {
    background: "#121520",
    boxShadow: "7px 7px 16px #090a10, -7px -7px 16px #1b2030",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.03)",
  };

  const neuInset: React.CSSProperties = {
    background: "#0e1019",
    boxShadow: "inset 4px 4px 8px #08090e, inset -4px -4px 8px #161a26",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.02)",
    color: "#f1f5f9",
    outline: "none",
  };

  const neuBtn: React.CSSProperties = {
    background: "#121520",
    boxShadow: "4px 4px 10px #090a10, -4px -4px 10px #1b2030",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#cbd5e1",
    cursor: "pointer",
    transition: "all 0.18s ease",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const fetchMessages = async (key: string = adminKey) => {
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      setError("Please enter the admin key.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/verify", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
      });

      const data = await res.json();
      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Invalid admin key");
      }

      setIsAuthenticated(true);
      fetchMessages(adminKey);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      // Use FormData to upload raw picture file
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("githubUrl", githubUrl);
      formData.append("liveUrl", liveUrl);

      if (selectedFile) {
        formData.append("imageFile", selectedFile);
      }

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "x-admin-key": adminKey,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to create project");
      }

      // Reset Form State
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl("");
      setGithubUrl("");
      setLiveUrl("");
      setSuccessMsg(`Project published with photo to ${category === "developer" ? "Developer" : "Data Analyst"} track!`);

      onProjectUpdated();
    } catch (err: any) {
      setError(err.message || "Something went wrong while publishing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (response.ok) onProjectUpdated();
    } catch (err: any) {
      alert("Could not delete project");
    }
  };

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 7, 12, 0.85)",
        backdropFilter: "blur(14px)",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          ...neuCard,
          width: "100%",
          maxWidth: "880px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: "1.25rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 10px #38bdf8",
              }}
            />
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", letterSpacing: "0.5px" }}>
              CONTROL CENTER // NEU-OS
            </h2>
          </div>

          <button
            onClick={() => {
              setError("");
              setSuccessMsg("");
              onClose();
            }}
            style={{
              ...neuBtn,
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
            }}
          >
            ✕
          </button>
        </div>

        {error && (
          <div
            style={{
              margin: "1rem 2rem 0",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid #ef4444",
              color: "#fca5a5",
              fontSize: "0.85rem",
            }}
          >
            {error}
          </div>
        )}

        {successMsg && (
          <div
            style={{
              margin: "1rem 2rem 0",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid #10b981",
              color: "#6ee7b7",
              fontSize: "0.85rem",
            }}
          >
            ✓ {successMsg}
          </div>
        )}

        {!isAuthenticated ? (
          <div style={{ padding: "3rem 2rem", display: "flex", justifyContent: "center" }}>
            <form
              onSubmit={handleLogin}
              style={{
                ...neuCard,
                padding: "2.5rem",
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#f8fafc" }}>Admin Authentication</h3>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                  Unlock portfolio management console
                </p>
              </div>

              <input
                type="password"
                placeholder="Enter secret key..."
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                style={{
                  ...neuInset,
                  padding: "12px 16px",
                  fontSize: "0.95rem",
                }}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...neuBtn,
                  padding: "12px",
                  fontWeight: 700,
                  color: "#38bdf8",
                  background: "#141724",
                }}
              >
                {loading ? "Verifying..." : "Access Console"}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: "flex", flex: 1, minHeight: "520px", overflow: "hidden" }}>
            {/* Sidebar */}
            <div
              style={{
                width: "190px",
                padding: "1.5rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                borderRight: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              {[
                { id: "projects", label: "Projects", count: projects.length },
                { id: "overview", label: "Overview", count: null },
                { id: "messages", label: "Inbox", count: messages.length },
                { id: "subscriptions", label: "Subscribers", count: subscribers.length },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setError("");
                      setSuccessMsg("");
                      if (tab.id === "messages") fetchMessages();
                    }}
                    style={{
                      ...(isActive ? neuInset : neuBtn),
                      padding: "12px 14px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: isActive ? "#38bdf8" : "#94a3b8",
                      border: "none",
                    }}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          background: isActive ? "#38bdf8" : "#1e2436",
                          color: isActive ? "#04050a" : "#cbd5e1",
                          fontWeight: 700,
                        }}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
              {activeTab === "projects" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <form
                    onSubmit={handleCreateProject}
                    style={{
                      ...neuCard,
                      padding: "1.75rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.1rem",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: "1rem", color: "#f8fafc" }}>
                      Deploy Project to Track
                    </h3>

                    <input
                      type="text"
                      placeholder="Project Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      style={{ ...neuInset, padding: "10px 14px", fontSize: "0.9rem" }}
                    />

                    <textarea
                      placeholder="Summary of technical problem solved, architecture used, or data cleaned..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={3}
                      style={{ ...neuInset, padding: "10px 14px", fontSize: "0.9rem", resize: "vertical" }}
                    />

                    {/* Direct Image File Picker (Camera & Gallery Support) */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                        Project Photo (Pick from Phone Gallery or PC Storage):
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                          ...neuInset,
                          padding: "8px 12px",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                        }}
                      />
                    </div>

                    {/* Live Thumbnail Preview */}
                    {previewUrl && (
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.03)" }}>
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}
                        />
                        <div style={{ fontSize: "0.82rem", color: "#38bdf8" }}>
                          ✓ Photo ready to upload
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "1.5rem", padding: "4px 8px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="category"
                          value="developer"
                          checked={category === "developer"}
                          onChange={() => setCategory("developer")}
                        />
                        Developer Track (/developer)
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="category"
                          value="analyst"
                          checked={category === "analyst"}
                          onChange={() => setCategory("analyst")}
                        />
                        Data Analyst Track (/analyst)
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <input
                        type="url"
                        placeholder="GitHub Link (optional)"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        style={{ ...neuInset, padding: "10px 14px", fontSize: "0.9rem" }}
                      />
                      <input
                        type="url"
                        placeholder="Live Demo Link (optional)"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        style={{ ...neuInset, padding: "10px 14px", fontSize: "0.9rem" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        ...neuBtn,
                        padding: "12px",
                        fontWeight: 700,
                        color: category === "developer" ? "#38bdf8" : "#2dd4bf",
                        marginTop: "0.5rem",
                      }}
                    >
                      {loading ? "Uploading & Publishing..." : `+ Push to ${category === "developer" ? "Developer" : "Data Analyst"} Track`}
                    </button>
                  </form>

                  {/* Active List */}
                  <div>
                    <h3 style={{ margin: "0 0 1rem 0", fontSize: "0.95rem", color: "#94a3b8" }}>
                      Published Deliverables ({projects.length})
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {projects.map((p) => (
                        <div
                          key={p.id}
                          style={{
                            ...neuCard,
                            padding: "0.9rem 1.25rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt={p.title}
                                style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover" }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  borderRadius: "8px",
                                  background: "#1e2436",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "1.1rem",
                                }}
                              >
                                {p.category === "developer" ? "💻" : "📊"}
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: "0.95rem" }}>{p.title}</div>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  color: p.category === "developer" ? "#38bdf8" : "#2dd4bf",
                                }}
                              >
                                {p.category} track
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            style={{
                              ...neuBtn,
                              padding: "6px 14px",
                              color: "#f87171",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "overview" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ ...neuCard, padding: "1.5rem" }}>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>DEVELOPER TRACK</div>
                      <div style={{ fontSize: "2rem", fontWeight: 800, color: "#38bdf8" }}>
                        {projects.filter((p) => p.category === "developer").length}
                      </div>
                    </div>
                    <div style={{ ...neuCard, padding: "1.5rem" }}>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>DATA ANALYST TRACK</div>
                      <div style={{ fontSize: "2rem", fontWeight: 800, color: "#2dd4bf" }}>
                        {projects.filter((p) => p.category === "analyst").length}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "messages" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0, fontSize: "1rem", color: "#f8fafc" }}>Client & Recruiter Inquiries</h3>
                    <button onClick={() => fetchMessages()} style={{ ...neuBtn, padding: "6px 12px", fontSize: "0.78rem" }}>
                      ↻ Sync Inbox
                    </button>
                  </div>
                  {messages.length === 0 ? (
                    <div style={{ ...neuCard, padding: "2.5rem", textAlign: "center", color: "#64748b" }}>
                      No messages received yet.
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div key={m.id} style={{ ...neuCard, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ fontWeight: 700, color: "#f8fafc" }}>{m.name}</div>
                            <a href={`mailto:${m.email}`} style={{ color: "#38bdf8", fontSize: "0.82rem", textDecoration: "none" }}>
                              {m.email}
                            </a>
                          </div>
                          <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                            {new Date(m.receivedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div style={{ ...neuInset, padding: "10px 14px", fontSize: "0.88rem", color: "#cbd5e1", whiteSpace: "pre-wrap" }}>
                          {m.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "subscriptions" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1rem", color: "#f8fafc" }}>Lead Roster & Subscriptions</h3>
                  {subscribers.map((sub) => (
                    <div key={sub.id} style={{ ...neuCard, padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700, background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
                          {sub.tier}
                        </span>
                        <span style={{ color: "#f8fafc", fontWeight: 600, fontSize: "0.9rem" }}>{sub.email}</span>
                      </div>
                      <button onClick={() => handleDeleteSubscriber(sub.id)} style={{ ...neuBtn, padding: "4px 10px", color: "#f87171", fontSize: "0.75rem" }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};