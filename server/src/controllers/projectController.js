import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsFilePath = path.join(__dirname, "../data/projects.json");

// Helper to read projects
const getStoredProjects = () => {
  if (!fs.existsSync(projectsFilePath)) return [];
  const data = fs.readFileSync(projectsFilePath, "utf8");
  return data ? JSON.parse(data) : [];
};

// Update an existing project
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
      // If updating a project not yet saved in projects.json (e.g. hardcoded initial project), create/save it
      const newEntry = {
        id,
        ...req.body,
        updatedAt: new Date().toISOString(),
      };
      projects.unshift(newEntry);
      fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
      return res.status(200).json({ status: "success", data: newEntry });
    }

    // Merge changes
    projects[index] = {
      ...projects[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
    return res.status(200).json({ status: "success", data: projects[index] });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Failed to update project." });
  }
};