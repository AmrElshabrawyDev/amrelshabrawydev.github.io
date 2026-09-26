import { MetadataRoute } from "next";
import { caseStudies } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL as BASE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Last time static pages were meaningfully updated
const STATIC_PAGE_DATE = new Date("2026-09-26");

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", changeFrequency: "monthly", priority: 1.0 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/work", changeFrequency: "weekly", priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: STATIC_PAGE_DATE,
    changeFrequency: changeFrequency as "monthly" | "weekly" | "yearly",
    priority,
  }));

  // ── Case studies (/work/[slug]) ────────────────────────────────────────────
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${BASE_URL}/work/${study.slug}`,
    lastModified: STATIC_PAGE_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Blog posts (/blog/[slug]) ──────────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
