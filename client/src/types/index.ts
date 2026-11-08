export interface Project {
  id: string;
  title: string;
  description: string;
  category: "developer" | "analyst";
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
  createdAt?: string;
}

export type Mode = "developer" | "analyst";