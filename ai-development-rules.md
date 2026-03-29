# 🎯 AI Development Rules - Professional Portfolio

**Project:** Amr Elshabrawy - Professional Front-End Developer Portfolio  
**Author:** Amr Elshabrawy  
**Version:** 2.1 (Professional Edition - GSAP Enabled)  

---

## 🌟 Project Vision

This workspace hosts a **modern, high-performance portfolio** for Amr Elshabrawy, a professional Front-End Developer. The goal is **"Professional, Fast, and Memorable"** — not flashy, but polished.

**Design Philosophy:**

- Modern Tech Minimalism with subtle depth
- Clean, confident, and production-ready
- Inspired by: Linear.app, Vercel, Stripe (NOT sci-fi games)

---

## ⚙️ Build & Framework Rules

### Core Stack

1. **Framework:** Next.js 14+ (App Router)
2. **Language:** TypeScript (strict mode enabled)
3. **Styling:** Tailwind CSS v4 — utility-first approach
4. **UI Components:** shadcn/ui for accessible, pre-built components
5. **Animations:** GSAP (purposeful, not excessive)
6. **Icons:** Lucide React (consistent, modern icons)

### Data Management
- `/data/index.tsx` is the **single source of truth** for all content
- No hardcoded text inside React components
- All metadata comes from `/lib/metadata.ts`

---

## 🚫 Restrictions & Don'ts

### Animation Restrictions

- ✅ **DO** use `GSAP` and `@gsap/react` (`useGSAP`) for all animations.
- ❌ NO `framer-motion` (must be completely uninstalled).
- ❌ NO CSS transitions/animations — GSAP only
- ❌ NO particle systems, starfields, or heavy canvas animations
- ❌ NO spinning icons (scale/fade only)
- ❌ NO "Airlock" or complex page transitions

### Code Restrictions

- ❌ NO custom CSS files — Tailwind utilities only
- ❌ NO `any` types in TypeScript
- ❌ NO inline styles (except dynamic values)
- ❌ NO hardcoded text — must come from `/data/index.tsx`
- ❌ NO additional animation libraries (Framer Motion, anime.js, etc.)

---

## 🎯 AI Agent Behavior Guidelines

### When Generating Code

**DO:**
- ✅ Use TypeScript with proper types
- ✅ Use GSAP for all animations rather than Framer Motion
- ✅ Optimize for performance and GSAP context cleanup

**DON'T:**
- ❌ Re-introduce framer-motion
- ❌ Create overly complex animations
- ❌ Sacrifice performance for visuals
