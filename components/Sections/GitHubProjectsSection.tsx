"use client";

import React, { useRef } from "react";
import { Github, Code } from "lucide-react";
import type { Project } from "@/types/github";
import { ProjectCard } from "./GitHubProjects/ProjectCard";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { useMasonryGSAP } from "@/lib/hooks/useMasonryGSAP";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GitHubProjectsSectionProps {
  projects: Project[];
}

export function GitHubProjectsSection({
  projects,
}: GitHubProjectsSectionProps) {
  const container = useRef<HTMLDivElement>(null);
  const gridContainer = useRef<HTMLDivElement>(null);

  // Refined Section Entrance Reveal (Internal reveal to avoid masonry X/Y conflicts)
  useSectionReveal(container, ".gsap-reveal-inner", {
    stagger: { amount: 0.6 },
    y: 40,
    scale: 0.95,
    duration: 1,
  });

  // Masonry Layout Logic (Targeted to grid container to respect max-width)
  useMasonryGSAP(gridContainer, {
    selector: ".gsap-project-wrapper",
    gap: 48,
    columns: { mobile: 1, desktop: 2 },
  });

  // Header specific reveal (slightly faster and different direction)
  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-header-reveal",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%",
          },
        },
      );
    },
    { scope: container },
  );

  if (projects.length === 0) {
    return (
      <section className="py-24 bg-bg-base relative overflow-hidden font-mono">
        <div className="container-custom text-center relative z-10">
          <div className="terminal-card p-12 max-w-2xl mx-auto border border-border-subtle/30 bg-bg-elevated/10">
            <div className="terminal-header flex items-center justify-between mb-8 bg-bg-elevated/50 backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/40" />
              </div>
              <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-widest">
                error_log_0x404
              </span>
            </div>
            <Github className="w-20 h-20 mx-auto mb-8 text-secondary/50" />
            <h2 className="text-4xl font-black mb-4 font-heading text-secondary uppercase tracking-tighter">
              No Projects Found
            </h2>
            <p className="text-text-secondary text-lg">
              {">"} SYSTEM ERROR: ACCESS DENIED OR REPO EMPTY.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={container}
      className="py-24 bg-bg-base relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center lg:items-start gap-8 gsap-header-reveal opacity-0">
          <PowerlineGroup>
            <PowerlineSegment
              color="secondary"
              icon={<Code className="w-5 h-5" />}
            >
              PROJECT_REPOSITORY.LOG
            </PowerlineSegment>
            <PowerlineSegment color="surface" showArrow={false}>
              SOURCE: GITHUB_AUTH_SUCCESS
            </PowerlineSegment>
          </PowerlineGroup>

          <div className="text-text-secondary text-sm md:text-base font-mono leading-relaxed bg-secondary/5 border-l-4 border-secondary p-4 max-w-2xl">
            {">"} ACCESSING_REPOSITORY_DATA... <br />
            {">"} FILTERING_TOP_EXPERIENCES... <br />
            {">"} SUCCESS: {projects.length} PROJECTS_LOADED.
          </div>
        </div>

        {/* Git Log Grid (Masonry-style Absolute Layout) */}
        <div ref={gridContainer} className="relative w-full">
          {projects.map((project, idx) => (
            <div key={project.id} className="gsap-project-wrapper">
              <div className="gsap-reveal-inner opacity-0">
                <ProjectCard
                  project={project}
                  isLast={idx === projects.length - 1}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-20 flex justify-center gsap-project-wrapper">
          <a
            href={`https://github.com/AmrElshabrawyDev`}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <PowerlineGroup>
              <PowerlineSegment
                color="secondary"
                className="h-14! px-8! text-lg transition-transform group-hover:scale-105"
                icon={<Github className="w-6 h-6" />}
              >
                VIEW_ALL_REPOS
              </PowerlineSegment>
              <PowerlineSegment
                color="surface"
                showArrow={false}
                className="h-14! px-6! text-[10px] text-text-tertiary uppercase tracking-widest"
              >
                SOURCE_CODE.sh
              </PowerlineSegment>
            </PowerlineGroup>
          </a>
        </div>
      </div>
    </section>
  );
}
