import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data files
const dataFilePath = path.join(__dirname, "../data/projects.json");
const uploadsDir = path.join(__dirname, "../../uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `img_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const readProjects = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading projects:", err);
    return [];
  }
};

const writeProjects = (projects) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), "utf8");
};

const verifyAdminKey = (req, res, next) => {
  const clientKey = req.headers["x-admin-key"];
  const serverKey = process.env.ADMIN_KEY || "@hkup1290";

  if (!clientKey || clientKey !== serverKey) {
    return res.status(401).json({ status: "error", message: "Unauthorized access" });
  }
  next();
};

// GET projects
router.get("/", (req, res) => {
  const projects = readProjects();
  res.json({ status: "success", data: projects });
});

// POST project with file upload
router.post("/", verifyAdminKey, upload.single("imageFile"), (req, res) => {
  const { title, description, category, imageUrl, githubUrl, liveUrl, tags } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({
      status: "error",
      message: "Title, description, and category are required.",
    });
  }

  // If a file was uploaded from phone/PC, construct its server path.
  // When live in production, this resolves to your host domain.
  let resolvedImageUrl = imageUrl || "";
  if (req.file) {
    resolvedImageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  const projects = readProjects();
  const newProject = {
    id: `proj_${Date.now()}`,
    title: title.trim(),
    description: description.trim(),
    category: category === "analyst" ? "analyst" : "developer",
    imageUrl: resolvedImageUrl,
    githubUrl: githubUrl ? githubUrl.trim() : "",
    liveUrl: liveUrl ? liveUrl.trim() : "",
    tags: tags ? JSON.parse(tags) : [],
    createdAt: new Date().toISOString(),
  };

  projects.unshift(newProject);
  writeProjects(projects);

  res.status(201).json({ status: "success", data: newProject });
});

// DELETE project
router.delete("/:id", verifyAdminKey, (req, res) => {
  const { id } = req.params;
  let projects = readProjects();
  const initialLength = projects.length;

  projects = projects.filter((p) => p.id !== id);

  if (projects.length === initialLength) {
    return res.status(404).json({ status: "error", message: "Project not found" });
  }

  writeProjects(projects);
  res.json({ status: "success", message: "Project deleted successfully" });
});

export default router;
