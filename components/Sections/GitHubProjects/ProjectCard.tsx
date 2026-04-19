"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ExternalLink, Github, FileText, ChevronDown } from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { Project } from "@/types/github";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { generateSlug } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface ProjectCardProps {
  project: Project;
  isLast?: boolean;
}

export function ProjectCard({ project, isLast = false }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: contentRef });

  const slug = generateSlug(project.title);

  const pseudoHash = project.id
    .toString(16)
    .padEnd(7, "0")
    .toUpperCase()
    .substring(0, 7);
  const updatedDate = new Date(project.updatedAt).toISOString().split("T")[0];

  const statusColor =
    project.stars >= 10
      ? "bg-success text-bg-base"
      : project.stars >= 5
        ? "bg-warning text-bg-base"
        : "bg-info text-bg-base";

  const toggleOpen = () => {
    contextSafe(() => {
      const isOpening = !isOpen;
      setIsOpen(isOpening);

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          height: isOpening ? "auto" : 0,
          opacity: isOpening ? 1 : 0,
          duration: 0.5,
          ease: "power3.inOut",
          onStart: () => {
            if (isOpening) contentRef.current!.style.display = "block";
          },
          onComplete: () => {
            if (!isOpening) contentRef.current!.style.display = "none";
          },
        });
      }
    })();
  };

  return (
    <div
      className={`grid grid-cols-[16px_1fr] md:grid-cols-[20px_1fr] flex-1 gap-3 md:gap-5 relative group w-full ${jetbrainsMono.className}`}
    >
      {/* Spine Column (Slimmer) */}
      <div className="flex flex-col items-center relative z-10 pt-2">
        <div
          className={`w-2.5 h-2.5 rounded-full border-2 border-bg-base ring-1 ring-border-subtle transition-transform duration-300 ${statusColor.split(" ")[0]} group-hover:scale-125 group-hover:ring-primary/50`}
        />
        {!isLast && (
          <div className="w-px h-full bg-border-white/10 mt-2 group-hover:bg-primary/20 transition-colors" />
        )}
      </div>

      {/* Content Column */}
      <div className="pb-10 text-left">
        <button
          onClick={toggleOpen}
          className="w-full text-left group/btn focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 rounded-xs"
        >
          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-[10px] tracking-widest text-text-tertiary mb-2 uppercase opacity-80 group-hover/btn:opacity-100 transition-opacity">
            <span className="font-bold text-text-secondary">
              COMMIT {pseudoHash}
            </span>
            <span className="w-1 h-1 rounded-full bg-border-strong" />
            <span>{updatedDate}</span>
            <div className="ml-auto flex items-center gap-2">
              <span
                className={`px-1.5 py-0.5 rounded-xs text-[9px] font-bold ${statusColor}`}
              >
                ★ {project.stars}
              </span>
            </div>
          </div>

          {/* Project Title & Status Indicators */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2
              className={`${spaceGrotesk.className} text-xl md:text-2xl tracking-tighter text-text-primary group-hover/btn:text-secondary transition-colors duration-300`}
            >
              {project.title}
            </h2>
            <ChevronDown
              className={`w-4 h-4 text-text-tertiary transition-transform duration-500 ${isOpen ? "rotate-180 text-secondary" : ""}`}
            />
          </div>

          {/* Tech Stack Powerline (Refined) */}
          <div className="mb-4 pointer-events-none flex flex-wrap gap-y-1">
            <PowerlineGroup className="gap-0 scale-85 origin-left opacity-80 group-hover/btn:opacity-100 transition-opacity">
              {project.technologies.slice(0, 3).map((tech, i) => {
                const colors: (
                  | "surface"
                  | "primary"
                  | "secondary"
                  | "info"
                  | "warning"
                )[] = ["surface", "primary", "secondary", "info", "warning"];
                return (
                  <PowerlineSegment
                    key={tech}
                    color={colors[i % colors.length]}
                    showArrow={true}
                    direction="both"
                    className="h-6! text-[11px]! px-2! mx-4"
                  >
                    {tech.toUpperCase()}
                  </PowerlineSegment>
                );
              })}
            </PowerlineGroup>
          </div>
        </button>

        {/* Expandable Content Block (GSAP Controlled) */}
        <div
          ref={contentRef}
          className="overflow-hidden opacity-0"
          style={{ height: 0, display: "none" }}
        >
          <div className="mt-4 bg-bg-elevated/40 backdrop-blur-xs border border-border-subtle/50 flex flex-col gap-4 p-4 sm:p-5 text-sm rounded-xs">
            {/* OG Image / Visual Context */}
            {project.image && (
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                containerClassName="w-full border border-border-subtle/30 bg-black/20 mb-2 rounded-xs"
              />
            )}

            {/* Diff Content */}
            <div className="flex-1">
              <div className="text-secondary/70 mb-3 font-bold text-[10px] font-mono tracking-widest uppercase italic">
                {">"} repository_overview.txt
              </div>

              <div className="flex flex-col gap-2 tracking-wide text-text-secondary whitespace-pre-wrap leading-relaxed font-mono text-xs">
                <div className="flex">
                  <span className="text-success mr-2 select-none">+</span>
                  <p className="flex-1 text-text-secondary/90 leading-relaxed italic">
                    {project.description}
                  </p>
                </div>
                <div className="flex opacity-60">
                  <span className="text-text-tertiary mr-2 select-none">#</span>
                  <span>Primary language: {project.language}</span>
                </div>
              </div>

              {/* External Links */}
              <div className="mt-6 pt-5 border-t border-border-subtle/30 flex flex-wrap gap-3">
                <Link
                  href={`/work/${slug}`}
                  className="flex items-center gap-2 text-[10px] font-bold text-bg-base bg-primary hover:bg-secondary transition-all duration-300 px-3 py-1.5 uppercase tracking-wider rounded-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  READ_MORE
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-bold text-text-secondary hover:text-primary transition-colors border border-border-default hover:border-primary/50 px-3 py-1.5 bg-bg-base/30 uppercase tracking-wider rounded-xs"
                  >
                    <Github className="w-3.5 h-3.5" />
                    SOURCE
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-bold text-text-secondary hover:text-success transition-colors border border-border-default hover:border-success/50 px-3 py-1.5 bg-bg-base/30 uppercase tracking-wider rounded-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    LIVE
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
