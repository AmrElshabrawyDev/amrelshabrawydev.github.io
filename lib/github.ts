// lib/github.ts
import { cache } from "react";
import type { Project } from "@/types/github";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Amr-Elshabrawy-Dev";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const FEATURED_REPOS: string[] = [];

const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Shell: "#89e051",
  Vue: "#41b883",
  React: "#61dafb",
  Svelte: "#ff3e00",
};

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  size: number;
  default_branch: string;
  fork: boolean;
}

interface LanguageStats {
  [key: string]: number;
}

function formatRepoName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} KB`;
  return `${(bytes / 1024).toFixed(1)} MB`;
}

function calculateLanguagePercentages(languages: LanguageStats) {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  if (total === 0) return [];

  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / total) * 100),
      color: LANGUAGE_COLORS[name] || "#8b5cf6",
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);
}

async function fetchWithToken(url: string) {
  const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const response = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
  return response.json();
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const repos: GitHubRepo[] = await fetchWithToken(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
  );

  let selectedRepos = repos.filter((r) => !r.fork);
  if (FEATURED_REPOS.length > 0) {
    selectedRepos = selectedRepos.filter((r) =>
      FEATURED_REPOS.includes(r.name),
    );
  } else {
    selectedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  const projects = await Promise.all(
    selectedRepos.map(async (repo) => {
      try {
        const languages = await fetchWithToken(
          `https://api.github.com/repos/${repo.full_name}/languages`,
        ).catch(() => ({}));

        return {
          id: repo.id,
          title: formatRepoName(repo.name),
          description: repo.description || "No description available.",
          technologies: [repo.language, ...repo.topics.slice(0, 3)].filter(
            Boolean,
          ) as string[],
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || "Unknown",
          languages: calculateLanguagePercentages(languages),
          updatedAt: repo.updated_at,
          createdAt: repo.created_at,
          readme: null, // Don't fetch full readme in list
          size: formatSize(repo.size),
          image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
          fullName: repo.full_name,
          defaultBranch: repo.default_branch,
        };
      } catch (error) {
        console.error(`Error processing repo ${repo.name}:`, error);
        return null;
      }
    }),
  );

  return projects.filter(Boolean) as Project[];
});

export async function getProjectReadme(
  fullName: string,
  defaultBranch: string,
): Promise<{ full: string; preview: string } | null> {
  try {
    const readmeData = await fetchWithToken(
      `https://api.github.com/repos/${fullName}/readme?ref=${defaultBranch}`,
    );

    if (!readmeData) return null;

    const fullReadme = Buffer.from(readmeData.content, "base64").toString(
      "utf-8",
    );
    let preview = "";

    const lines = fullReadme.split("\n").filter((l) => l.trim());
    for (const line of lines) {
      if (!line.startsWith("#") && !line.includes("![") && line.length > 20) {
        preview = line;
        break;
      }
    }

    return { full: fullReadme, preview };
  } catch (error) {
    console.error(`Failed to fetch README for ${fullName}:`, error);
    return null;
  }
}
