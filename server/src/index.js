import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Full CORS configuration for local development and Vercel production
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-admin-key"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded media
const uploadsPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use("/uploads", express.static(uploadsPath));

// Project Track Endpoints
app.use("/api/projects", projectRoutes);

// Admin Master Key Verification Endpoint
app.post("/api/admin/verify", (req, res) => {
  const clientKey = req.headers["x-admin-key"];
  const expectedKey = process.env.ADMIN_KEY || "admin123";

  if (clientKey && clientKey === expectedKey) {
    return res.status(200).json({ status: "success", message: "Authenticated" });
  }

  return res.status(401).json({ status: "error", message: "Invalid admin key" });
});

// Contact / Transmission Data File Path
const messagesFilePath = path.join(__dirname, "data/messages.json");

// Ensure data folder and messages.json exist
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([]));
}

// Contact Endpoints
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    const fileData = fs.readFileSync(messagesFilePath, "utf8");
    const messages = fileData ? JSON.parse(fileData) : [];

    const newMessage = {
      id: "msg_" + Date.now(),
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    };

    messages.unshift(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    return res.status(201).json({ status: "success", data: newMessage });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Failed to store transmission." });
  }
});

app.get("/api/contact", (req, res) => {
  try {
    const clientKey = req.headers["x-admin-key"];
    const expectedKey = process.env.ADMIN_KEY || "admin123";

    if (clientKey !== expectedKey) {
      return res.status(401).json({ status: "error", message: "Unauthorized." });
    }

    const fileData = fs.readFileSync(messagesFilePath, "utf8");
    const messages = fileData ? JSON.parse(fileData) : [];
    return res.status(200).json({ status: "success", data: messages });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Failed to load messages." });
  }
});

app.delete("/api/contact/:id", (req, res) => {
  try {
    const clientKey = req.headers["x-admin-key"];
    const expectedKey = process.env.ADMIN_KEY || "admin123";

    if (clientKey !== expectedKey) {
      return res.status(401).json({ status: "error", message: "Unauthorized." });
    }

    const fileData = fs.readFileSync(messagesFilePath, "utf8");
    let messages = fileData ? JSON.parse(fileData) : [];
    messages = messages.filter((m) => m.id !== req.params.id);

    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
    return res.status(200).json({ status: "success", message: "Message deleted." });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Failed to delete message." });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Server running and listening on port ${PORT}`);
});