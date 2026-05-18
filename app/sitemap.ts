import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/github";
import { generateSlug } from "@/lib/utils";

export const dynamic = "force-static";

const BASE_URL = "https://amrelshabrawydev.github.io";

// Last time static pages were meaningfully updated
const STATIC_PAGE_DATE = new Date("2026-05-18");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // ── Dynamic project routes (/work/[slug]) ──────────────────────────────────
  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const projects = await getAllProjects();

    projectRoutes = projects.map((project) => ({
      url: `${BASE_URL}/work/${generateSlug(project.title)}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Fail gracefully — static routes are still returned
    console.error("[sitemap] Failed to fetch projects for sitemap");
  }

  return [...staticRoutes, ...projectRoutes];
}
