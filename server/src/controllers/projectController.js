import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "../data/projects.json");

// Helper to read data safely
async function readProjects() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, "[]", "utf-8");
      return [];
    }
    throw error;
  }
}

// Helper to write data
async function writeProjects(projects) {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), "utf-8");
}

// GET /api/projects (Public)
export async function getAllProjects(req, res) {
  try {
    const projects = await readProjects();
    res.status(200).json({ status: "success", data: projects });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to read projects" });
  }
}

// POST /api/projects (Admin protected)
export async function createProject(req, res) {
  try {
    const { title, description, tags, link, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({ status: "error", message: "Title and description are required" });
    }

    const projects = await readProjects();
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      tags: Array.isArray(tags) ? tags : [],
      link: link || "",
      image: image || "",
      createdAt: new Date().toISOString()
    };

    projects.unshift(newProject);
    await writeProjects(projects);

    res.status(201).json({ status: "success", data: newProject });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to save project" });
  }
}

// DELETE /api/projects/:id (Admin protected)
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    let projects = await readProjects();
    const initialLength = projects.length;

    projects = projects.filter((p) => p.id !== id);

    if (projects.length === initialLength) {
      return res.status(404).json({ status: "error", message: "Project not found" });
    }

    await writeProjects(projects);
    res.status(200).json({ status: "success", message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to delete project" });
  }
}