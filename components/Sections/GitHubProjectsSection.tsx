"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/github";
import { ProjectCard } from "./GitHubProjects/ProjectCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ====================================
// 🎨 Component
// ====================================

interface GitHubProjectsSectionProps {
  projects: Project[];
}

export function GitHubProjectsSection({
  projects,
}: GitHubProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // Animate Header
    tl.fromTo(".gsap-header", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // Animate Line
    tl.fromTo(".gsap-line",
      { width: 0, opacity: 0 },
      { width: 80, opacity: 0.4, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Animate Description
    tl.fromTo(".gsap-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Animate Projects Grid
    tl.fromTo(".gsap-project-card",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "power2.out" 
      },
      "-=0.3"
    );

    // Animate CTA
    tl.fromTo(".gsap-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  // ====================================
  // 📭 Empty State
  // ====================================

  if (projects.length === 0) {
    return (
      <section className="section-spacing bg-bg-base">
        <div className="container-custom text-center">
          <div className="glass-card p-12 max-w-2xl mx-auto">
            <Github className="w-20 h-20 mx-auto mb-6 text-text-tertiary" />
            <h2 className="text-4xl font-bold mb-4">No Projects Found</h2>
            <p className="text-text-secondary text-lg">
              Check your GitHub username or repository settings.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ====================================
  // 🎨 Main Render
  // ====================================

  return (
    <section ref={containerRef} className="section-spacing bg-bg-base">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h1 className="gsap-header opacity-0 text-4xl md:text-5xl font-bold font-heading mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <div className="gsap-line opacity-0 h-1 w-20 bg-linear-to-r from-primary-500 to-accent-500 rounded-full mb-8 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <p className="gsap-desc opacity-0 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            A curated selection of my latest work from GitHub, demonstrating my
            commitment to clean code, performance, and exceptional UI
            engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All on GitHub */}
        <div className="gsap-cta opacity-0 text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <a
              href={`https://github.com/AmrElshabrawyDev`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
