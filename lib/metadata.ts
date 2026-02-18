import type { Metadata } from "next";

// ====================================
// 📄 Page-Specific Metadata
// ====================================

// Home Page
export const homeMetadata: Metadata = {
  title: "Professional Front-End Developer",
  description:
    "Welcome to my portfolio. I'm Amr Elshabrawy, a Front-End Developer from Egypt specializing in React, Next.js, and TypeScript. Building modern web applications with 5+ years of experience.",
  openGraph: {
    title: "Amr Elshabrawy | Professional Front-End Developer",
    description:
      "Front-End Developer specializing in React, Next.js, and TypeScript. 5+ years of experience building fast, accessible web applications.",
    url: "https://amrelshabrawydev.github.io",
    images: [
      {
        url: "https://amrelshabrawydev.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amr Elshabrawy Portfolio Homepage",
      },
    ],
  },
};

// About Page
export const aboutMetadata: Metadata = {
  title: "About Me - Skills & Experience",
  description:
    "Learn more about Amr Elshabrawy, a Front-End Developer with expertise in React, Next.js, TypeScript, and modern web technologies. 5+ years of experience, 50+ projects completed.",
  openGraph: {
    title: "About Amr Elshabrawy | Skills & Experience",
    description:
      "Front-End Developer with 5+ years of experience. Expert in React, Next.js, TypeScript, Tailwind CSS, and web performance optimization.",
    url: "https://amrelshabrawydev.github.io/about",
    images: [
      {
        url: "https://amrelshabrawydev.github.io/og-about.png",
        width: 1200,
        height: 630,
        alt: "About Amr Elshabrawy - Skills and Experience",
      },
    ],
  },
};

// Services Page
export const servicesMetadata: Metadata = {
  title: "Services - Web Development & UI/UX Implementation",
  description:
    "Professional front-end development services: React/Next.js development, UI/UX implementation, responsive design, performance optimization, SEO, and code refactoring. Get high-quality web solutions.",
  keywords: [
    "Front-End Development Services",
    "React Development",
    "Next.js Development",
    "UI/UX Implementation",
    "Web Performance Optimization",
    "SEO Services",
    "Responsive Web Design",
    "Code Refactoring",
    "Freelance Web Developer",
  ],
  openGraph: {
    title: "Services | Front-End Development & Web Solutions",
    description:
      "Offering professional web development services: React/Next.js apps, UI/UX implementation, performance optimization, and more.",
    url: "https://amrelshabrawydev.github.io/services",
    images: [
      {
        url: "https://amrelshabrawydev.github.io/og-services.png",
        width: 1200,
        height: 630,
        alt: "Front-End Development Services",
      },
    ],
  },
};

// Portfolio/Work Page
export const workMetadata: Metadata = {
  title: "Portfolio - Web Development Projects & Case Studies",
  description:
    "Explore my portfolio of web development projects: React applications, Next.js websites, and interactive UI/UX implementations. View live demos, GitHub repositories, and performance metrics.",
  keywords: [
    "Web Development Portfolio",
    "React Projects",
    "Next.js Portfolio",
    "Frontend Projects",
    "Web Design Portfolio",
    "UI/UX Portfolio",
    "JavaScript Projects",
  ],
  openGraph: {
    title: "Portfolio | Web Development Projects by Amr Elshabrawy",
    description:
      "Browse through my portfolio of professional web development projects featuring React, Next.js, and modern frontend technologies.",
    url: "https://amrelshabrawydev.github.io/work",
    images: [
      {
        url: "https://amrelshabrawydev.github.io/og-work.png",
        width: 1200,
        height: 630,
        alt: "Web Development Portfolio Projects",
      },
    ],
  },
};

// Contact Page
export const contactMetadata: Metadata = {
  title: "Contact Me - Let's Work Together",
  description:
    "Get in touch with Amr Elshabrawy for web development projects, freelance opportunities, or collaboration. Available for React, Next.js, and frontend development work.",
  keywords: [
    "Contact Web Developer",
    "Hire Front-End Developer",
    "Freelance React Developer",
    "Web Development Contact",
    "Frontend Developer Egypt",
  ],
  openGraph: {
    title: "Contact Amr Elshabrawy | Front-End Developer",
    description:
      "Let's discuss your next web development project. Available for freelance work and collaboration.",
    url: "https://amrelshabrawydev.github.io/contact",
    images: [
      {
        url: "https://amrelshabrawydev.github.io/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact Amr Elshabrawy",
      },
    ],
  },
};

// ====================================
// 🔍 JSON-LD Structured Data
// ====================================

// Person Schema (for homepage)
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amr Elshabrawy",
  url: "https://amrelshabrawydev.github.io",
  image: "https://amrelshabrawydev.github.io/profile.png",
  jobTitle: "Front-End Developer",
  description:
    "Professional Front-End Developer specializing in React, Next.js, and TypeScript with 5+ years of experience.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "Egypt",
  },
  email: "amrelshabrawy.dev@gmail.com",
  sameAs: [
    "https://github.com/Amr-Elshabrawy-Dev",
    "https://linkedin.com/in/amr-elshabrawy",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Web Development",
    "Frontend Development",
    "UI/UX Implementation",
    "Web Performance",
  ],
};

// Professional Service Schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amr Elshabrawy - Front-End Development Services",
  image: "https://amrelshabrawydev.github.io/og-image.png",
  url: "https://amrelshabrawydev.github.io",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "Egypt",
  },
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
  serviceType: [
    "Front-End Development",
    "React Development",
    "Next.js Development",
    "UI/UX Implementation",
    "Web Performance Optimization",
  ],
};

// Portfolio Schema
export const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Development Portfolio",
  description: "Portfolio of web development projects by Amr Elshabrawy",
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "CreativeWork",
      position: 1,
      name: "CRUD Operations Dashboard",
      description:
        "Full-featured data management application with real-time updates",
      url: "https://amrelshabrawydev.github.io/work/crud-operations",
      author: {
        "@type": "Person",
        name: "Amr Elshabrawy",
      },
      datePublished: "2024-01-15",
      keywords: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      "@type": "CreativeWork",
      position: 2,
      name: "Todo List Pro",
      description: "Task management app with drag-and-drop functionality",
      url: "https://amrelshabrawydev.github.io/work/todo-list",
      author: {
        "@type": "Person",
        name: "Amr Elshabrawy",
      },
      datePublished: "2024-03-20",
      keywords: ["React", "Framer Motion", "LocalStorage"],
    },
    {
      "@type": "CreativeWork",
      position: 3,
      name: "Travel Smart UI",
      description: "Modern travel website with stunning animations",
      url: "https://amrelshabrawydev.github.io/work/travel-smart",
      author: {
        "@type": "Person",
        name: "Amr Elshabrawy",
      },
      datePublished: "2024-05-10",
      keywords: ["Next.js 14", "Framer Motion", "TypeScript"],
    },
  ],
};

// ====================================
// 💡 Usage Instructions
// ====================================

/*
HOW TO USE IN YOUR PAGES:

1. Home Page (app/page.tsx):
   import { homeMetadata as metadata, personSchema } from '@/lib/metadata';
   export { metadata };

2. About Page (app/about/page.tsx):
   import { aboutMetadata as metadata } from '@/lib/metadata';
   export { metadata };

3. Services Page (app/services/page.tsx):
   import { servicesMetadata as metadata } from '@/lib/metadata';
   export { metadata };

4. Work Page (app/work/page.tsx):
   import { workMetadata as metadata } from '@/lib/metadata';
   export { metadata };

5. Contact Page (app/contact/page.tsx):
   import { contactMetadata as metadata } from '@/lib/metadata';
   export { metadata };

6. Add JSON-LD to Homepage (app/page.tsx):
   export default function HomePage() {
     return (
       <>
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
         />
         { Your page content }
       </>
     );
   }
*/
