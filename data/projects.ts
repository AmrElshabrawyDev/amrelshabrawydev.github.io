/*
=========================================
=========> { case studies data } <========
=========================================

Curated projects shown first on /work and on the homepage.
Covers live in /public/projects/<file>.webp (1600×1000).
To swap in a real screenshot, replace the file and keep the same name.
*/

export type ProjectType = "Client project" | "Concept study" | "UI build" | "Open source";

/** The fields a portfolio card needs — shared by case studies and GitHub repos */
export interface PortfolioCardData {
  slug: string;
  title: string;
  type: ProjectType;
  industry: string;
  location: string;
  year: string;
  summary: string;
  stack: string[];
  /** Optional — cards without a cover get a generated one */
  cover?: string;
  coverAlt?: string;
}

export interface CaseStudy {
  /** URL slug under /work/ */
  slug: string;
  /** GitHub repo name (lowercase) — hides the duplicate repo card on /work */
  repo?: string;
  title: string;
  client: string;
  type: ProjectType;
  industry: string;
  location: string;
  year: string;
  /** One-line summary for cards and meta descriptions (≤ 160 chars) */
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  services: string[];
  stack: string[];
  cover: string;
  coverAlt: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  note?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "al-amal-furniture-moving-kuwait",
    repo: "naklafeshkw",
    title: "Al-Amal Furniture Moving — WordPress to Next.js Rescue",
    client: "Al-Amal Co. (شركة الأمل)",
    type: "Client project",
    industry: "Local services",
    location: "Kuwait",
    year: "2026",
    summary:
      "Rebuilt a crashed WordPress site in Next.js while keeping 182 indexed Arabic URLs live, so a Kuwaiti moving company kept its Google rankings.",
    challenge:
      "The company's WordPress site went down while it still had 182 Arabic articles indexed on Google — its main source of phone calls and WhatsApp leads. Every day offline meant lost rankings. The site had to come back fast, at the exact same URLs, with no redirect chains.",
    solution:
      "I rebuilt the site on the Next.js App Router with Supabase, recovered the content from the Web Archive, and served every legacy Arabic slug directly at its original address. Each page got its own title, description, canonical URL and structured data. I also built a custom admin panel so the owner can publish articles without touching the database.",
    highlights: [
      "182 legacy Arabic URLs served at their original addresses — no redirects",
      "LocalBusiness, Service and BreadcrumbList structured data",
      "Arabic-first RTL interface with a floating WhatsApp / call button",
      "Custom admin panel for articles, messages and users",
      "Google Ads conversion tracking and Search Console verification",
    ],
    services: ["Website rebuild", "SEO migration", "Admin panel", "Local SEO"],
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Supabase", "Resend"],
    cover: "/projects/al-amal-moving.webp",
    coverAlt:
      "Al-Amal furniture moving Kuwait — WordPress to Next.js migration case study",
    liveUrl: "https://naklafeshkw.vercel.app",
    featured: true,
  },
  {
    slug: "tonextstep-digital-marketplace",
    repo: "tonextstep-marketplace",
    title: "ToNextStep — Digital Products Marketplace",
    client: "ToNextStep",
    type: "Client project",
    industry: "E-commerce / Digital products",
    location: "Remote",
    year: "2026",
    summary:
      "A full-stack marketplace for selling digital assets: catalog, cart, checkout, instant secure downloads and an admin panel, built on Next.js 16.",
    challenge:
      "The client needed a premium storefront for templates and digital assets, with real payments, instant delivery of paid files, and a dashboard where buyers can re-download purchases — without exposing the files to anyone who hasn't paid.",
    solution:
      "I built the store on Next.js 16 and React 19 with a PostgreSQL database (Supabase + Prisma). Payments are confirmed server-side through verified webhooks, prices are never trusted from the browser, and paid files are delivered through short-lived signed URLs from private storage. Buyers get a dashboard with their downloads and license keys; the owner gets an admin area to manage products.",
    highlights: [
      "Catalog with filters, sorting, search and pagination",
      "Cart, promo codes and a 3-step distraction-free checkout",
      "Server-verified payments (Paddle / SpaceRemit webhooks)",
      "Private file storage with expiring signed download links",
      "Email + Google sign-in, buyer dashboard and admin panel",
    ],
    services: ["Full-stack development", "Payments integration", "UI implementation"],
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Prisma", "Supabase", "Paddle"],
    cover: "/projects/tonextstep.webp",
    coverAlt: "ToNextStep digital products marketplace built with Next.js 16",
    liveUrl: "https://tonextstep-marketplace.vercel.app/",
    featured: true,
  },
  {
    slug: "luxellia-parfums-salla-store",
    repo: "luxellia-parfums",
    title: "Luxellia Parfums — Salla Store Theme Customization",
    client: "Luxellia Parfums",
    type: "Client project",
    industry: "Luxury perfume retail",
    location: "Saudi Arabia",
    year: "2026",
    summary:
      "A luxury Arabic (RTL) look for a perfume store on Salla: a customized Raed theme, an interactive preview and catalog tooling ready for supplier data.",
    challenge:
      "A perfume brand selling on Salla wanted its store to feel like a luxury boutique instead of a default template — in Arabic, fast on mobile, and ready to import products from its supplier.",
    solution:
      "I customized Salla's Raed theme with a classic luxury identity and built an interactive RTL preview so the client could approve the design before anything touched the live store. I also wrote Node.js tooling that cleans and filters the product catalog and prepares Salla Merchant API payloads, plus QA, installation and rollback guides for a safe launch.",
    highlights: [
      "Custom Raed theme styling with isolated, reversible CSS/JS",
      "Interactive Arabic RTL preview for desktop and mobile",
      "Catalog normalization and brand allow-list filtering scripts",
      "Launch documentation: QA checklist, install guide, rollback plan",
    ],
    services: ["Salla theme customization", "E-commerce UI", "Catalog tooling"],
    stack: ["Salla Twilight", "Raed theme", "CSS", "JavaScript", "Node.js"],
    cover: "/projects/luxellia-parfums.webp",
    coverAlt: "Luxellia Parfums Arabic Salla store theme — desktop and mobile preview",
    featured: true,
    note: "Screens show the pre-launch preview with sample products.",
  },
  {
    slug: "aman-tokyo-digital-experience",
    repo: "aman-tokyo",
    title: "Aman Tokyo — Bilingual Luxury Web Experience",
    client: "Independent concept study",
    type: "Concept study",
    industry: "Luxury hospitality",
    location: "—",
    year: "2026",
    summary:
      "A pixel-accurate, bilingual (English + Arabic) single-page experience built from a Figma concept, with video, motion and self-hosted typography.",
    challenge:
      "Translate a high-end Figma concept into a web page that keeps the calm, editorial feel of luxury hospitality — with English and Arabic side by side, heavy imagery and motion, and without hurting load speed.",
    solution:
      "I built nine sections on Next.js 16 with Tailwind v4 design tokens and Framer Motion reveals, self-hosted the 29LT Bukra font with next/font, and used a video-over-still hero so the page paints instantly before the video loads.",
    highlights: [
      "Figma-to-code with design tokens and strict TypeScript",
      "English and Arabic composed side by side (bilingual by design)",
      "Scroll-driven motion with Framer Motion",
      "Video hero with a still-image fallback for fast first paint",
    ],
    services: ["Figma to Next.js", "Motion design", "Bilingual UI"],
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    cover: "/projects/aman-tokyo.webp",
    coverAlt: "Aman Tokyo bilingual luxury hotel website concept built with Next.js",
    liveUrl: "https://aman-tokyo-six.vercel.app",
    featured: true,
    note: "Independent concept study — not commissioned by or affiliated with Aman.",
  },
  {
    slug: "akirastore",
    repo: "akirastore",
    title: "Akira Store — Fashion E-commerce UI",
    client: "Personal project",
    type: "UI build",
    industry: "Fashion e-commerce",
    location: "—",
    year: "2024",
    summary:
      "A responsive fashion store front-end with a mega menu, hero slider and category grids, built with semantic HTML, CSS and vanilla JavaScript.",
    challenge:
      "Recreate a complete, multi-section e-commerce storefront that stays fast and responsive without any framework.",
    solution:
      "I built the layout with semantic HTML and modern CSS, added a mega menu, sliders and product grids in vanilla JavaScript, and served every image as WebP to keep the page light.",
    highlights: [
      "Mega menu navigation and hero slider",
      "Responsive product and category grids",
      "WebP images for faster loading",
    ],
    services: ["E-commerce UI", "Responsive design"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    cover: "/projects/akira-store.webp",
    coverAlt: "Akira Store fashion e-commerce website homepage",
    liveUrl: "https://amrelshabrawydev.github.io/AkiraStore/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/AkiraStore",
    featured: false,
  },
];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

/** Repos that already have a case study — hidden from the GitHub list */
export const caseStudyRepos = new Set(
  caseStudies.map((c) => c.repo).filter(Boolean) as string[],
);

/**
 * Practice / tutorial repos that shouldn't be shown to clients.
 * They stay on GitHub; they just don't dilute the portfolio.
 */
export const hiddenRepos = new Set([
  "amrelshabrawydev", // GitHub profile README
  "amrelshabrawydev.github.io", // this site
  "introduction-to-github",
  "analogclock",
  "todolist",
  "accordion",
  "imageslider",
  "snake-game",
  "twstudy",
  "startbootstrap",
  "autocomplete",
  "luxellia-preview", // preview of the Luxellia case study
]);

/**
 * Real screenshots for GitHub repos (lowercase repo name → image in /public).
 * Repos without an entry get a generated cover.
 */
export const repoCovers: Record<string, string> = {
  "travel-smart-ui": "/projects/travel-smart.webp",
  "companions-saas-app": "/projects/converso.webp",
  "weather-app": "/projects/weather-app.webp",
  "landing-page": "/projects/landing-page.webp",
  "rich-black-theme": "/projects/rich-black-theme.webp",
};
