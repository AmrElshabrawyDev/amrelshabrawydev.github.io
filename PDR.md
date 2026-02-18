# 📋 Product Requirements Document (PRD)

## Project: Professional Portfolio — "Amr Elshabrawy"

**Version:** 2.0 (Professional Edition)  
**Last Updated:** January 2026  
**Status:** Ready for Development

---

## 🎯 1. Project Overview

### Objective

Create a high-performance, professional portfolio website that showcases Amr Elshabrawy's front-end development expertise and attracts potential clients and employers.

### Target Audience

- **Primary:** Hiring managers, recruiters, and tech leads
- **Secondary:** Freelance clients, fellow developers, industry peers

### Success Criteria

1. Portfolio generates at least 5 quality job/client inquiries per month
2. Lighthouse performance score of 90+ across all pages
3. Average session duration of 2+ minutes
4. Mobile traffic comprises 40%+ of total visits

---

## 🎨 2. Design System

### Brand Identity

**Personality:** Professional, Modern, Confident, Technical  
**Voice:** Direct, knowledgeable, approachable (not corporate-stiff)

### Visual Language

**Style:** Clean minimalism with subtle depth and motion  
**Reference Sites:**

- [Linear](https://linear.app) — Clean UI, smooth animations
- [Vercel](https://vercel.com) — Professional gradients, clear hierarchy
- [Josh Comeau](https://joshwcomeau.com) — Playful yet professional

### Color Palette

#### Primary Colors

```css
/* Background Layers */
--bg-base: #0a0e27; /* Deepest layer */
--bg-elevated: #111827; /* Cards on base */
--bg-overlay: #1f2937; /* Modals, dropdowns */

/* Brand Colors */
--primary-500: #3b82f6; /* Main blue */
--primary-400: #60a5fa; /* Lighter blue (hover) */
--primary-600: #2563eb; /* Darker blue (active) */

--accent-500: #8b5cf6; /* Purple accent */
--accent-400: #a78bfa; /* Light purple */
--accent-600: #7c3aed; /* Dark purple */

/* Semantic Colors */
--success: #10b981; /* Green (CTAs, success states) */
--warning: #f59e0b; /* Orange (alerts) */
--error: #ef4444; /* Red (errors) */
--info: #06b6d4; /* Cyan (info badges) */

/* Text Colors */
--text-primary: #e0e7ff; /* Headings, important text */
--text-secondary: #94a3b8; /* Body text */
--text-tertiary: #64748b; /* Muted text, labels */
--text-disabled: #475569; /* Disabled elements */

/* Borders & Dividers */
--border-subtle: rgba(59, 130, 246, 0.1);
--border-default: rgba(59, 130, 246, 0.2);
--border-strong: rgba(59, 130, 246, 0.4);
```

#### Gradients

```css
/* Primary gradient (CTAs) */
--gradient-primary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);

/* Mesh background */
--gradient-mesh:
  radial-gradient(at 27% 37%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
  radial-gradient(at 97% 21%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
```

### Typography

#### Font Families

```typescript
// In layout.tsx using next/font
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
```

#### Type Scale

```css
/* Headings */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */
--text-6xl: 3.75rem; /* 60px */
--text-7xl: 4.5rem; /* 72px */
```

### Spacing System

```css
/* Based on 4px grid */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-24: 6rem; /* 96px */
```

### Effects & Shadows

#### Glass Effect

```css
.glass-card {
  background: rgba(31, 41, 55, 0.6);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(59, 130, 246, 0.1);
}
```

#### Glow Effects

```css
/* Subtle glow for cards */
.glow-subtle {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
}

/* Strong glow for CTAs */
.glow-strong {
  box-shadow:
    0 0 20px rgba(59, 130, 246, 0.4),
    0 0 40px rgba(139, 92, 246, 0.2);
}

/* Hover glow */
.glow-hover {
  transition: box-shadow 0.3s ease;
}
.glow-hover:hover {
  box-shadow:
    0 0 30px rgba(59, 130, 246, 0.5),
    0 0 60px rgba(139, 92, 246, 0.3);
}
```

---

## 📐 3. Layout & Structure

### Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px; /* Small tablets */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Laptops */
--breakpoint-xl: 1280px; /* Desktops */
--breakpoint-2xl: 1536px; /* Large displays */
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

### Grid System

- **Desktop:** 12-column grid with 24px gutters
- **Tablet:** 8-column grid with 16px gutters
- **Mobile:** 4-column grid with 16px gutters

---

## 🏗 4. Page Structure & Features

### Global Components

#### Navigation

```
Position: Sticky top
Height: 80px (desktop) / 64px (mobile)
Background: backdrop-blur with subtle border-bottom

Items:
- Logo (left)
- Nav links (center)
- Download CV button (right)

Mobile: Hamburger menu with slide-in overlay
```

#### Footer

```
Layout: 3 columns (desktop) / stacked (mobile)

Sections:
1. Quick links (Home, About, Services, Work, Contact)
2. Social links (GitHub, LinkedIn, Email)
3. Copyright & attribution

Background: --bg-elevated
Padding: 64px vertical
```

---

### 1. Home Page (/)

#### Hero Section

```html
<section class="min-h-screen flex items-center">
  <div class="max-w-4xl mx-auto text-center">
    <!-- Greeting -->
    <p class="text-accent text-sm mb-4">Hi, I'm</p>

    <!-- Name -->
    <h1 class="text-6xl font-bold mb-4">Amr Elshabrawy</h1>

    <!-- Animated role -->
    <TypeAnimation
      words={["React Specialist", "Next.js Developer", "UI Engineer"]}
      className="text-2xl text-secondary mb-6"
    />

    <!-- Description -->
    <p class="text-lg text-secondary max-w-2xl mx-auto mb-8">
      I turn ideas into production-ready applications.
      Focused on clean code, smooth animations, and pixel-perfect implementations.
    </p>

    <!-- CTAs -->
    <div class="flex gap-4 justify-center">
      <Button variant="primary">View My Work</Button>
      <Button variant="outline">Get In Touch</Button>
    </div>
  </div>
</section>
```

**Background:**

- Gradient mesh (subtle, slow animation)
- Grid pattern overlay (faint dots)
- NO particles or stars

**Scroll Indicator:**

- Animated chevron at bottom
- Fades out on scroll

---

### 2. About Page (/about)

#### Bento Grid Layout

```
Desktop (2x3 grid):
┌──────────────┬──────┐
│              │  S1  │
│    Hero      ├──────┤
│   (2 cols)   │  S2  │
│              ├──────┤
│              │  S3  │
├──────┬───────┼──────┤
│  S4  │  S5   │  S6  │
└──────┴───────┴──────┘

Mobile: Stack vertically
```

**Grid Items:**

1. **Hero Card (span-2):** Bio, stats (years, projects, clients)
2. **Skill Category Cards (6 items):** Each with icon, title, skills list, proficiency badge

**Interaction:**

- Hover: Card lifts (translateY: -4px), border glows
- Click: Optional modal with detailed info

#### Stats Display

```tsx
<div class="grid grid-cols-2 gap-4">
  <Stat icon={<Code2 />} value="5+" label="Years Experience" />
  <Stat icon={<Rocket />} value="50+" label="Projects Completed" />
  <Stat icon={<Sparkles />} value="30+" label="Happy Clients" />
  <Stat icon={<GitBranch />} value="2000+" label="Code Commits" />
</div>
```

---

### 3. Services Page (/services)

#### Layout

```
Desktop: 2-column grid
Mobile: 1-column stack

Each card includes:
- Icon (lucide-react)
- Title
- Description
- Deliverables list (checkmarks)
```

**Card Hover Effect:**

```css
.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px) rotateX(2deg);
  border-image: linear-gradient(135deg, #3b82f6, #8b5cf6) 1;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
}

.service-card:hover .icon {
  transform: scale(1.1);
  color: var(--primary-400);
}
```

---

### 4. Portfolio Page (/work)

#### Project Grid

```
Desktop: 2-3 columns (masonry layout)
Tablet: 2 columns
Mobile: 1 column
```

**Project Card Structure:**

```html
<article class="project-card">
  <!-- Thumbnail -->
  <image src="{thumbnail}" alt="{title}" />

  <!-- Overlay (shows on hover) -->
  <div class="overlay">
    <h3>{title}</h3>
    <p class="text-sm">{description}</p>

    <!-- Tech stack pills -->
    <div class="flex flex-wrap gap-2">
      <Badge>React</Badge>
      <Badge>Next.js</Badge>
      <Badge>TypeScript</Badge>
    </div>

    <!-- Performance badge -->
    <div class="flex items-center gap-2">
      <Zap size="{16}" />
      <span>Lighthouse: 95</span>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 mt-4">
      <button size="sm" href="{liveUrl}">Live Demo</button>
      <button size="sm" variant="outline" href="{githubUrl}">
        <Github size="{16}" /> GitHub
      </button>
    </div>
  </div>
</article>
```

**Modal (on click):**

- Full project details
- Multiple screenshots/GIFs
- Features list
- Challenges & solutions section
- Tech stack with logos
- Performance metrics

---

### 5. Contact Page (/contact)

#### Form Design

```html
<form class="max-w-2xl mx-auto">
  <!-- Floating label inputs -->
  <FloatingInput label="Your Name" name="name" required />

  <FloatingInput label="Email Address" name="email" type="email" required />

  <FloatingTextarea label="Your Message" name="message" rows="{6}" required />

  <!-- Submit button -->
  <button type="submit" variant="primary" fullWidth>Send Message</button>
</form>
```

**Input Styling:**

```css
.floating-input {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--border-default);
  transition: border-color 0.3s;
}

.floating-input:focus {
  border-bottom-color: var(--primary-500);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.floating-label {
  transition: all 0.3s;
  color: var(--text-tertiary);
}

.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  transform: translateY(-24px) scale(0.875);
  color: var(--primary-500);
}
```

**Success State:**

```tsx
// After submission
<SuccessMessage>
  <Confetti /> {/* react-confetti library */}
  <CheckCircle className="text-success" size={48} />
  <h3>Message Sent! 🎉</h3>
  <p>I'll get back to you within 24 hours.</p>
</SuccessMessage>
```

#### Contact Methods

```tsx
// Display alongside form
<div class="grid gap-4">
  <ContactMethod
    icon={<Mail />}
    label="Email"
    value="amrelshabrawy.dev@gmail.com"
    href="mailto:amrelshabrawy.dev@gmail.com"
  />

  <ContactMethod
    icon={<Linkedin />}
    label="LinkedIn"
    value="amr-elshabrawy"
    href="https://linkedin.com/in/amr-elshabrawy"
  />

  <ContactMethod
    icon={<Github />}
    label="GitHub"
    value="@Amr-Elshabrawy-Dev"
    href="https://github.com/Amr-Elshabrawy-Dev"
  />
</div>
```

---

## 🎭 5. Animations & Interactions

### Animation Principles

1. **Purposeful:** Every animation should have a reason (feedback, delight, clarity)
2. **Fast:** Keep animations under 400ms (300ms ideal)
3. **Natural:** Use easing functions (ease-out for enter, ease-in for exit)
4. **Respectful:** Check `prefers-reduced-motion` media query

### Page Transitions

```typescript
// Simple fade + slide
const pageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
```

### Scroll Animations

```typescript
// Fade in elements as they enter viewport
const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Use with Intersection Observer
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInVariants}
>
  {children}
</motion.div>
```

### Micro-interactions

#### Buttons

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click me
</motion.button>
```

#### Cards

```typescript
<motion.div
  whileHover={{
    y: -4,
    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
  }}
  transition={{ duration: 0.3 }}
>
  Card content
</motion.div>
```

#### Icons

```typescript
<motion.div
  whileHover={{
    rotate: 360,
    scale: 1.1
  }}
  transition={{ duration: 0.6 }}
>
  <Icon />
</motion.div>
```

---

## 📱 6. Responsive Behavior

### Mobile-First Approach

- Design for 375px first (iPhone SE)
- Progressive enhancement for larger screens
- Touch targets minimum 44x44px

### Key Responsive Changes

#### Navigation

- Desktop: Horizontal menu
- Mobile: Hamburger → Slide-in overlay

#### Bento Grid

- Desktop: 2-3 column layouts
- Tablet: 2 columns
- Mobile: Single column stack

#### Typography

```css
/* Responsive font sizes */
h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
}

h2 {
  font-size: clamp(2rem, 4vw, 3rem);
}

p {
  font-size: clamp(1rem, 2vw, 1.125rem);
}
```

---

## ⚡ 7. Performance Requirements

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimization Strategies

#### Images

```tsx
// Use next/image with priority for hero
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // for above-the-fold
  placeholder="blur"
  blurDataURL={blurData}
/>
```

#### Code Splitting

```tsx
// Lazy load heavy components
const ProjectModal = dynamic(() => import("@/components/ProjectModal"), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

#### Fonts

```tsx
// Preload fonts, use variable fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
```

---

## 🔒 8. SEO & Metadata

### Meta Tags (per page)

```tsx
export const metadata: Metadata = {
  title: "Amr Elshabrawy | Front-End Developer",
  description:
    "Professional front-end developer specializing in React, Next.js, and TypeScript. Building fast, accessible web applications.",
  keywords: ["Front-End Developer", "React Developer", "Next.js", "TypeScript"],
  openGraph: {
    title: "Amr Elshabrawy | Front-End Developer",
    description: "Building fast, accessible web applications",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amr Elshabrawy | Front-End Developer",
    description: "Building fast, accessible web applications",
    images: ["/og-image.jpg"],
  },
};
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Amr Elshabrawy",
  "url": "https://amrelshabrawy.dev",
  "jobTitle": "Front-End Developer",
  "description": "Professional front-end developer...",
  "sameAs": [
    "https://github.com/Amr-Elshabrawy-Dev",
    "https://linkedin.com/in/amr-elshabrawy"
  ]
}
```

---

## ✅ 9. Accessibility Requirements

### WCAG 2.1 AA Compliance

- [ ] Color contrast ratio minimum 4.5:1 for normal text
- [ ] Color contrast ratio minimum 3:1 for large text
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible (outline or glow)
- [ ] Alt text for all images
- [ ] ARIA labels for icon-only buttons
- [ ] Form labels properly associated
- [ ] Skip to main content link

### Keyboard Navigation

```tsx
// Trap focus in modals
<FocusTrap>
  <Modal>
    {/* content */}
  </Modal>
</FocusTrap>

// Custom focus styles
.focus-visible:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

---

## 🚀 10. Deployment & Analytics

### Hosting

- **Platform:** Vercel (automatic deployments from GitHub)
- **Domain:** Custom domain with SSL
- **CDN:** Cloudflare for static assets

### Analytics

```tsx
// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Monitoring

- **Performance:** Vercel Speed Insights
- **Errors:** Sentry for error tracking
- **Uptime:** UptimeRobot

---

## 📋 11. Development Checklist

### Phase 1: Setup (Week 1)

- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up Framer Motion
- [ ] Import fonts (Space Grotesk, Inter)
- [ ] Create folder structure
- [ ] Set up ESLint + Prettier

### Phase 2: Core Components (Week 2)

- [ ] GlassCard component
- [ ] Button component (variants)
- [ ] Input/Textarea with floating labels
- [ ] Badge component
- [ ] Navigation component
- [ ] Footer component

### Phase 3: Pages (Week 3-4)

- [ ] Home page with hero
- [ ] About page with Bento grid
- [ ] Services page
- [ ] Portfolio page with grid
- [ ] Contact page with form

### Phase 4: Animations (Week 5)

- [ ] Page transitions
- [ ] Scroll animations
- [ ] Hover effects
- [ ] Loading states

### Phase 5: Optimization (Week 6)

- [ ] Image optimization
- [ ] Code splitting
- [ ] SEO metadata
- [ ] Accessibility audit
- [ ] Performance testing

### Phase 6: Deployment (Week 7)

- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Final testing
- [ ] Launch! 🚀

---

## 🎯 Success Metrics (Post-Launch)

### Traffic Goals (3 months)

- 500+ unique visitors/month
- 40%+ mobile traffic
- Average session duration: 2+ minutes
- Bounce rate: < 50%

### Engagement

- 5+ contact form submissions/month
- 10+ project views/week
- 20+ social profile clicks/month

### Performance

- Lighthouse scores: 90+ across all categories
- Page load time: < 2s on 3G
- Zero accessibility errors

---

This PRD is your blueprint. Build it well, and opportunities will follow. 🚀
