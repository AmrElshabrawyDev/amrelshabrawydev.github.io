# 📄 Product Requirements Document (PRD)

## 🧱 Project Title: Dark Space-Inspired Personal Portfolio

### 🪐 1. Executive Summary

The Dark Space-Inspired Portfolio is a fully immersive, space-themed personal website designed for Amr Elshabrawy, a Front-End Developer specialized in React.js and Next.js.
The site delivers a unique, interactive, and static no-scroll experience, with smooth "sliding door" transitions powered by Framer Motion — merging minimalism with cosmic aesthetics.

### 🎯 2. Objective

To design and develop a personal portfolio that:

Reflects a dark cosmic identity with elegance and clarity.

Presents Amr’s skills, services, and projects through visually engaging full-screen layouts.

Demonstrates mastery of Next.js, TypeScript, Tailwind CSS, and Framer Motion.

Functions as a high-performance, SEO-optimized, and responsive showcase for professional growth and recruitment.

### 🛠️ 3. Technical Overview

Category Technology
Framework Next.js 16 (App Router)
Language TypeScript
Styling Tailwind CSS
Animation Framer Motion
Assets Custom SVGs, Pharaonic icons, dark space-inspired fonts
API Integration EmailJS (for contact form)
Version Control Git & GitHub
Hosting Vercel / Netlify (TBD)

**Dependencies:**

next@16.0.10

framer-motion@latest

tailwindcss@latest

emailjs-com@latest

### 🎨 4. Design System & Theme

**Theme:**

Space-inspired design — dark, minimal, elegant.

Focus on contrast and visual depth using stars, stones, and cosmic gradients.

**Color Palette:**

#0A0A0A – Deep Black

#14213D – Dark Blue

#FCA311 – Gold Accent

#E5E5E5 – Silver

#FFFFFF – Light Accent Text

**Typography:**

Font: "Orbitron", sans-serif (primary)

Backup: "Poppins", sans-serif

**UI Elements:**

Buttons: Meteor-inspired glow effects

Cursor: Custom space-themed cursor

Components: Animated door transitions, floating elements, glow borders

Layout: No vertical scrolling (except About and Projects)

### 🧩 5. Functional Requirements

**🏠 Home Page**

Full-screen hero with animated space icon (SVG).

Welcome text: “Welcome” or “Start the Journey.”

Button “Enter the Site” triggers door transition to About page.

Subtle motion effects (fade-in + scale-up).

**👨‍🚀 About Page**

Full-screen layout with Amr’s photo, short biography, and list of core skills.

Skills displayed as animated stars or orbit icons.

Partial scroll enabled for text reveal.

**💼 Portfolio Page**

Projects displayed in a 3x2 grid layout using Framer Motion for hover and click.

On hover: project info overlay.

On click: open modal or horizontal door animation showing details.

Each card links to GitHub repositories (CRUD Operations, Todo List, Travel Smart UI).

**🛠️ Services Page**

Each service card displayed as a “stone” with gold border.

Space-inspired icons and subtle glow on hover.

Motion stagger effect when loading cards.

**🪐 Contact Page**

Contact form designed as a spaceship control panel.

Input fields shaped like clouds.

Submit button styled as a spaceship launch animation.

Integration with EmailJS API.

Success/error messages with fade transitions.

Alternative contact links via space-themed social icons (GitHub, LinkedIn, Email).

### 🔁 6. Navigation & Transitions

Fixed navigation bar or space-icon-based floating menu.

Navigation triggers Framer Motion door animation:

Two panels slide inward to close → page change → open outward.

Smooth horizontal transitions (no scroll).

Animated page load and exit.

Custom sound effects (optional future feature).

### ⚙️ 7. Non-Functional Requirements

**Performance:** Optimized for Core Web Vitals and Lighthouse >90.

**SEO:** Meta tags, Open Graph data, clean URLs, sitemap.

**Accessibility:** ARIA labels, keyboard navigation, color contrast compliance.

**Responsiveness:** Fully adaptable to desktop, tablet, and mobile.

**Security:** Input validation, XSS protection, safe API handling.

**Maintainability:** Modular components, reusable motion utilities, documented props.

### 🚀 8. Future Enhancements

Loading screen animations.

Language switcher (English ↔ Arabic with RTL support).

Accessibility improvements (tab navigation, ARIA).

CMS integration (for easy content updates).

Sound effects or ambient background audio.

### 📚 9. Documentation & Deliverables

**Required Files:**

README.md – Project overview, setup, tech stack.

Component documentation (Storybook or equivalent).

STYLEGUIDE.md – Color, font, spacing, and motion standards.

Testing guidelines (unit, integration).

Performance and accessibility checklist.

SEO optimization guide.

Deployment and CI/CD instructions.

Version control and commit strategy.

License (MIT preferred).

Support and maintenance schedule.

### ✅ 10. Deliverables & Milestones

- Phase Deliverable Tools / Notes
- Phase 1 UI Design & Wireframes Figma / Adobe XD
- Phase 2 Front-End Development Next.js + Tailwind + Framer Motion
- Phase 3 Content Integration GitHub Repos + Bio + Services
- Phase 4 Testing & SEO Optimization Lighthouse + Jest
- Phase 5 Deployment Vercel / Netlify
- Phase 6 Documentation README + Style Guide + Storybook

### 🧠 Summary

This PRD defines the roadmap for a dark space-themed portfolio that merges visual storytelling, smooth motion design, and modern Next.js architecture. The final product will serve as a showcase of Amr Elshabrawy’s technical and creative identity — elegant, responsive, and uniquely cinematic.
