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
  role: "Front-End Developer",
  tagline: "Building fast, accessible web experiences",
  description:
    "Front-End Developer from Egypt with 5+ years crafting high-performance web applications. I specialize in React.js, Next.js, and TypeScript—turning complex requirements into clean, maintainable code. Currently expanding into full-stack with Node.js and Python.",
  location: "Cairo, Egypt",
  email: "amrelshabrawy.dev@gmail.com",
  github: "https://github.com/Amr-Elshabrawy-Dev",
  linkedin: "https://linkedin.com/in/amr-elshabrawy",
  resume: "/AmrElshabrawy-FrontendDeveloper_React_NEXTJS-Resume.pdf",
  availability: "Open to opportunities",
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
  greeting: "Hi, I'm",
  name: "Amr Elshabrawy",
  roles: [
    "React Specialist",
    "Next.js Developer",
    "UI Engineer",
    "Performance Optimizer",
  ],
  description:
    "I turn ideas into production-ready applications. Focused on clean code, smooth animations, and pixel-perfect implementations.",
  primaryCTA: "View My Work",
  secondaryCTA: "Get In Touch",
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
  Server,
  Github,
  Linkedin,
  Mail,
  FileText,
} from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  proficiency: "expert" | "advanced" | "learning";
}

export interface AboutData {
  bio: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  skillCategories: SkillCategory[];
}

export const aboutData: AboutData = {
  bio: "I'm passionate about creating web experiences that users love. Every project is an opportunity to write better code, learn new patterns, and push the boundaries of what's possible in the browser.",
  yearsOfExperience: 5,
  projectsCompleted: 50,
  skillCategories: [
    {
      title: "Frontend Development",
      icon: <Code2 className="w-6 h-6" />,
      skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)"],
      proficiency: "expert",
    },
    {
      title: "Styling & Animation",
      icon: <Palette className="w-6 h-6" />,
      skills: ["Tailwind CSS", "Framer Motion", "CSS3", "Responsive Design"],
      proficiency: "expert",
    },
    {
      title: "Tools & Workflow",
      icon: <GitBranch className="w-6 h-6" />,
      skills: ["Git", "GitHub", "VS Code", "Figma", "Chrome DevTools"],
      proficiency: "advanced",
    },
    {
      title: "Performance & SEO",
      icon: <Rocket className="w-6 h-6" />,
      skills: ["Web Vitals", "Lighthouse", "SEO Optimization", "Accessibility"],
      proficiency: "advanced",
    },
    {
      title: "Backend (Learning)",
      icon: <Server className="w-6 h-6" />,
      skills: ["Node.js", "Express", "REST APIs"],
      proficiency: "learning",
    },
    {
      title: "Database & PHP",
      icon: <Database className="w-6 h-6" />,
      skills: ["PHP", "Laravel", "MySQL"],
      proficiency: "learning",
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
  Sparkles,
  Layout,
  Zap,
  Search,
  Wrench,
} from "lucide-react";

export interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  deliverables: string[];
}

export const serviceData: ServiceData[] = [
  {
    icon: <CodeIcon className="w-8 h-8" />,
    title: "Frontend Development",
    description:
      "Building modern, scalable web applications with React, Next.js, and TypeScript.",
    deliverables: [
      "Component-based architecture",
      "State management (Context, Zustand)",
      "API integration",
      "Type-safe development",
    ],
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "UI/UX Implementation",
    description:
      "Transforming designs into interactive, accessible interfaces that users enjoy.",
    deliverables: [
      "Pixel-perfect Figma to code",
      "Smooth micro-interactions",
      "Accessibility (WCAG 2.1)",
      "Cross-browser compatibility",
    ],
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Responsive Design",
    description:
      "Crafting layouts that adapt beautifully across all devices and screen sizes.",
    deliverables: [
      "Mobile-first approach",
      "Tailwind CSS best practices",
      "Fluid typography & spacing",
      "Touch-friendly interactions",
    ],
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Optimization",
    description:
      "Making your site blazing fast with modern optimization techniques.",
    deliverables: [
      "Code splitting & lazy loading",
      "Image optimization",
      "Bundle size reduction",
      "90+ Lighthouse scores",
    ],
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "SEO & Analytics",
    description:
      "Implementing best practices to boost search rankings and track user behavior.",
    deliverables: [
      "Meta tags & Open Graph",
      "Structured data (Schema.org)",
      "Core Web Vitals optimization",
      "Analytics integration",
    ],
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Code Refactoring",
    description:
      "Improving existing codebases for better maintainability and performance.",
    deliverables: [
      "Clean code principles",
      "Component reusability",
      "Performance profiling",
      "Documentation",
    ],
  },
];

/*
===================================
=========> { work data } <=========
===================================
*/

export interface ProjectData {
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  tags: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  performance: {
    lighthouse: number;
    loadTime: string;
  };
  features: string[];
}

/*
==========================================
=========> { testimonial data } <=========
==========================================
*/

export interface TestimonialData {
  image: string;
  name: string;
  position: string;
  company: string;
  message: string;
  rating: number;
}

export const testimonialData: TestimonialData[] = [
  {
    image: "/t-avt-1.png",
    name: "Sarah Johnson",
    position: "UI/UX Designer",
    company: "Creative Studio",
    message:
      "Amr's ability to translate complex designs into pixel-perfect, performant code is exceptional. He understands both design intent and technical constraints.",
    rating: 5,
  },
  {
    image: "/t-avt-2.png",
    name: "Michael Roberts",
    position: "Tech Lead",
    company: "StartupXYZ",
    message:
      "Working with Amr was seamless. His code is clean, well-documented, and follows best practices. He delivered ahead of schedule with zero bugs.",
    rating: 5,
  },
  {
    image: "/t-avt-3.png",
    name: "Nora Ahmed",
    position: "Project Manager",
    company: "Digital Agency",
    message:
      "Reliable, professional, and always delivers quality work. Amr communicates clearly and consistently exceeds expectations.",
    rating: 5,
  },
];

/*
===============================================
=========> { contact & social data } <=========
===============================================
*/

export interface ContactData {
  header: {
    title: {
      first: string;
      highlight: string;
    };
    description: string;
    subDescription: string;
  };
  successMessage: {
    title: string;
    description: string;
    buttonText: string;
  };
  form: {
    labels: {
      name: string;
      email: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      message: string;
    };
    buttonText: {
      idle: string;
      loading: string;
    };
  };
}

export const contactData: ContactData = {
  header: {
    title: {
      first: "Get In",
      highlight: "Touch",
    },
    description: "Have a project in mind or want to collaborate? Let's talk!",
    subDescription:
      "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  },
  successMessage: {
    title: "Message Sent! 🎉",
    description:
      "Thanks for reaching out! I'll get back to you within 24 hours.",
    buttonText: "Send Another Message",
  },
  form: {
    labels: {
      name: "Your Name",
      email: "Email Address",
      message: "Your Message",
    },
    placeholders: {
      name: "John Doe",
      email: "john@example.com",
      message: "Tell me about your project...",
    },
    buttonText: {
      idle: "Send Message",
      loading: "Sending...",
    },
  },
};

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
    platform: "Email",
    icon: <Mail className="w-5 h-5" />,
    url: "mailto:amrelshabrawy.dev@gmail.com",
    username: "amrelshabrawy.dev@gmail.com",
  },
  {
    platform: "Resume",
    icon: <FileText className="w-5 h-5" />,
    url: "/amr-elshabrawy-resume.pdf",
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
