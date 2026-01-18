---
trigger: always_on
glob:
description:
---

# 🧱 Local Antigravity Rules File

**Project:** Dark Space-Inspired Personal Portfolio  
**Author:** Amr Elshabrawy

---

## 🪐 Overview

This workspace hosts the **Dark Space-Inspired Personal Portfolio**, a static, full-screen Next.js website built to reflect a dark cosmic identity through smooth **Framer Motion** animations and a no-scroll layout.

The purpose of this rules file is to define how the **AI Agent** behaves within this workspace — ensuring code quality, design consistency, and adherence to Amr’s creative vision.

---

## ⚙️ Build & Framework Rules

1. **Framework:** Next.js 16 (App Router).
2. **Language:** TypeScript (strict mode enabled).
3. **Styling:** Tailwind CSS — all layout, color, and spacing must use utility classes.
4. **Animations:** Framer Motion (no GSAP or CSS transitions).
5. **Data Source:**
   - `/data/index.tsx` is the **single source of truth** for all content.
   - No hardcoded text inside React components.
6. **Assets:** Custom SVGs and icons stored under `/public/assets/`.
7. **Fonts:** `"Orbitron"` (primary) and `"Poppins"` (secondary) — preload both.
8. **Deployment:** Must build cleanly on **Vercel** without warnings.

---

## 🧩 Component & Code Structure

1. Pages (`Home`, `About`, `Services`, `Portfolio`, `Contact`) → Server Components in `/app/`.
2. Reusable UI parts (Hero, NavBar, Buttons, Footer) → `/components/`.
3. Shared animations → `/lib/motion/`.
4. Global constants (colors, easing, delays) → `/lib/config/`.
5. All components must be **typed** using interfaces from `/data/index.tsx`.
6. Naming conventions:
   - Components → `PascalCase.tsx`
   - Data/utils → `camelCase.ts`
   - Config/style → `kebab-case.ts`

---

## 🎨 Design & Theming

**Theme:** “Dark Cosmic” — minimal, elegant, and visually deep.

| Element           | Value     |
| ----------------- | --------- |
| Black             | `#0A0A0A` |
| Dark Blue         | `#14213D` |
| Gold Accent       | `#FCA311` |
| Silver Text       | `#E5E5E5` |
| Light Accent Text | `#FFFFFF` |

- Font Family: `"Orbitron", sans-serif` (primary), `"Poppins", sans-serif` (backup).
- Buttons: meteor-inspired glow on hover.
- Cursor: custom space-themed trail cursor.
- Icons: only **SVGs** or **React Icons** consistent with the dark theme.
- No bright or saturated colors. Maintain deep contrast harmony.

---

## 🔁 Navigation & Animation

1. **No vertical scrolling** (except About and Portfolio).
2. All route transitions must use **Framer Motion door animation**:
   - Two panels slide inward to close → route change → slide outward to open.
3. Entry animation: fade-in or zoom-in on each page load.
4. Use staggered animations for sections.
5. Default animation timing: `easeInOut`, `0.8s`.
6. Only Framer Motion handles transitions — no CSS-based motion.

---

## 🧠 Data & Content Management

1. All text, links, and metadata must come from `/data/index.tsx`.
2. No inline content or static strings in components.
3. `personalInfo` and `heroData` define global identity and hero text.
4. `serviceData`, `workSlides`, and `testimonialData` map dynamically to UI.
5. `socialLinks` provide all contact and external profiles.

---

## 🧩 Testing & Optimization

1. **Testing Framework:** Jest + React Testing Library.
2. **Performance:** Lighthouse score ≥ 90.
3. Use `next/image` for all images.
4. Lazy-load offscreen images.
5. Preload fonts and optimize SVGs.
6. Add `alt` text for every image and ARIA labels for all buttons/links.
7. WCAG 2.1 AA accessibility compliance required.

---

## 🧠 SEO & Metadata

1. Use **Next.js Metadata API** for page titles and meta descriptions.
2. Include **Open Graph** tags for portfolio and project previews.
3. Add `robots.txt` and `sitemap.xml`.
4. Dynamic meta descriptions should come from `/data/index.tsx`.
5. Include developer **JSON-LD structured data**.

---

## 🚫 Restrictions

- ❌ No `useEffect` for animations — Framer Motion variants only.
- ❌ No CSS files — Tailwind utilities exclusively.
- ❌ No additional animation or UI libraries.
- ❌ No hardcoded routes or inline links.
- ❌ Do not edit `/data/index.tsx` structure (content only).

---

## 🧰 Tooling & Workflow

- **Formatter:** Prettier
- **Linter:** ESLint (Next.js preset)
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, etc.)
- **Branching Strategy:**
  - `main` → Production
  - `dev` → Development
  - `feat/*` → Feature branches
- **CI/CD:** Must include lint + build validation before merging PRs.

---

## 🧾 Documentation

Store all documentation in the `/docs` folder:

- `README.md` → Setup, run, and deploy guide.
- `PRD.md` → Full product requirements.
- `STYLEGUIDE.md` → Colors, typography, and spacing.
- `AI_RULES.md` → AI behavior and coding guidelines.
- `Local_Antigravity_Rules.md` → This file.

All documents must remain up-to-date with the project’s current structure.

---

## ✅ Summary

These rules define how AI agents and contributors operate within this workspace.  
All generated code, design components, and animations must align with the **Dark Space Portfolio vision** — cinematic, high-performance, minimalist, and immersive.

Adherence to these rules ensures the resulting product embodies Amr Elshabrawy’s professional identity with cosmic precision ✨

---
