import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import projectRoutes from "./routes/projectRoutes.js";

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_KEY = process.env.ADMIN_KEY || "masterkey123";

app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 1. Admin Verification Endpoint
// Admin Authentication Endpoint
app.post("/api/admin/verify", (req, res) => {
  const clientKey = req.headers["x-admin-key"];
  const expectedKey = process.env.ADMIN_KEY || "admin123";

  if (clientKey && clientKey === expectedKey) {
    return res.status(200).json({ status: "success", message: "Authenticated" });
  }

  return res.status(401).json({ status: "error", message: "Invalid admin key" });
});

// 2. Project Routes
app.use("/api/projects", projectRoutes);

// 3. Contact Form Endpoints (Stores transmissions in server/src/data/messages.json)
const messagesFilePath = path.join(__dirname, "data", "messages.json");

// Save transmission message
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ status: "fail", message: "Please provide name, email, and message." });
    }

    let messages = [];
    if (fs.existsSync(messagesFilePath)) {
      const fileData = fs.readFileSync(messagesFilePath, "utf8");
      messages = fileData ? JSON.parse(fileData) : [];
    }

    const newMessage = {
      id: "msg_" + Date.now(),
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    };

    messages.unshift(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    return res.status(200).json({ status: "success", data: newMessage });
  } catch (err) {
    console.error("Error saving contact message:", err);
    return res.status(500).json({ status: "error", message: "Failed to store message." });
  }
});

// Get transmission messages (for NEU-OS Admin Modal)
app.get("/api/contact", (req, res) => {
  try {
    let messages = [];
    if (fs.existsSync(messagesFilePath)) {
      const fileData = fs.readFileSync(messagesFilePath, "utf8");
      messages = fileData ? JSON.parse(fileData) : [];
    }
    return res.status(200).json({ status: "success", data: messages });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Failed to load messages." });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Server running and listening on http://localhost:${PORT}`);
});
const expectedKey = process.env.ADMIN_KEY || "your-default-key";