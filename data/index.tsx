/*
=========================================
=========> { personal info data } <=======
=========================================
*/

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  availability: string;
}

export const personalInfo: PersonalInfo = {
  name: "Amr Elshabrawy",
  role: "Freelance React & Next.js Developer",
  tagline: "Fast, SEO-ready websites and online stores that win clients",
  description:
    "Freelance React & Next.js developer from Egypt with 5+ years building fast, SEO-ready websites, online stores and web apps for clients in Egypt, the Gulf and worldwide.",
  location: "Cairo, Egypt",
  email: "amrelshabrawy.dev@gmail.com",
  github: "https://github.com/AmrElshabrawyDev",
  linkedin: "https://www.linkedin.com/in/amr-elshabrawy-dev",
  resume: "/AmrElshabrawy-FrontendDeveloper_React_NEXTJS-Resume.pdf",
  availability: "Available for new projects",
};

/*
=========================================
=========> { hero section data } <========
=========================================
*/

export interface HeroData {
  greeting: string;
  name: string;
  roles: string[];
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  stats: {
    yearsOfExperience: string;
    projectsCompleted: string;
    happyClients: string;
  };
}

export const heroData: HeroData = {
  greeting: "Hello, I'm",
  name: "Amr Elshabrawy",
  roles: [
    "Front-End Developer",
    "React Next.js Developer",
    "Performance Optimizer",
    "UI/UX Developer",
    "SEO Enthusiast",
  ],
  description:
    "I help businesses get websites that load fast, rank on Google and turn visitors into customers — business sites, online stores (Next.js or Salla), dashboards, and WordPress-to-Next.js migrations that keep your rankings.",
  primaryCTA: "See My Work",
  secondaryCTA: "Start a Project",
  stats: {
    yearsOfExperience: "5+",
    projectsCompleted: "50+",
    happyClients: "30+",
  },
};

/*
===================================
=========> { about data } <=========
===================================
*/

import React from "react";
import {
  Code2,
  Palette,
  GitBranch,
  Rocket,
  Database,
  CreditCard,
  Github,
  Linkedin,
  Mail,
  FileText,
  MessageCircle,
} from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  /** What this means for the client, in one line */
  benefit: string;
  skills: string[];
  /** Case studies (slugs from data/projects.ts) where these tools were used */
  projects: string[];
}

export interface AboutData {
  bio: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  skillCategories: SkillCategory[];
}

export const aboutData: AboutData = {
  bio: "I'm Amr, a freelance front-end developer based in Cairo. I build websites and web apps with React and Next.js for businesses that care about speed, search rankings and a polished experience — from Arabic RTL stores on Salla to full-stack marketplaces. You work directly with me, from the first call to launch and beyond.",
  yearsOfExperience: 5,
  projectsCompleted: 50,
  // Only tools used in shipped projects. Add new ones here once a real
  // project uses them (e.g. Node.js, Laravel) — with the case study as proof.
  skillCategories: [
    {
      title: "Frameworks & languages",
      icon: <Code2 className="w-6 h-6" />,
      benefit: "Modern, typed code that's easy to maintain and grow.",
      skills: [
        "Next.js (App Router)",
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
      ],
      projects: [
        "kosovo-travels",
        "tonextstep-digital-marketplace",
        "companions-saas-app",
      ],
    },
    {
      title: "UI, styling & motion",
      icon: <Palette className="w-6 h-6" />,
      benefit: "Pixel-perfect, responsive interfaces — Arabic RTL included.",
      skills: [
        "Tailwind CSS",
        "CSS3",
        "Material UI",
        "Bootstrap",
        "Framer Motion",
        "GSAP",
        "three.js",
        "RTL layouts",
      ],
      projects: [
        "al-amal-furniture-moving-kuwait",
        "travel-smart-ui",
        "dashboard",
      ],
    },
    {
      title: "App logic & data",
      icon: <Database className="w-6 h-6" />,
      benefit: "Dashboards, forms, APIs and databases that just work.",
      skills: [
        "Redux",
        "React Router",
        "Formik",
        "Axios",
        "REST APIs",
        "Prisma",
        "PostgreSQL",
      ],
      projects: ["tonextstep-digital-marketplace", "dashboard", "ecommerco"],
    },
    {
      title: "E-commerce & integrations",
      icon: <CreditCard className="w-6 h-6" />,
      benefit: "Stores, checkouts and services connected end to end.",
      skills: [
        "Salla (Twilight · Raed)",
        "Stripe",
        "PayPal",
        "Paddle",
        "Supabase",
        "Resend",
        "Gemini API",
      ],
      projects: [
        "luxellia-parfums-salla-store",
        "kosovo-travels",
        "tonextstep-digital-marketplace",
      ],
    },
    {
      title: "Performance & SEO",
      icon: <Rocket className="w-6 h-6" />,
      benefit: "Fast pages that pass Core Web Vitals and rank on Google.",
      skills: [
        "Core Web Vitals",
        "Lighthouse / PageSpeed",
        "Technical SEO",
        "Accessibility",
        "Image optimization",
      ],
      projects: [
        "landing-page",
        "al-amal-furniture-moving-kuwait",
        "akirastore",
      ],
    },
    {
      title: "Workflow & delivery",
      icon: <GitBranch className="w-6 h-6" />,
      benefit: "Clean Git history, previews and a hand-off you can maintain.",
      skills: [
        "Git & GitHub",
        "Vite",
        "Cloudflare",
        "Figma",
        "Chrome DevTools",
        "VS Code",
      ],
      projects: ["kosovo-travels", "landing-page", "rich-black-theme"],
    },
  ],
};

/*
=======================================
=========> { services data } <=========
=======================================
*/

import {
  Code2 as CodeIcon,
  ShoppingBag,
  RefreshCw,
  Zap,
  Search,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

export interface ServiceData {
  icon: React.ReactNode;
  title: string;
  /** Short client-facing promise */
  description: string;
  /** Who this is for */
  idealFor: string;
  deliverables: string[];
}

export const serviceData: ServiceData[] = [
  {
    icon: <CodeIcon className="w-8 h-8" />,
    title: "Business Websites with Next.js",
    description:
      "A fast, modern website that ranks on Google and makes it easy for visitors to call, WhatsApp or book you.",
    idealFor: "Companies, clinics, agencies and local service businesses",
    deliverables: [
      "Custom design or pixel-perfect Figma to code",
      "Arabic (RTL) and English support",
      "On-page SEO, sitemap and structured data",
      "Contact forms, WhatsApp and analytics set up",
    ],
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "Online Stores (Next.js & Salla)",
    description:
      "Stores that look premium and sell: custom Next.js e-commerce, or Salla theme customization for Saudi and Gulf merchants.",
    idealFor: "Brands selling physical or digital products",
    deliverables: [
      "Salla (Raed / Twilight) theme customization",
      "Custom Next.js storefronts, cart and checkout",
      "Payment gateway integration",
      "Product catalog import and cleanup",
    ],
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "WordPress to Next.js Migration",
    description:
      "Move a slow or broken WordPress site to Next.js without losing the Google rankings you already earned.",
    idealFor: "Sites with traffic, articles and existing rankings",
    deliverables: [
      "Full URL inventory and 1:1 URL preservation",
      "Content migration with metadata intact",
      "Redirect map only where it's unavoidable",
      "Post-launch Search Console monitoring",
    ],
  },
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: "Web Apps & Dashboards",
    description:
      "Admin panels, customer dashboards and SaaS front-ends built with React, Next.js and TypeScript.",
    idealFor: "Startups and teams that need a reliable front-end",
    deliverables: [
      "Authentication and user roles",
      "API / Supabase / database integration",
      "Data tables, charts and forms",
      "Type-safe, documented code you own",
    ],
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Speed & Core Web Vitals",
    description:
      "Make an existing React / Next.js site load fast — better rankings, lower bounce rate, more conversions.",
    idealFor: "Sites that feel slow or fail Core Web Vitals",
    deliverables: [
      "Lighthouse and Core Web Vitals audit",
      "Image, font and bundle optimization",
      "Code splitting and lazy loading",
      "Before / after performance report",
    ],
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Technical SEO for React Sites",
    description:
      "Fix what stops Google from understanding your site: metadata, canonicals, structured data, sitemaps and indexing.",
    idealFor: "React / Next.js sites that don't show up on Google",
    deliverables: [
      "Metadata and canonical URLs for every page",
      "Schema.org structured data",
      "Sitemap, robots and Search Console setup",
      "Arabic and English SEO",
    ],
  },
];

/*
=======================================
=========> { process data } <==========
=======================================
*/

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processData: ProcessStep[] = [
  {
    step: "01",
    title: "Free discovery call",
    description:
      "We talk about your business, goals and budget. You get honest advice — even if that means a simpler solution.",
  },
  {
    step: "02",
    title: "Clear proposal",
    description:
      "A fixed scope, timeline and price in writing, so you know exactly what you get before we start.",
  },
  {
    step: "03",
    title: "Design & build",
    description:
      "You see progress on a live preview link every week and give feedback as we go — no surprises at the end.",
  },
  {
    step: "04",
    title: "Launch & support",
    description:
      "I launch, connect analytics and Search Console, hand over everything you own, and stay available for support.",
  },
];

/*
=======================================
=========> { FAQ data } <===============
=======================================
*/

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: "How much does a website cost?",
    answer:
      "It depends on the scope. A landing page or small business site costs far less than a custom store or web app. After a short call I send a fixed price in writing, so there are no surprises.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A landing page usually takes 1–2 weeks, a business website 2–4 weeks, and a store or web app 4–8 weeks, depending on content and feedback speed.",
  },
  {
    question: "Do you build Arabic (RTL) websites?",
    answer:
      "Yes. I build Arabic-first and bilingual Arabic/English websites and stores, including Salla themes, with proper RTL layout and Arabic SEO.",
  },
  {
    question:
      "Can you move my WordPress site to Next.js without losing my Google rankings?",
    answer:
      "Yes. I keep your existing URLs, titles and content, redirect only what must change, and monitor Search Console after launch. I did exactly this for a Kuwaiti company with 182 indexed Arabic pages.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer:
      "Every site ships with clean metadata, canonical URLs, structured data, a sitemap, fast Core Web Vitals and Search Console set up — the technical foundations Google needs.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Every project includes a support period after launch, and I offer ongoing maintenance for updates, new features and performance checks.",
  },
];

/*
==========================================
=========> { testimonial data } <=========
==========================================
*/

export interface TestimonialData {
  name: string;
  rating: number;
  /** Month the review was left, e.g. "Sep 2026" */
  date: string;
  /** The Khamsat service the review was left on (English) */
  service: string;
  /** Original review text, exactly as the client wrote it (Arabic) */
  original: string;
  /** Faithful English translation of `original` */
  translation: string;
}

/** Public profile where every review below can be verified */
export const reviewSource = {
  name: "Khamsat",
  url: "https://khamsat.com/user/amrelshabrawydev/reviews",
  rating: 5.0,
  count: 7,
  completion: "100%",
};

const bugFixing = "Fixing React, JavaScript, CSS & HTML bugs";

/**
 * Real client reviews from Khamsat (Arabic), shown with an English translation.
 * Only detailed reviews are listed; one-word ones are left out.
 */
export const testimonialData: TestimonialData[] = [
  {
    name: "Verified buyer",
    rating: 5,
    date: "Sep 2026",
    service: bugFixing,
    original:
      "أنصح بشدة التعامل مع الأستاذ عمرو الشبراوى شخص محترف جداً، سريع في الإنجاز، وخدوم لأبعد الحدود، كما أنه يتميز بسعة صدره وتفهمه الكامل للمتطلبات وتعديلات الـ CSS بدقة عالية. شكراً جزيلاً لك على هذه الخدمة الممتازة وليعاملات أخرى قادمة بإذن الله.",
    translation:
      "I highly recommend working with Amr Elshabrawy. He's very professional, fast to deliver and goes out of his way to help. He's patient, fully understood the requirements and made the CSS changes with great precision. Thank you so much for the excellent service — here's to more work together, God willing.",
  },
  {
    name: "Bahaeddin A.",
    rating: 5,
    date: "Jun 2026",
    service: bugFixing,
    original:
      "مهندس محترم وفاهم شغله مزبوط ما بتعب معه ابدا بس خبره بالمشكلة وهو بلاقي الحل وفي مشاكل هو بلاقيها اثناء الفحص وبحلها",
    translation:
      "A respectful engineer who really knows his craft. Working with him is effortless — just tell him the problem and he finds the solution. He even finds other issues while investigating, and fixes them.",
  },
  {
    name: "Solafh A.",
    rating: 5,
    date: "Jul 2026",
    service: bugFixing,
    original:
      "انسان محترم ومهندس شاطر كل الشكر لك وتمنياتي لك بكل التوفيق ماقصر ابداً أنجز عمله بكل دقه انصح بالتعامل معه",
    translation:
      "A respectful person and a skilled engineer. Many thanks and best wishes — he went above and beyond and did his work with great precision. I recommend working with him.",
  },
  {
    name: "Mohanad A.",
    rating: 5,
    date: "Aug 2026",
    service: bugFixing,
    original:
      "عمر شخص محترف وذوق جدا ومتعاون ويعمل بكل حب أشكره على جهوده بإذن الله سيكون لنا تعامل اخر",
    translation:
      "Amr is professional, very courteous and cooperative, and clearly enjoys his work. Thank you for your effort — God willing, we'll work together again.",
  },
  {
    name: "Ahmed A.",
    rating: 5,
    date: "Jun 2026",
    service: bugFixing,
    original: "التعامل راق و خلاق عاليه يقدم الخدمة باحترافية تجربة ممتازة",
    translation:
      "Classy to deal with and has great manners. He delivers the service professionally — an excellent experience.",
  },
];

/*
===============================================
=========> { contact & social data } <=========
===============================================
*/

export interface SocialLink {
  platform: string;
  icon: React.ReactNode;
  url: string;
  username: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    icon: <Github className="w-5 h-5" />,
    url: "https://github.com/AmrElshabrawyDev",
    username: "@AmrElshabrawyDev",
  },
  {
    platform: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    url: "https://linkedin.com/in/amr-elshabrawy-dev",
    username: "amr-elshabrawy-dev",
  },
  {
    platform: "WhatsApp",
    icon: <MessageCircle className="w-5 h-5" />,
    url: "https://wa.me/201202546653",
    username: "+20 120 254 6653",
  },
  {
    platform: "Email",
    icon: <Mail className="w-5 h-5" />,
    url: "mailto:amrelshabrawy.dev@gmail.com",
    username: "amrelshabrawy.dev@gmail.com",
  },
  {
    platform: "Resume",
    icon: <FileText className="w-5 h-5" />,
    url: "/AmrElshabrawy-FrontendDeveloper_React_NEXTJS-Resume.pdf",
    username: "Download CV",
  },
];

/*
===============================================
=========> { stats & achievements } <=========
===============================================
*/

export interface StatData {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export const statsData: StatData[] = [
  {
    label: "Years Experience",
    value: "5+",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    label: "Projects Completed",
    value: "50+",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    label: "Happy Clients",
    value: "30+",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    label: "Code Commits",
    value: "2000+",
    icon: <GitBranch className="w-6 h-6" />,
  },
];
