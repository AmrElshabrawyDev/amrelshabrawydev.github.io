import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/*
 * Blog posts live in /content/blog/<slug>.md
 *
 * Frontmatter:
 *   title:       "Post title (≤ 60 chars works best on Google)"
 *   description: "Meta description, 140–160 chars"
 *   date:        "2026-09-26"
 *   updated:     "2026-10-01"          (optional)
 *   lang:        "en" | "ar"           (optional, default "en")
 *   tags:        ["Next.js", "SEO"]
 *   draft:       true                  (optional — hides the post)
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  lang: "en" | "ar";
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/** YAML parses unquoted dates as Date objects — normalize to "YYYY-MM-DD" */
const toDateString = (value: unknown) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : (value as string | undefined);

function readPost(file: string): Post & { draft: boolean } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    date: toDateString(data.date) as string,
    updated: toDateString(data.updated),
    lang: data.lang === "ar" ? "ar" : "en",
    tags: data.tags ?? [],
    draft: Boolean(data.draft),
    readingMinutes: readingMinutes(content),
    content,
  };
}

/** All published posts, newest first */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string, lang: "en" | "ar" = "en") {
  return new Date(date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
