import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsFilePath = path.join(__dirname, "../data/projects.json");

const getStoredProjects = () => {
  if (!fs.existsSync(projectsFilePath)) return [];
  const data = fs.readFileSync(projectsFilePath, "utf8");
  return data ? JSON.parse(data) : [];
};

export const getProjects = (req, res) => {
  try {
    const projects = getStoredProjects();
    res.status(200).json({ status: "success", data: projects });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to load projects." });
  }
};

export const createProject = (req, res) => {
  try {
    const clientKey = req.headers["x-admin-key"];
    const expectedKey = process.env.ADMIN_KEY || "admin123";

    if (clientKey !== expectedKey) {
      return res.status(401).json({ status: "error", message: "Unauthorized." });
    }

    const projects = getStoredProjects();
    const newProject = {
      id: "proj_" + Date.now(),
      title: req.body.title,
      description: req.body.description,
      category: req.body.category || "developer",
      githubUrl: req.body.githubUrl || "",
      liveUrl: req.body.liveUrl || "",
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      metrics: req.body.metrics ? JSON.parse(req.body.metrics) : {},
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      createdAt: new Date().toISOString(),
    };

    projects.unshift(newProject);
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
    res.status(201).json({ status: "success", data: newProject });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to create project." });
  }
};

export const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const clientKey = req.headers["x-admin-key"];
    const expectedKey = process.env.ADMIN_KEY || "admin123";

    if (clientKey !== expectedKey) {
      return res.status(401).json({ status: "error", message: "Unauthorized." });
    }

    const projects = getStoredProjects();
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      const newEntry = {
        id,
        ...req.body,
        updatedAt: new Date().toISOString(),
      };
      projects.unshift(newEntry);
      fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
      return res.status(200).json({ status: "success", data: newEntry });
    }

    projects[index] = {
      ...projects[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
    res.status(200).json({ status: "success", data: projects[index] });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to update project." });
  }
};

export const deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    const clientKey = req.headers["x-admin-key"];
    const expectedKey = process.env.ADMIN_KEY || "admin123";

    if (clientKey !== expectedKey) {
      return res.status(401).json({ status: "error", message: "Unauthorized." });
    }

    let projects = getStoredProjects();
    projects = projects.filter((p) => p.id !== id);
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));

    res.status(200).json({ status: "success", message: "Project deleted." });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to delete project." });
  }
};