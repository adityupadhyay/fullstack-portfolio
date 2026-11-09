import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { DeveloperPage } from "./pages/DeveloperPage";
import { AnalystPage } from "./pages/AnalystPage";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Send,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Menu,
  Edit3,
  RotateCcw,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Direct fallback to live Render backend when deployed on Vercel
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://fullstack-portfolio-2gkn.onrender.com/api");

interface Project {
  id: string;
  title: string;
  description: string;
  category: "developer" | "analyst";
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
  metrics?: {
    function?: string;
    metricLabel?: string;
    metricValue?: string;
    status?: string;
  };
}

interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

const FEATURED_HOMEPAGE_PROJECTS: Project[] = [
  {
    id: "feat_01",
    title: "POLICYGUARD AI",
    description:
      "An automated guardrail platform engineered for zero-trust cloud security policy analysis and continuous compliance. Features autonomous rule evaluation, automated risk scoring, and zero-day threat monitoring.",
    category: "analyst",
    tags: ["FASTAPI", "REACT.JS", "DOCKER", "AWS"],
    githubUrl:"https://bespoke-shortbread-966af6.netlify.app/" ,
    liveUrl: "#",
    metrics: {
      function: "AI Policy Copilot",
      metricLabel: "LATENCY:",
      metricValue: "< 120ms",
      status: "Live Production",
    },
  },
  {
    id: "feat_02",
    title: "SOFTWARE RELEASE RISK HEATMAP",
    description:
      "Full-stack production release risk management platform utilizing machine learning to analyze past commits, test coverage, and infrastructure logs to compute release failure probabilities.",
    category: "developer",
    tags: ["NEXT.JS", "PYTHON", "REDIS", "KUBERNETES"],
    githubUrl: "https://bespoke-shortbread-966af6.netlify.app/",
    liveUrl: "#",
    metrics: {
      function: "CI/CD Predictive Risk",
      metricLabel: "ACCURACY:",
      metricValue: "94.8%",
      status: "Verified",
    },
  },
  {
    id: "feat_03",
    title: "PAYMENT GATEWAY WITH HOSTED CHECKOUT",
    description:
      "End-to-end payment gateway infrastructure supporting merchant order processing, multi-currency conversion, cryptographic webhook verification, and zero double-charging transactions.",
    category: "developer",
    tags: ["SPRING BOOT", "POSTGRESQL", "KAFKA", "REDIS"],
    githubUrl: "https://bespoke-shortbread-966af6.netlify.app/",
    liveUrl: "#",
    metrics: {
      function: "Real-Time Ledger",
      metricLabel: "UPTIME:",
      metricValue: "99.99%",
      status: "PCI-DSS Compliant",
    },
  },
];

function HomePage() {
  const [adminProjects, setAdminProjects] = useState<Project[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState<"projects" | "messages">("projects");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState<"developer" | "analyst">("developer");
  const [newGithub, setNewGithub] = useState("");
  const [newLive, setNewLive] = useState("");
  const [newTags, setNewTags] = useState("");
  const [metricFunction, setMetricFunction] = useState("");
  const [metricLabel, setMetricLabel] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [metricStatus, setMetricStatus] = useState("Live Production");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const heroCardRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const fetchAdminProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setAdminProjects(data.data);
      }
    } catch {
      // Offline fallback
    }
  };

  useEffect(() => {
    fetchAdminProjects();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const cursorGlow = cursorGlowRef.current;
    const onMouseMove = (e: MouseEvent) => {
      if (cursorGlow) {
        gsap.to(cursorGlow, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const heroCard = heroCardRef.current;
    const handleCardMove = (e: MouseEvent) => {
      if (!heroCard) return;
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      heroCard.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleCardLeave = () => {
      if (!heroCard) return;
      heroCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };

    if (heroCard) {
      heroCard.addEventListener("mousemove", handleCardMove);
      heroCard.addEventListener("mouseleave", handleCardLeave);
    }

    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: "#about",
        start: "top 75%",
        once: true,
        onEnter: () => {
          document.querySelectorAll(".counter").forEach((counter: any) => {
            const target = +counter.getAttribute("data-target");
            gsap.to(counter, {
              innerText: target,
              duration: 2,
              snap: { innerText: 1 },
              ease: "power2.out",
            });
          });

          document.querySelectorAll(".counter-float").forEach((counter: any) => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const obj = { val: 0.0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                counter.innerText = obj.val.toFixed(2);
              },
            });
          });
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card, index) => {
        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 55%",
              end: "top 18%",
              scrub: true,
            },
          });
        }
      });

      gsap.utils.toArray<HTMLElement>(".reveal, .tech-box, .timeline-item").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      ScrollTrigger.refresh();
    }, mainRef);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (heroCard) {
        heroCard.removeEventListener("mousemove", handleCardMove);
        heroCard.removeEventListener("mouseleave", handleCardLeave);
      }
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const fetchMessages = async (key: string = adminKey) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setMessages(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    try {
      const res = await fetch(`${API_BASE}/admin/verify`, {
        method: "POST",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Invalid master key");
      }
      setIsAuthenticated(true);
      fetchMessages(adminKey);
      fetchAdminProjects();
    } catch (err: any) {
      setAdminError(err.message || "Failed to authenticate.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setNewTitle("");
    setNewDesc("");
    setNewCategory("developer");
    setNewGithub("");
    setNewLive("");
    setNewTags("");
    setMetricFunction("");
    setMetricLabel("");
    setMetricValue("");
    setMetricStatus("Live Production");
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const startEditingProject = (p: Project) => {
    setEditingProjectId(p.id);
    setNewTitle(p.title || "");
    setNewDesc(p.description || "");
    setNewCategory(p.category || "developer");
    setNewGithub(p.githubUrl || "");
    setNewLive(p.liveUrl || "");
    setNewTags(p.tags ? p.tags.join(", ") : "");
    setMetricFunction(p.metrics?.function || "");
    setMetricLabel(p.metrics?.metricLabel || "");
    setMetricValue(p.metrics?.metricValue || "");
    setMetricStatus(p.metrics?.status || "Live Production");
    setPreviewUrl(p.imageUrl || "");
    setSelectedFile(null);
    setAdminSuccess("");
    setAdminError("");
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setAdminError("");
    setAdminSuccess("");

    try {
      const parsedTags = newTags
        .split(",")
        .map((t) => t.trim().toUpperCase())
        .filter(Boolean);

      const metricsObj = {
        function: metricFunction || "System Module",
        metricLabel: metricLabel || "LATENCY:",
        metricValue: metricValue || "< 120ms",
        status: metricStatus || "Live Production",
      };

      if (editingProjectId) {
        const payload = {
          title: newTitle,
          description: newDesc,
          category: newCategory,
          githubUrl: newGithub,
          liveUrl: newLive,
          tags: parsedTags,
          metrics: metricsObj,
        };

        const res = await fetch(`${API_BASE}/projects/${editingProjectId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify(payload),
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Server returned status ${res.status}. Check backend logs.`);
        }

        const data = await res.json();
        if (!res.ok || data.status !== "success") {
          throw new Error(data.message || "Failed to update project");
        }

        setAdminSuccess(`Project "${newTitle}" updated successfully!`);
        resetProjectForm();
        fetchAdminProjects();
      } else {
        const formData = new FormData();
        formData.append("title", newTitle);
        formData.append("description", newDesc);
        formData.append("category", newCategory);
        formData.append("githubUrl", newGithub);
        formData.append("liveUrl", newLive);
        formData.append("tags", JSON.stringify(parsedTags));
        formData.append("metrics", JSON.stringify(metricsObj));

        if (selectedFile) {
          formData.append("imageFile", selectedFile);
        }

        const res = await fetch(`${API_BASE}/projects`, {
          method: "POST",
          headers: { "x-admin-key": adminKey },
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || data.status !== "success") {
          throw new Error(data.message || "Failed to deploy project");
        }

        setAdminSuccess("Project deployed successfully!");
        resetProjectForm();
        fetchAdminProjects();
      }
    } catch (err: any) {
      setAdminError(err.message || "Error saving project to server");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (editingProjectId === id) resetProjectForm();
      fetchAdminProjects();
    } catch {
      alert("Error deleting project");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Purge this transmission from records?")) return;
    try {
      await fetch(`${API_BASE}/contact/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });

      setMessages((prev) => prev.filter((m) => m.id !== id));
      setAdminSuccess("Transmission record deleted.");
      setTimeout(() => setAdminSuccess(""), 3000);
    } catch {
      setAdminError("Failed to delete transmission record.");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("submitting");
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });
      if (res.ok) {
        setContactStatus("sent");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        setTimeout(() => setContactStatus("idle"), 4000);
      } else {
        alert("Transmission failed. Please check your backend.");
        setContactStatus("idle");
      }
    } catch {
      alert("Backend offline or waking up. Please try again in 30 seconds.");
      setContactStatus("idle");
    }
  };

  return (
    <div
      ref={mainRef}
      style={{
        backgroundColor: "#08090b",
        color: "#d1d5db",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div
        ref={cursorGlowRef}
        id="cursor-glow"
        style={{
          position: "fixed",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          filter: "blur(120px)",
          zIndex: 0,
          transition: "opacity 0.5s",
        }}
      />

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1rem 1.25rem",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a
            href="#"
            className="font-display"
            style={{
              letterSpacing: "0.1em",
              fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: "0.65rem", height: "0.65rem", borderRadius: "50%", backgroundColor: "#d4af37", display: "inline-block" }} />
            ADITYA UPADHYAY.
          </a>

          <nav
            className="font-mono hidden md:flex"
            style={{
              alignItems: "center",
              gap: "2rem",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              color: "#9ca3af",
            }}
          >
            <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>01 // ABOUT</a>
            <a href="#projects" style={{ color: "inherit", textDecoration: "none" }}>02 // PROJECTS</a>
            <a href="#skills" style={{ color: "inherit", textDecoration: "none" }}>03 // SKILLS</a>
            <a href="#experience" style={{ color: "inherit", textDecoration: "none" }}>04 // EXPERIENCE</a>
          </nav>

          <a
            href="#contact"
            className="font-mono hidden md:inline-flex"
            style={{
              padding: "0.5rem 1.25rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#000000",
              background: "linear-gradient(to right, #eab308, #d4af37)",
              borderRadius: "0.25rem",
              textDecoration: "none",
              boxShadow: "0 10px 15px -3px rgba(212, 175, 55, 0.2)",
            }}
          >
            LET'S TALK
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded text-yellow-400 bg-white/5 border border-white/10 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden flex flex-col gap-4 pt-4 pb-2 px-2 mt-3 border-t border-white/10"
            style={{ backgroundColor: "rgba(10, 12, 16, 0.98)", backdropFilter: "blur(16px)" }}
          >
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-sm text-gray-300 hover:text-yellow-400 tracking-wider py-1"
            >
              01 // ABOUT
            </a>
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-sm text-gray-300 hover:text-yellow-400 tracking-wider py-1"
            >
              02 // PROJECTS
            </a>
            <a
              href="#skills"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-sm text-gray-300 hover:text-yellow-400 tracking-wider py-1"
            >
              03 // SKILLS
            </a>
            <a
              href="#experience"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-sm text-gray-300 hover:text-yellow-400 tracking-wider py-1"
            >
              04 // EXPERIENCE
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-400 to-yellow-500 py-2.5 px-4 rounded text-center mt-2 shadow-lg shadow-yellow-500/20"
            >
              LET'S TALK →
            </a>
          </div>
        )}
      </header>

      {/* ── SECTION 00: HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "7rem",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "3rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <div
                className="hero-anim font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.25rem",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  backgroundColor: "rgba(212, 175, 55, 0.05)",
                  color: "#eab308",
                  fontSize: "0.75rem",
                }}
              >
                <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", backgroundColor: "#eab308" }} />
                AVAILABLE FOR HIGH-IMPACT ROLES
              </div>
            </div>

            <h1
              className="hero-anim font-display text-metallic-gold"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 6rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.025em",
                lineHeight: 0.95,
                fontWeight: 700,
                margin: 0,
              }}
            >
              I BUILD <br />DIGITAL <br />EXPERIENCES
            </h1>

            <div
              className="hero-anim font-mono"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.75rem", color: "#9ca3af" }}
            >
              <span style={{ border: "1px solid rgba(255, 255, 255, 0.1)", padding: "0.375rem 0.75rem", borderRadius: "0.125rem", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                FULL STACK DEVELOPER
              </span>
              <span style={{ border: "1px solid rgba(255, 255, 255, 0.1)", padding: "0.375rem 0.75rem", borderRadius: "0.125rem", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                UI/UX DESIGNER
              </span>
              <span style={{ border: "1px solid rgba(255, 255, 255, 0.1)", padding: "0.375rem 0.75rem", borderRadius: "0.125rem", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                DATA SCIENCE
              </span>
            </div>

            <p className="hero-anim" style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "36rem", margin: 0 }}>
              I turn bold ideas into seamless digital experiences, where frontend meets powerful backend, and code transforms into real-world impact.
            </p>

            <div className="hero-anim" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", paddingTop: "1rem" }}>
              <a
                href="#projects"
                className="font-mono"
                style={{
                  padding: "0.75rem 1.75rem",
                  backgroundColor: "#eab308",
                  background: "linear-gradient(to right, #eab308, #b8860b)",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderRadius: "0.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  boxShadow: "0 10px 15px -3px rgba(212, 175, 55, 0.25)",
                }}
              >
                EXPLORE MY WORK <ArrowRight size={16} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="font-mono"
                style={{
                  padding: "0.75rem 1.75rem",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderRadius: "0.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                }}
              >
                DOWNLOAD RESUME <Download size={16} />
              </a>
            </div>
          </div>

          <div className="hero-anim" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div
              ref={heroCardRef}
              id="hero-card"
              className="gold-glow"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "24rem",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                backgroundColor: "#121418",
                padding: "0.75rem",
                cursor: "pointer",
                transition: "transform 0.3s ease-out",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "460px",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))",
                }}
              >
                <img
                  src="/profile.png"
                  alt="Portrait"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "grayscale(100%) contrast(1.25)",
                    transition: "transform 0.7s",
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000, rgba(0,0,0,0.4), transparent)" }} />
                <div style={{ position: "relative", zIndex: 10, textAlign: "center", paddingBottom: "1.5rem" }}>
                  <p className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    CODE IS MY CRAFT. IMPACT IS MY GOAL.
                  </p>
                  <p className="font-display" style={{ fontSize: "1.5rem", color: "#ffffff", letterSpacing: "0.05em", marginTop: "0.25rem", margin: 0 }}>
                    Aditya Upadhyay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 01: ABOUT ME ── */}
      <section id="about" style={{ padding: "6rem 1.5rem", maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid rgba(255, 255, 255, 0.05)", position: "relative", zIndex: 10 }}>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          <span className="font-mono" style={{ color: "#eab308", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            01 // ABOUT ME
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", textTransform: "uppercase", letterSpacing: "-0.025em", color: "#ffffff", margin: 0 }}>
            I DON'T JUST WRITE CODE. <br />
            <span className="text-metallic-gold">I BUILD WHAT'S NEXT.</span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", maxWidth: "48rem", lineHeight: 1.625, margin: 0 }}>
            Passionate Full Stack Developer and AI Enthusiast pursuing Computer Applications. With a strong algorithmic foundation and a focus on clean engineering, I transform complex architectural requirements into elegant, high-performance web products.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
            <p className="font-display text-metallic-gold" style={{ fontSize: "3rem", margin: 0 }}>
              <span className="counter" data-target="1200">0</span>+
            </p>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem", margin: 0 }}>
              DSA QUESTIONS SOLVED
            </p>
          </div>

          <div style={{ padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
            <p className="font-display text-metallic-gold" style={{ fontSize: "3rem", margin: 0 }}>
              <span className="counter-float" data-target="9.07">0.00</span>
            </p>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem", margin: 0 }}>
              ACADEMIC CGPA
            </p>
          </div>

          <div style={{ padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
            <p className="font-display text-metallic-gold" style={{ fontSize: "3rem", margin: 0 }}>
              <span className="counter" data-target="40">0</span>+
            </p>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem", margin: 0 }}>
              PRODUCTION REPOSITORIES
            </p>
          </div>

          <div style={{ padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
            <p className="font-display text-metallic-gold" style={{ fontSize: "3rem", margin: 0 }}>
              TOP <span className="counter" data-target="100">0</span>
            </p>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem", margin: 0 }}>
              NATIONAL HACKATHON
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: SELECTED WORKS ── */}
      <section
        id="projects"
        style={{
          padding: "6rem 1.5rem 12rem 1.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}>
          <span className="font-mono" style={{ color: "#eab308", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            02 // FEATURED WORK
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", textTransform: "uppercase", letterSpacing: "-0.025em", color: "#ffffff", margin: 0 }}>
            SELECTED WORKS. <span className="text-metallic-gold">ENGINEERED VALUE.</span>
          </h2>
          <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", letterSpacing: "0.05em", margin: 0 }}>
            Scroll down to unfold the system architecture cards. Each platform was built to solve complex operational challenges.
          </p>
        </div>

        <div
          id="projects-container"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "5rem",
            paddingBottom: "6rem",
          }}
        >
          {FEATURED_HOMEPAGE_PROJECTS.map((p, index) => {
            const topOffset = index === 0 ? "7rem" : index === 1 ? "8.25rem" : "9.5rem";

            return (
              <div
                key={p.id}
                className="project-card gold-glow"
                style={{
                  position: "sticky",
                  top: topOffset,
                  zIndex: index + 10,
                  transformOrigin: "top center",
                  padding: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  backgroundColor: "rgba(14, 16, 20, 0.96)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "2.5rem", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      0{index + 1} //{" "}
                      {index === 0
                        ? "AI & ZERO-TRUST SECURITY"
                        : index === 1
                        ? "DEVOPS & SYSTEM TELEMETRY"
                        : "FINTECH & DISTRIBUTED SYSTEMS"}
                    </span>
                    <h3 className="font-display" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", color: "#ffffff", letterSpacing: "0.025em", margin: 0 }}>
                      {p.title}
                    </h3>
                    <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.625, maxWidth: "42rem", margin: 0 }}>
                      {p.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingTop: "0.5rem" }}>
                      {p.tags?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono"
                          style={{
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "0.25rem",
                            color: "#fde047",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.1)", paddingLeft: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="font-mono" style={{ fontSize: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <p style={{ color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, fontSize: "0.7rem" }}>
                        // ARCHITECTURE METRICS
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.35rem 0", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                        <span style={{ color: "#9ca3af" }}>
                          {index === 1 ? "ANALYSIS:" : index === 2 ? "SETTLEMENT:" : "FUNCTION:"}
                        </span>
                        <span style={{ color: "#ffffff" }}>
                          {p.metrics?.function || (index === 1 ? "CI/CD Predictive Risk" : index === 2 ? "Real-Time Ledger" : "AI Policy Copilot")}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.35rem 0", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                        <span style={{ color: "#9ca3af" }}>
                          {p.metrics?.metricLabel || (index === 1 ? "ACCURACY:" : index === 2 ? "UPTIME:" : "LATENCY:")}
                        </span>
                        <span style={{ color: "#eab308" }}>
                          {p.metrics?.metricValue || (index === 1 ? "94.8%" : index === 2 ? "99.99%" : "< 120ms")}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.35rem 0" }}>
                        <span style={{ color: "#9ca3af" }}>
                          {index === 2 ? "SECURITY:" : "STATUS:"}
                        </span>
                        <span style={{ color: "#34d399", fontWeight: 600 }}>
                          {p.metrics?.status || (index === 1 ? "Verified" : index === 2 ? "PCI-DSS Compliant" : "Live Production")}
                        </span>
                      </div>
                    </div>

                    <div>
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.75rem",
                            padding: "0.5rem 1rem",
                            border: "1px solid rgba(212, 175, 55, 0.4)",
                            borderRadius: "0.25rem",
                            color: "#eab308",
                            textDecoration: "none",
                          }}
                        >
                          VIEW REPOSITORY <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 03: TECH MATRIX ── */}
      <section id="skills" style={{ padding: "6rem 1.5rem", maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid rgba(255, 255, 255, 0.05)", position: "relative", zIndex: 10 }}>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          <span className="font-mono" style={{ color: "#eab308", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            03 // TECH MATRIX
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", textTransform: "uppercase", letterSpacing: "-0.025em", color: "#ffffff", margin: 0 }}>
            ARCHITECTURAL MASTERY. <span className="text-metallic-gold">PRECISION APPLIED.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "1.5rem" }}>
          <div className="tech-box" style={{ padding: "1.75rem", borderRadius: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "#0e1014", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308" }}>CORE PILLAR // 100% RESPONSIVE</span>
              <h4 className="font-display" style={{ fontSize: "1.5rem", color: "#ffffff", letterSpacing: "0.025em", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                FRONTEND ARCHITECTURE
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                Specialized in building high-performance client applications, custom component libraries, and immersive desktop/mobile interfaces.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {["React.js", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion"].map((tech) => (
                  <span key={tech} className="font-mono" style={{ fontSize: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "0.375rem 0.75rem", borderRadius: "0.25rem", backgroundColor: "rgba(255, 255, 255, 0.02)", color: "#d1d5db" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/developer"
              className="font-mono"
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "linear-gradient(to right, #eab308, #d4af37)",
                color: "#000000",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(212, 175, 55, 0.2)",
              }}
            >
              EXPLORE FULL STACK TRACK →
            </Link>
          </div>

          <div className="tech-box" style={{ padding: "1.75rem", borderRadius: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "#0e1014", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308" }}>HIGH CONCURRENCY // LOW LATENCY</span>
              <h4 className="font-display" style={{ fontSize: "1.5rem", color: "#ffffff", letterSpacing: "0.025em", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                DISTRIBUTED BACKEND
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                Engineered RESTful APIs, JWT role-based access control, caching layers, and multi-tenant cloud microservices.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {["Node.js", "Python", "Docker", "Redis", "PostgreSQL"].map((tech) => (
                  <span key={tech} className="font-mono" style={{ fontSize: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "0.375rem 0.75rem", borderRadius: "0.25rem", backgroundColor: "rgba(255, 255, 255, 0.02)", color: "#d1d5db" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/analyst"
              className="font-mono"
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "linear-gradient(to right, #eab308, #d4af37)",
                color: "#000000",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(212, 175, 55, 0.2)",
              }}
            >
              EXPLORE DATA ANALYST TRACK →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: EXPERIENCE & MILESTONES ── */}
      <section id="experience" style={{ padding: "6rem 1.5rem", maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid rgba(255, 255, 255, 0.05)", position: "relative", zIndex: 10 }}>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}>
          <span className="font-mono" style={{ color: "#eab308", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            04 // EXPERIENCE
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", textTransform: "uppercase", letterSpacing: "-0.025em", color: "#ffffff", margin: 0 }}>
            EXPERIENCE & <span className="text-metallic-gold">MILESTONES.</span>
          </h2>
        </div>

        <div style={{ position: "relative", borderLeft: "2px solid rgba(212, 175, 55, 0.3)", marginLeft: "2rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="timeline-item" style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: "-9px", top: "0.375rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#eab308", boxShadow: "0 0 15px #D4AF37" }} />
            <span className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308", letterSpacing: "0.05em" }}>2026 — PRESENT</span>
            <h4 className="font-display" style={{ fontSize: "1.5rem", color: "#ffffff", marginTop: "0.25rem", margin: 0 }}>
              FULL STACK & AI DATA ANALYTICS INTERN
            </h4>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>
              InAmigos Foundation & Handshake AI
            </p>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.5rem", maxWidth: "36rem", lineHeight: 1.5, margin: 0 }}>
              Architected data evaluation systems and machine learning terminal-based tools. Evaluated terminal AI outputs and streamlined real-time response validation.
            </p>
          </div>

          <div className="timeline-item" style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: "-9px", top: "0.375rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#eab308", boxShadow: "0 0 15px #D4AF37" }} />
            <span className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308", letterSpacing: "0.05em" }}>2025 — 2026</span>
            <h4 className="font-display" style={{ fontSize: "1.5rem", color: "#ffffff", marginTop: "0.25rem", margin: 0 }}>
              INTERNSHALA STUDENT PARTNER & STEM INNOVATION
            </h4>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>
              Stemrobo & ElevanceSkills
            </p>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.5rem", maxWidth: "36rem", lineHeight: 1.5, margin: 0 }}>
              Completed industrial web development tracks, led peer cohorts in hands-on generative AI integration, and delivered full-stack architectures.
            </p>
          </div>

          <div className="timeline-item" style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: "-9px", top: "0.375rem", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "#eab308", boxShadow: "0 0 15px #D4AF37" }} />
            <span className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308", letterSpacing: "0.05em" }}>2024 — PRESENT</span>
            <h4 className="font-display" style={{ fontSize: "1.5rem", color: "#ffffff", marginTop: "0.25rem", margin: 0 }}>
              BACHELOR OF COMPUTER APPLICATIONS
            </h4>
            <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>
              Dr. Bhimrao Ambedkar University
            </p>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.5rem", maxWidth: "36rem", lineHeight: 1.5, margin: 0 }}>
              Specializing in Object-Oriented Software Design, Data Structures, Modern Web Architecture, and Distributed Database Management.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: TRANSMISSION ── */}
      <section id="contact" style={{ padding: "6rem 1.5rem", maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid rgba(255, 255, 255, 0.05)", position: "relative", zIndex: 10 }}>
        <div className="reveal" style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          <span className="font-mono" style={{ color: "#eab308", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            05 // TRANSMISSION
          </span>
          <h2 className="font-display" style={{ fontSize: "3rem", textTransform: "uppercase", letterSpacing: "-0.025em", color: "#ffffff", margin: 0 }}>
            INITIALIZE <span className="text-metallic-gold">TRANSMISSION.</span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", margin: 0 }}>
            Have a mission, project inquiry, or want to collaborate? Execute a direct transmission below.
          </p>
        </div>

        <form
          onSubmit={handleContactSubmit}
          className="gold-glow"
          style={{
            maxWidth: "36rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "#0e1014",
            position: "relative",
          }}
        >
          {contactStatus === "sent" && (
            <div style={{ padding: "0.75rem", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", color: "#34d399", fontSize: "0.75rem", borderRadius: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 size={16} /> Transmission executed successfully! I will respond shortly.
            </div>
          )}

          <div>
            <label className="font-mono" style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(234, 179, 8, 0.8)", marginBottom: "0.5rem" }}>
              // 01: SENDER NAME
            </label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="font-mono"
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "0.25rem",
                padding: "0.75rem",
                fontSize: "0.875rem",
                color: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
              }}
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="font-mono" style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(234, 179, 8, 0.8)", marginBottom: "0.5rem" }}>
              // 02: RETURN CHANNEL (EMAIL)
            </label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="font-mono"
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "0.25rem",
                padding: "0.75rem",
                fontSize: "0.875rem",
                color: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
              }}
              placeholder="name@domain.com"
            />
          </div>

          <div>
            <label className="font-mono" style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(234, 179, 8, 0.8)", marginBottom: "0.5rem" }}>
              // 03: TRANSMISSION PAYLOAD
            </label>
            <textarea
              rows={4}
              required
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="font-mono"
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "0.25rem",
                padding: "0.75rem",
                fontSize: "0.875rem",
                color: "#ffffff",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
              }}
              placeholder="Type your directive or project details..."
            />
          </div>

          <button
            type="submit"
            disabled={contactStatus === "submitting"}
            className="font-mono"
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(to right, #eab308, #b8860b)",
              color: "#000000",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              boxShadow: "0 10px 15px -3px rgba(212, 175, 55, 0.2)",
            }}
          >
            {contactStatus === "submitting" ? "TRANSMITTING..." : "EXECUTE TRANSMISSION"}
            <Send size={16} />
          </button>
        </form>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="font-mono"
        style={{
          padding: "2rem 1.5rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "#6b7280",
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <p style={{ margin: 0 }}>© 2026 ADITYA UPADHYAY • ENGINEERED WITH PRECISION</p>
        <button
          onClick={() => setIsAdminOpen(true)}
          style={{ color: "#eab308", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "inherit", fontSize: "inherit" }}
        >
          <Lock size={12} /> NEU-OS ACCESS
        </button>
      </footer>

      {/* ── NEU-OS CONTROL CONSOLE ── */}
      {isAdminOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ width: "100%", maxWidth: "44rem", backgroundColor: "#0e1014", border: "1px solid rgba(212, 175, 55, 0.4)", borderRadius: "1rem", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", backgroundColor: "#eab308" }} />
                <span className="font-mono" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff" }}>
                  NEU-OS CONTROL CENTER // PROTOCOL 5000
                </span>
              </div>
              <button
                onClick={() => {
                  setIsAdminOpen(false);
                  setAdminError("");
                  setAdminSuccess("");
                  resetProjectForm();
                }}
                style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {adminError && (
              <div className="font-mono" style={{ margin: "1rem 1.5rem 0", padding: "0.75rem", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#f87171", fontSize: "0.75rem", borderRadius: "0.25rem" }}>
                {adminError}
              </div>
            )}
            {adminSuccess && (
              <div className="font-mono" style={{ margin: "1rem 1.5rem 0", padding: "0.75rem", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", color: "#34d399", fontSize: "0.75rem", borderRadius: "0.25rem" }}>
                {adminSuccess}
              </div>
            )}

            {!isAuthenticated ? (
              <form onSubmit={handleAdminLogin} style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <h3 className="font-display" style={{ fontSize: "1.5rem", color: "#ffffff", margin: "0 0 0.25rem 0" }}>AUTHENTICATION REQUIRED</h3>
                  <p className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>
                    Enter master key to unlock project control & telemetry
                  </p>
                </div>
                <input
                  type="password"
                  placeholder="Enter Master Key..."
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="font-mono"
                  style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.25rem", padding: "0.75rem", fontSize: "0.875rem", color: "#ffffff", outline: "none", boxSizing: "border-box" }}
                />
                <button
                  type="submit"
                  className="font-mono"
                  style={{ width: "100%", padding: "0.75rem", background: "linear-gradient(to right, #eab308, #d4af37)", color: "#000000", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: "0.25rem", border: "none", cursor: "pointer" }}
                >
                  UNLOCK CONSOLE
                </button>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                <div className="font-mono" style={{ display: "flex", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(0, 0, 0, 0.2)", fontSize: "0.75rem" }}>
                  <button
                    onClick={() => setAdminTab("projects")}
                    style={{ flex: 1, padding: "0.75rem", background: "none", border: "none", borderBottom: adminTab === "projects" ? "2px solid #eab308" : "2px solid transparent", color: adminTab === "projects" ? "#eab308" : "#9ca3af", fontWeight: adminTab === "projects" ? 700 : 400, cursor: "pointer" }}
                  >
                    DEPLOY / EDIT PROJECTS ({adminProjects.length})
                  </button>
                  <button
                    onClick={() => {
                      setAdminTab("messages");
                      fetchMessages();
                    }}
                    style={{ flex: 1, padding: "0.75rem", background: "none", border: "none", borderBottom: adminTab === "messages" ? "2px solid #eab308" : "2px solid transparent", color: adminTab === "messages" ? "#eab308" : "#9ca3af", fontWeight: adminTab === "messages" ? 700 : 400, cursor: "pointer" }}
                  >
                    INBOX TRANSMISSIONS ({messages.length})
                  </button>
                </div>

                <div style={{ padding: "1.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {adminTab === "projects" ? (
                    <>
                      <form onSubmit={handleSaveProject} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="font-mono" style={{ fontSize: "0.75rem", color: editingProjectId ? "#38bdf8" : "#eab308", fontWeight: 700, textTransform: "uppercase" }}>
                            {editingProjectId ? `// EDITING: ${newTitle || "PROJECT"}` : "// DEPLOY NEW DELIVERABLE"}
                          </span>
                          {editingProjectId && (
                            <button
                              type="button"
                              onClick={resetProjectForm}
                              className="font-mono"
                              style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "none", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#9ca3af", fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: "0.25rem", cursor: "pointer" }}
                            >
                              <RotateCcw size={12} /> Cancel Edit
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          required
                          placeholder="Project Title"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="font-mono"
                          style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.25rem", padding: "0.625rem", fontSize: "0.75rem", color: "#ffffff", boxSizing: "border-box" }}
                        />

                        <textarea
                          rows={3}
                          required
                          placeholder="Project summary, technical details, extra information..."
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                          className="font-mono"
                          style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.25rem", padding: "0.625rem", fontSize: "0.75rem", color: "#ffffff", boxSizing: "border-box" }}
                        />

                        {!editingProjectId && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <label className="font-mono" style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                              Upload Banner Photo:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="font-mono"
                              style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.25rem", padding: "0.5rem", fontSize: "0.75rem", color: "#d1d5db", boxSizing: "border-box" }}
                            />
                          </div>
                        )}

                        {previewUrl && (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "0.25rem" }}>
                            <img src={previewUrl} alt="Preview" style={{ width: "3.5rem", height: "3.5rem", objectFit: "cover", borderRadius: "0.25rem" }} />
                            <span className="font-mono" style={{ fontSize: "0.75rem", color: "#eab308" }}>✓ Image linked</span>
                          </div>
                        )}

                        <div className="font-mono" style={{ display: "flex", gap: "1rem", fontSize: "0.75rem" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: "0.375rem", cursor: "pointer" }}>
                            <input type="radio" name="cat" checked={newCategory === "developer"} onChange={() => setNewCategory("developer")} />
                            Developer Track (/developer)
                          </label>
                          <label style={{ display: "flex", alignItems: "center", gap: "0.375rem", cursor: "pointer" }}>
                            <input type="radio" name="cat" checked={newCategory === "analyst"} onChange={() => setNewCategory("analyst")} />
                            Data Analyst Track (/analyst)
                          </label>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                          <input
                            type="url"
                            placeholder="GitHub URL (optional)"
                            value={newGithub}
                            onChange={(e) => setNewGithub(e.target.value)}
                            className="font-mono"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.25rem", padding: "0.625rem", fontSize: "0.75rem", color: "#ffffff", boxSizing: "border-box" }}
                          />
                          <input
                            type="url"
                            placeholder="Live Demo URL (optional)"
                            value={newLive}
                            onChange={(e) => setNewLive(e.target.value)}
                            className="font-mono"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.25rem", padding: "0.625rem", fontSize: "0.75rem", color: "#ffffff", boxSizing: "border-box" }}
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Tags (comma separated, e.g. DOCKER, NEXT.JS, AWS)"
                          value={newTags}
                          onChange={(e) => setNewTags(e.target.value)}
                          className="font-mono"
                          style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.25rem", padding: "0.625rem", fontSize: "0.75rem", color: "#ffffff", boxSizing: "border-box" }}
                        />

                        <div style={{ padding: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.35rem", backgroundColor: "rgba(0, 0, 0, 0.3)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <span className="font-mono" style={{ fontSize: "0.68rem", color: "#6b7280", textTransform: "uppercase" }}>
                            // ARCHITECTURE METRICS (EXTRA INFORMATION)
                          </span>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                            <input
                              type="text"
                              placeholder="Function (e.g. Real-time Ledger)"
                              value={metricFunction}
                              onChange={(e) => setMetricFunction(e.target.value)}
                              className="font-mono"
                              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.25rem", padding: "0.5rem", fontSize: "0.72rem", color: "#fff", boxSizing: "border-box" }}
                            />
                            <input
                              type="text"
                              placeholder="Metric Value (e.g. 99.99% or < 120ms)"
                              value={metricValue}
                              onChange={(e) => setMetricValue(e.target.value)}
                              className="font-mono"
                              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.25rem", padding: "0.5rem", fontSize: "0.72rem", color: "#fff", boxSizing: "border-box" }}
                            />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                            <input
                              type="text"
                              placeholder="Metric Label (e.g. LATENCY: or UPTIME:)"
                              value={metricLabel}
                              onChange={(e) => setMetricLabel(e.target.value)}
                              className="font-mono"
                              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.25rem", padding: "0.5rem", fontSize: "0.72rem", color: "#fff", boxSizing: "border-box" }}
                            />
                            <input
                              type="text"
                              placeholder="Status (e.g. Live Production or Verified)"
                              value={metricStatus}
                              onChange={(e) => setMetricStatus(e.target.value)}
                              className="font-mono"
                              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.25rem", padding: "0.5rem", fontSize: "0.72rem", color: "#fff", boxSizing: "border-box" }}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={uploading}
                          className="font-mono"
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            background: editingProjectId
                              ? "linear-gradient(to right, #38bdf8, #2563eb)"
                              : "linear-gradient(to right, #eab308, #d4af37)",
                            color: editingProjectId ? "#ffffff" : "#000000",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            borderRadius: "0.25rem",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {uploading ? (
                            "SAVING TO SERVER..."
                          ) : editingProjectId ? (
                            <>
                              <Edit3 size={15} /> SAVE PROJECT CHANGES
                            </>
                          ) : (
                            <>
                              <Plus size={16} /> DEPLOY DELIVERABLE
                            </>
                          )}
                        </button>
                      </form>

                      <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <span className="font-mono" style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase" }}>
                          Active Domain Deliverables ({adminProjects.length}):
                        </span>
                        {adminProjects.length === 0 ? (
                          <p className="font-mono" style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0, padding: "0.5rem 0" }}>
                            No custom projects deployed yet.
                          </p>
                        ) : (
                          adminProjects.map((p) => (
                            <div
                              key={p.id}
                              className="font-mono"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "0.75rem",
                                borderRadius: "0.25rem",
                                backgroundColor: editingProjectId === p.id ? "rgba(56, 189, 248, 0.08)" : "rgba(255, 255, 255, 0.02)",
                                border: editingProjectId === p.id ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
                                fontSize: "0.75rem",
                              }}
                            >
                              <div>
                                <p style={{ color: "#ffffff", fontWeight: 700, margin: 0 }}>{p.title}</p>
                                <span style={{ fontSize: "0.625rem", color: "#eab308", textTransform: "uppercase" }}>
                                  {p.category} track
                                </span>
                                {(p.githubUrl || p.liveUrl) && (
                                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                                    {p.githubUrl && <span style={{ color: "#60a5fa", fontSize: "0.65rem" }}>🔗 GitHub</span>}
                                    {p.liveUrl && <span style={{ color: "#34d399", fontSize: "0.65rem" }}>🌐 Live Demo</span>}
                                  </div>
                                )}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <button
                                  type="button"
                                  onClick={() => startEditingProject(p)}
                                  title="Edit Links & Info"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: "0.25rem",
                                    padding: "0.35rem 0.65rem",
                                    color: "#38bdf8",
                                    cursor: "pointer",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  <Edit3 size={13} /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProject(p.id)}
                                  title="Delete Project"
                                  style={{
                                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                                    border: "1px solid rgba(239, 68, 68, 0.2)",
                                    borderRadius: "0.25rem",
                                    padding: "0.35rem 0.5rem",
                                    color: "#f87171",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {messages.length === 0 ? (
                        <p className="font-mono" style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "center", padding: "2rem 0", margin: 0 }}>
                          No transmission logs found.
                        </p>
                      ) : (
                        messages.map((m) => (
                          <div
                            key={m.id}
                            className="font-mono"
                            style={{
                              padding: "0.9rem",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              borderRadius: "0.35rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.4rem",
                              fontSize: "0.75rem",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ color: "#eab308", fontWeight: 700 }}>{m.name}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <span style={{ color: "#6b7280", fontSize: "0.68rem" }}>
                                  {new Date(m.receivedAt).toLocaleDateString()}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(m.id)}
                                  title="Delete Message"
                                  style={{
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    border: "1px solid rgba(239, 68, 68, 0.25)",
                                    borderRadius: "0.25rem",
                                    padding: "0.3rem 0.45rem",
                                    color: "#f87171",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                            <a href={`mailto:${m.email}`} style={{ color: "#9ca3af", textDecoration: "underline", fontSize: "0.72rem" }}>
                              {m.email}
                            </a>
                            <p style={{ color: "#e5e7eb", marginTop: "0.35rem", backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "0.6rem", borderRadius: "0.25rem", margin: 0, lineHeight: 1.5 }}>
                              {m.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/developer" element={<DeveloperPage />} />
      <Route path="/analyst" element={<AnalystPage />} />
    </Routes>
  );
}