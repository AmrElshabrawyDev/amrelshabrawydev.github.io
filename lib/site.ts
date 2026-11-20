// ====================================
// 🌐 Site-wide constants (single source of truth)
// ====================================

export const SITE_URL = "https://amrelshabrawydev.github.io";
export const SITE_NAME = "Amr Elshabrawy";

export const SOCIAL = {
  github: "https://github.com/AmrElshabrawyDev",
  linkedin: "https://www.linkedin.com/in/amr-elshabrawy-dev",
  x: "https://x.com/AmrElshabr43803",
  mostaql: "https://mostaql.com/u/Amr_Elshabrawy",
  xHandle: "@AmrElshabr43803",
  email: "amrelshabrawy.dev@gmail.com",
  whatsappNumber: "201202546653",
} as const;

/** Profile photo — a JPG named after the person so image search ties the face to the name */
export const PROFILE_IMAGE = {
  src: "/amr-elshabrawy-nextjs-developer.jpg",
  width: 800,
  height: 800,
  alt: "Amr Elshabrawy, freelance React and Next.js developer in Cairo",
} as const;

export const whatsappLink = (
  text = "Hi Amr! I saw your portfolio and I'd like to discuss a project.",
) => `https://wa.me/${SOCIAL.whatsappNumber}?text=${encodeURIComponent(text)}`;

/** Build an absolute URL from a site-relative path */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path === "/" ? "" : path}`;
