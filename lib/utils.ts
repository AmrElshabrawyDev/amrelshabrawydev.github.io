/**
 * Generate a URL-friendly slug from a project title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** 1 → "01": two-digit numbers for numbered cards */
export const formatIndex = (n: number) => String(n).padStart(2, "0");
