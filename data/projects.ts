/*
=========================================
=========> { projects data } <===========
=========================================

Every project on /work comes from this file (no GitHub API needed).

Images live in /public/projects/<slug>/:
  cover.webp        1600×1000 card + social image
  desktop.webp      real desktop screenshot
  mobile.webp       real mobile screenshot
  psi-desktop.webp  PageSpeed Insights — desktop
  psi-mobile.webp   PageSpeed Insights — mobile

To add a project: add an entry below and drop its images in a new folder.
*/

export type ProjectType = "Client project" | "Personal project" | "Concept study";

/** The fields a portfolio card needs */
export interface PortfolioCardData {
  slug: string;
  title: string;
  type: ProjectType;
  industry: string;
  location: string;
  year: string;
  summary: string;
  stack: string[];
  cover: string;
  coverAlt: string;
}

export interface CaseStudy extends PortfolioCardData {
  client: string;
  role: string;
  /** Human-readable project period */
  period: string;
  challenge: string;
  solution: string;
  highlights: string[];
  services: string[];
  /** Lighthouse performance scores from PageSpeed Insights */
  performance?: { desktop: number; mobile: number };
  /** Real screenshots shown on the case study page */
  gallery?: { desktop: string; mobile: string };
  /** PageSpeed Insights report screenshots */
  pagespeed?: { desktop: string; mobile: string };
  liveUrl?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  featured: boolean;
  note?: string;
}

/** Standard image paths for projects stored in /public/projects/<slug>/ */
const media = (slug: string) => ({
  cover: `/projects/${slug}/cover.webp`,
  gallery: {
    desktop: `/projects/${slug}/desktop.webp`,
    mobile: `/projects/${slug}/mobile.webp`,
  },
  pagespeed: {
    desktop: `/projects/${slug}/psi-desktop.webp`,
    mobile: `/projects/${slug}/psi-mobile.webp`,
  },
});

export const caseStudies: CaseStudy[] = [
  {
    slug: "kosovo-travels",
    title: "Kosovo Travels — Travel & Booking Platform Stabilization",
    client: "Kosovo Travels",
    type: "Client project",
    industry: "Travel & booking",
    location: "International",
    year: "2026",
    role: "Full-Stack Developer / Reliability",
    period: "2026 (contribution)",
    summary:
      "Stabilized an international travel and booking platform: fixed payment sessions on Cloudflare Edge, SSR/hydration bugs, and security and SEO issues.",
    challenge:
      "The platform combines search, trip planning, booking management and online payments. Payment sessions were failing on the Cloudflare Edge runtime, Next.js SSR and hydration errors were breaking pages, interactive components behaved differently across screen sizes, and security and SEO needed attention.",
    solution:
      "I reorganized the payment logic with fallback paths for Stripe and PayPal, fixed the Server/Client Component boundaries behind the hydration errors, built one shared responsive carousel for every screen size, and added HSTS, canonical URLs, accessibility and SEO improvements — leaving the platform more stable and easier to maintain.",
    highlights: [
      "Stripe and PayPal working reliably on the Edge runtime",
      "SSR and hydration fixed without breaking the booking flow",
      "One responsive carousel for mobile, tablet and desktop",
      "HSTS security headers, canonical URLs and technical SEO",
    ],
    services: ["Production bug fixing", "Payments integration", "Performance", "Technical SEO"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Stripe", "PayPal", "Cloudflare"],
    performance: { desktop: 97, mobile: 50 },
    ...media("kosovo-travels"),
    coverAlt: "Kosovo Travels booking platform — desktop and mobile screenshots",
    liveUrl: "https://kosovotravels.com/",
    sourceUrl:
      "https://github.com/kosovot/kosovotravels/commit/490d7131dc15392bfaf49453816ca8421866d5da",
    sourceLabel: "View contribution",
    featured: true,
  },
  {
    slug: "al-amal-furniture-moving-kuwait",
    title: "Al-Amal Furniture Moving — Kuwait Lead-Generation Website",
    client: "Al-Amal Co. (شركة الأمل)",
    type: "Client project",
    industry: "Local services",
    location: "Kuwait",
    year: "2026",
    role: "Full-Stack Developer",
    period: "Jun 14 – Aug 4, 2026",
    summary:
      "A fast Arabic website for a Kuwaiti moving company, rebuilt from a crashed WordPress site — with a price calculator, lead forms and local SEO.",
    challenge:
      "The company's WordPress site went down while its Arabic articles were still ranking on Google — its main source of calls and WhatsApp leads. The new site had to come back fast at the same URLs, feel clear and quick in Arabic, calculate prices with multiple rules, and deliver every request reliably.",
    solution:
      "I rebuilt the site with Next.js and Supabase SSR, restored the content at its original Arabic URLs, and added an interactive price calculator that helps visitors decide and send their details quickly. Requests trigger email notifications through Resend, all input and content is sanitized, and every service page has local SEO and structured data. A custom admin panel lets the owner publish articles.",
    highlights: [
      "Interactive multi-rule moving cost calculator",
      "Legacy Arabic URLs served at their original addresses",
      "Lead notifications by email (Resend) + WhatsApp button",
      "Sanitized inputs and content for security",
      "Local SEO, structured data and Search Console setup",
    ],
    services: ["Website rebuild", "Lead generation", "Local SEO", "Admin panel"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "Resend"],
    performance: { desktop: 100, mobile: 76 },
    ...media("al-amal-furniture-moving-kuwait"),
    coverAlt: "Al-Amal furniture moving Kuwait Arabic website — desktop and mobile",
    liveUrl: "https://naklafeshkw.com/",
    featured: true,
  },
  {
    slug: "tonextstep-digital-marketplace",
    title: "ToNextStep — Digital Products Marketplace",
    client: "ToNextStep",
    type: "Client project",
    industry: "E-commerce / Digital products",
    location: "Remote",
    year: "2026",
    role: "Full-Stack Developer & Product Engineer",
    period: "Jul 24 – Aug 22, 2026",
    summary:
      "A full-stack marketplace for digital assets: catalog, cart, checkout, licenses, instant secure downloads and an admin panel, built on Next.js 16.",
    challenge:
      "The client needed a premium, fast storefront for templates and digital products — with a real, secure purchase flow: search and filters, data permissions, payments, digital delivery, emails, and cart and order state that never loses data or double-counts analytics events.",
    solution:
      "I built the platform on the Next.js App Router with Prisma, PostgreSQL and Supabase, validated every form with Zod and React Hook Form, and connected Paddle for payments and Resend for emails. UI components are separated from business logic, the order-and-delivery flow is secured server-side, and analytics and SEO are tuned.",
    highlights: [
      "Data model for products, orders and licenses",
      "Secure authentication and permissions",
      "Server-verified payments and instant digital delivery",
      "De-duplicated analytics events",
      "Fast multi-page UI with catalog filters and search",
    ],
    services: ["Full-stack development", "Payments integration", "Database design"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Paddle"],
    performance: { desktop: 94, mobile: 80 },
    ...media("tonextstep-digital-marketplace"),
    coverAlt: "ToNextStep digital products marketplace — desktop and mobile",
    liveUrl: "https://tonextstep-marketplace.vercel.app/",
    featured: true,
  },
  {
    slug: "luxellia-parfums-salla-store",
    title: "Luxellia Parfums — Salla Store Theme Customization",
    client: "Luxellia Parfums",
    type: "Client project",
    industry: "Luxury perfume retail",
    location: "Saudi Arabia",
    year: "2026",
    role: "Front-End Developer",
    period: "Sep 2026",
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
    slug: "travel-smart-ui",
    title: "TravelSmart AI — Conversational Trip Planner",
    client: "Personal project",
    type: "Personal project",
    industry: "Travel / AI web app",
    location: "—",
    year: "2025",
    role: "Front-End & AI Integration Developer",
    period: "Oct 30 – Dec 12, 2025",
    summary:
      "An AI travel planner that suggests destinations and itineraries through a chat assistant and a step-by-step wizard, powered by Google Gemini.",
    challenge:
      "Turning loose travel preferences into useful recommendations, managing the state of a multi-step planning wizard, handling Gemini API errors and limits, and keeping a rich, animated interface smooth on phones.",
    solution:
      "I integrated Gemini 2.5 Flash behind a request layer with error handling, organized the wizard and trip-summary state, and built reusable TypeScript components in Next.js with Framer Motion animations and a responsive glassmorphism design.",
    highlights: [
      "Prompt engineering for travel recommendations",
      "Graceful handling of Gemini API errors and limits",
      "Multi-step wizard with budget and interests",
      "Booking flow and trip summary",
    ],
    services: ["AI integration", "Web app development", "UI animation"],
    stack: ["Next.js 16", "React", "TypeScript", "Gemini 2.5 Flash", "Tailwind CSS", "Framer Motion"],
    performance: { desktop: 96, mobile: 73 },
    ...media("travel-smart-ui"),
    coverAlt: "TravelSmart AI travel planner — desktop and mobile",
    liveUrl: "https://travel-smart-ui.vercel.app/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/travel-smart-ui",
    featured: true,
  },
  {
    slug: "aman-tokyo-digital-experience",
    title: "Aman Tokyo — Bilingual Luxury Web Experience",
    client: "Independent concept study",
    type: "Concept study",
    industry: "Luxury hospitality",
    location: "—",
    year: "2026",
    role: "Front-End Developer",
    period: "Aug 2026",
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
    slug: "ecommerco",
    title: "Ecommerco — TypeScript Retail Store",
    client: "Personal project",
    type: "Personal project",
    industry: "Fashion e-commerce",
    location: "—",
    year: "2025",
    role: "Front-End / TypeScript Developer",
    period: "Feb 11, 2025 – Jul 27, 2026",
    summary:
      "A retail e-commerce app with product browsing, search, a persistent cart and order flow, written in TypeScript and built with Vite.",
    challenge:
      "Managing product and cart data reliably, keeping the cart after a page reload, writing a maintainable interface, and optimizing images and assets across many screen sizes.",
    solution:
      "I used TypeScript to reduce data bugs, Axios and JSON Server to separate the data layer, LocalStorage to persist the cart, and Vite with an image optimizer for fast builds and loads — with Bootstrap and CSS Grid for the responsive layout.",
    highlights: [
      "Cart and product state management",
      "Cart persistence with LocalStorage",
      "Product search and filtering",
      "Type-safe code with TypeScript",
    ],
    services: ["E-commerce UI", "Front-end development"],
    stack: ["TypeScript", "Vite", "Axios", "JSON Server", "Bootstrap"],
    performance: { desktop: 80, mobile: 67 },
    ...media("ecommerco"),
    coverAlt: "Ecommerco online store — desktop and mobile",
    liveUrl: "https://ecommerco-ten.vercel.app/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/Ecommerco",
    featured: false,
  },
  {
    slug: "dashboard",
    title: "Analytics Dashboard & Admin Panel",
    client: "Personal project",
    type: "Personal project",
    industry: "Admin / Data visualization",
    location: "—",
    year: "2024",
    role: "Front-End React Developer",
    period: "Oct 26, 2024 – Feb 20, 2026",
    summary:
      "A responsive admin dashboard with KPIs, charts, data tables, a calendar and validated forms — built with React and Material UI.",
    challenge:
      "Showing a lot of varied data without overwhelming the user: clear numbers and charts, organized navigation between admin pages, and a layout that works on every screen size.",
    solution:
      "I built the interface with React and Material UI, dynamic routes with React Router, Nivo charts, MUI Data Grid tables, FullCalendar, Formik + Yup forms, Redux state and a JSON Server mock API.",
    highlights: [
      "KPI cards, line, bar and pie charts (Nivo)",
      "Data tables with MUI Data Grid",
      "Calendar with FullCalendar",
      "Validated forms with Formik and Yup",
    ],
    services: ["Dashboard UI", "Data visualization"],
    stack: ["React", "Material UI", "Nivo", "Redux", "React Router", "Formik"],
    performance: { desktop: 71, mobile: 58 },
    ...media("dashboard"),
    coverAlt: "React analytics dashboard with charts — desktop and mobile",
    liveUrl: "https://amrelshabrawydev.github.io/dashboard/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/dashboard",
    featured: false,
  },
  {
    slug: "landing-page",
    title: "Tech Product Landing Page — 100 Lighthouse",
    client: "Personal project",
    type: "Personal project",
    industry: "Marketing / Landing page",
    location: "—",
    year: "2025",
    role: "Front-End Developer",
    period: "Jan 25, 2025 – Feb 21, 2026",
    summary:
      "A modern, animated landing page that scores 100 on desktop Lighthouse — optimized images, lazy loading, accessible markup and smooth scroll reveals.",
    challenge:
      "Reducing image weight and render delay, improving Lighthouse, SEO and accessibility scores, triggering animations correctly as elements enter the viewport, and keeping the mobile menu and cross-browser experience solid.",
    solution:
      "I added automatic image and SVG optimization, lazy loading and code splitting, designed the animations with Intersection Observer, and used semantic HTML and ARIA with an improved mobile menu.",
    highlights: [
      "Faster LCP and FCP",
      "Smaller images and assets (Sharp, SVGO)",
      "Accessibility with semantic HTML and ARIA",
      "Smooth scroll-triggered animations",
    ],
    services: ["Landing page", "Performance optimization"],
    stack: ["React 18", "Vite 6", "React Router", "CSS3", "Sharp", "SVGO"],
    performance: { desktop: 100, mobile: 91 },
    ...media("landing-page"),
    coverAlt: "Responsive tech landing page — desktop and mobile",
    liveUrl: "https://amrelshabrawydev.github.io/landing-page/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/landing-page",
    featured: false,
  },
  {
    slug: "akirastore",
    title: "Akira Store — Fashion E-commerce Front-End",
    client: "Personal project",
    type: "Personal project",
    industry: "Fashion e-commerce",
    location: "—",
    year: "2024",
    role: "Front-End Developer",
    period: "Jan 30, 2024 – Feb 20, 2026",
    summary:
      "A multi-section fashion store front-end with a mega menu, hero slider and category grids, built with semantic HTML, CSS and vanilla JavaScript.",
    challenge:
      "Building multi-level navigation, organizing many product images and cards without slowing the page, keeping the design consistent, and fitting the layout to phones and large screens.",
    solution:
      "I used semantic HTML and structured CSS with a custom mega menu, web fonts and icons, compressed every image with Squoosh, then tested performance after deployment and optimized asset order.",
    highlights: [
      "Multi-level mega menu",
      "Dense visual product catalog",
      "Compressed WebP product images",
      "Fully responsive layout",
    ],
    services: ["E-commerce UI", "Responsive design"],
    stack: ["HTML5", "CSS3", "JavaScript", "Font Awesome"],
    performance: { desktop: 98, mobile: 75 },
    ...media("akirastore"),
    coverAlt: "Akira Store fashion e-commerce website — desktop and mobile",
    liveUrl: "https://amrelshabrawydev.github.io/AkiraStore/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/AkiraStore",
    featured: false,
  },
  {
    slug: "twstudy",
    title: "TW Study — Online Learning Platform UI",
    client: "Personal project",
    type: "Personal project",
    industry: "Education",
    location: "—",
    year: "2024",
    role: "Front-End Developer",
    period: "Mar 6, 2024 – Feb 21, 2026",
    summary:
      "A responsive online-courses website with clear sections and course cards that help learners find the right content — fast on desktop and mobile.",
    challenge:
      "Organizing a lot of educational content in a simple interface, keeping the course-card grid and navigation right on every screen size, and reducing image weight without losing the visual identity.",
    solution:
      "I built it on a customized Bootstrap responsive grid with reusable cards and components, compressed images with Squoosh, and tested performance after deployment.",
    highlights: [
      "Responsive course grid",
      "Organized, dense educational content",
      "Customized Bootstrap without conflicts",
      "Optimized images for fast loading",
    ],
    services: ["Website UI", "Responsive design"],
    stack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    performance: { desktop: 99, mobile: 80 },
    ...media("twstudy"),
    coverAlt: "TW Study online learning platform — desktop and mobile",
    liveUrl: "https://amrelshabrawydev.github.io/twstudy/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/twstudy",
    featured: false,
  },
  {
    slug: "companions-saas-app",
    title: "Converso — AI Teaching Companions SaaS",
    client: "Personal project",
    type: "Personal project",
    industry: "Education / AI SaaS",
    location: "—",
    year: "2025",
    role: "Full-Stack Developer",
    period: "Aug – Sep 2025",
    summary:
      "A real-time AI teaching platform where learners pick a subject and talk to a personalized AI companion through voice-powered lessons.",
    challenge:
      "Letting learners create and use personalized AI tutors with real-time voice sessions, while keeping lessons, history and the dashboard organized per user.",
    solution:
      "I built the app with Next.js and a SaaS-style dashboard for creating companions, starting voice lessons and tracking completed sessions.",
    highlights: [
      "Personalized AI companions by subject",
      "Real-time voice lessons",
      "Dashboard with recent sessions",
    ],
    services: ["SaaS development", "AI integration"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    cover: "/projects/converso.webp",
    coverAlt: "Converso AI teaching platform dashboard",
    liveUrl: "https://companions-saas-app.vercel.app/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/companions-saas-app",
    featured: false,
  },
  {
    slug: "weather-app",
    title: "Weather App — React",
    client: "Personal project",
    type: "Personal project",
    industry: "Utility app",
    location: "—",
    year: "2024",
    role: "Front-End Developer",
    period: "Jul 2024",
    summary:
      "A React weather app with city search, current conditions, hourly and daily forecasts, and °C/°F switching, powered by a weather API.",
    challenge:
      "Fetching and displaying live weather data clearly, with quick city switching and without refetching the same data.",
    solution:
      "I built it in React with an API data layer and state management that caches weather data to keep the app fast.",
    highlights: [
      "City search and quick city shortcuts",
      "3-hour and daily forecasts",
      "Celsius / Fahrenheit toggle",
    ],
    services: ["Front-end development", "API integration"],
    stack: ["React", "JavaScript", "Weather API"],
    cover: "/projects/weather-app.webp",
    coverAlt: "React weather app showing London forecast",
    liveUrl: "https://amrelshabrawydev.github.io/weather-app/",
    sourceUrl: "https://github.com/AmrElshabrawyDev/weather-app",
    featured: false,
  },
  {
    slug: "rich-black-theme",
    title: "Rich Black — VS Code Theme",
    client: "Personal project",
    type: "Personal project",
    industry: "Developer tools",
    location: "—",
    year: "2024",
    role: "Designer & Developer",
    period: "Dec 2024",
    summary:
      "A dark theme extension for Visual Studio Code, published on the VS Code Marketplace with several color variants.",
    challenge:
      "Designing a comfortable, high-contrast dark theme that stays readable across languages and UI panels for long coding sessions.",
    solution:
      "I designed the color tokens for the editor and the workbench, packaged the theme as a VS Code extension with multiple variants, and published it on the Marketplace.",
    highlights: [
      "Multiple dark variants",
      "Consistent syntax colors across languages",
      "Published on the VS Code Marketplace",
    ],
    services: ["Theme design", "Developer tools"],
    stack: ["VS Code API", "JSON"],
    cover: "/projects/rich-black-theme.webp",
    coverAlt: "Rich Black VS Code theme screenshots",
    liveUrl:
      "https://marketplace.visualstudio.com/items?itemName=rich-black-theme.amr-rich-black-theme",
    sourceUrl: "https://github.com/AmrElshabrawyDev/rich-black-theme",
    featured: false,
  },
];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
