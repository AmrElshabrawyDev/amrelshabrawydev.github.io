// types/github.ts
// Shared types for GitHub projects

export interface Language {
  name: string;
  percentage: number;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string | null;
  stars: number;
  forks: number;
  language: string;
  languages: Language[];
  updatedAt: string;
  createdAt: string;
  readme: {
    full: string;
    preview: string;
  } | null;
  size: string;
  image: string;
  fullName: string;
  defaultBranch: string;
}
