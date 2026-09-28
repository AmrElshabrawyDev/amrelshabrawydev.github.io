import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL, SITE_NAME, SOCIAL, absoluteUrl } from "@/lib/site";
import { caseStudies } from "@/data/projects";
import type { FaqItem } from "@/data";

// ====================================
// 📄 Page-Specific Metadata
// Titles target what clients search for; each page has its own canonical.
// ====================================

export const homeMetadata: Metadata = buildMetadata({
  title: "Freelance React & Next.js Developer | Amr Elshabrawy",
  absoluteTitle: true,
  description:
    "Freelance React & Next.js developer in Egypt: fast, SEO-ready websites, online stores (Next.js & Salla) and web apps in Arabic & English. Free consultation.",
  path: "/",
  imageAlt: "Amr Elshabrawy — Freelance React & Next.js Developer",
});

export const aboutMetadata: Metadata = buildMetadata({
  title: "About — Front-End Developer in Cairo, Egypt",
  description:
    "Amr Elshabrawy, freelance front-end developer in Cairo with 4+ years building React & Next.js websites, stores and apps for clients in Egypt, the Gulf and beyond.",
  path: "/about",
  image: "/og-about.png",
});

export const servicesMetadata: Metadata = buildMetadata({
  title: "Next.js Website & Online Store Services",
  description:
    "Next.js business websites, Next.js & Salla stores, WordPress migration, dashboards, speed and technical SEO. Fixed quotes, Arabic & English.",
  path: "/services",
  image: "/og-services.png",
});

export const workMetadata: Metadata = buildMetadata({
  title: "Case Studies — Next.js & Salla Projects",
  description:
    "Case studies with real screenshots and PageSpeed scores: a travel booking platform, a Kuwait moving website, a digital marketplace, a Salla store and more.",
  path: "/work",
  image: "/og-work.png",
});

export const contactMetadata: Metadata = buildMetadata({
  title: "Hire a Next.js Developer — Get a Free Quote",
  description:
    "Tell me about your website, store or web app. I reply within 24 hours with honest advice and a fixed quote. WhatsApp, email or the contact form.",
  path: "/contact",
  image: "/og-contact.png",
});

export const blogMetadata: Metadata = buildMetadata({
  title: "Blog — Next.js, SEO & Web Dev Guides",
  description:
    "Practical guides for business owners and developers: Next.js website costs, WordPress to Next.js migration, Salla stores, speed and SEO.",
  path: "/blog",
});

// ====================================
// 🔍 JSON-LD Structured Data
// ====================================

const PERSON_ID = `${SITE_URL}/#person`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl("/profile.webp"),
  jobTitle: "Freelance React & Next.js Developer",
  description:
    "Freelance front-end developer specializing in React, Next.js and TypeScript — websites, online stores and web apps in Arabic and English.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  email: `mailto:${SOCIAL.email}`,
  sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.x],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Salla theme development",
    "Technical SEO",
    "Core Web Vitals",
    "WordPress to Next.js migration",
  ],
  knowsLanguage: ["en", "ar"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${SITE_NAME} — Freelance React & Next.js Developer`,
  publisher: { "@id": PERSON_ID },
  inLanguage: "en",
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: `${SITE_NAME} — Web Development Services`,
  image: absoluteUrl("/og-image.png"),
  url: absoluteUrl("/services"),
  email: SOCIAL.email,
  founder: { "@id": PERSON_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  areaServed: ["EG", "SA", "AE", "KW", "QA", "Worldwide"],
  availableLanguage: ["English", "Arabic"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web development services",
    itemListElement: [
      "Next.js business website development",
      "Next.js and Salla online store development",
      "WordPress to Next.js migration",
      "Web apps and dashboards",
      "Website speed optimization",
      "Technical SEO for React sites",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web development case studies by Amr Elshabrawy",
  numberOfItems: caseStudies.length,
  itemListElement: caseStudies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/work/${study.slug}`),
    name: study.title,
  })),
};

export const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
