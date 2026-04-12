"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, FileText } from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { Project } from "@/types/github";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { generateSlug } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface ProjectCardProps {
  project: Project;
  isLast?: boolean;
  index?: number;
}

export function ProjectCard({ project, isLast = false }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false); // Start collapsed for better grid experience

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

  return (
    <div
      className={`grid grid-cols-[24px_1fr] flex-1 gap-4 relative group w-full ${jetbrainsMono.className}`}
    >
      {/* Spine Column (Refined) */}
      <div className="flex flex-col items-center relative z-10 pt-1.5">
        <div
          className={`w-3 h-3 rounded-full border-2 border-bg-base ring-1 ring-border-subtle transition-transform duration-300 ${statusColor.split(" ")[0]} group-hover:scale-125 group-hover:ring-primary`}
        />
        {!isLast && (
          <div className="w-px h-full bg-border-subtle mt-2 opacity-30 group-hover:opacity-60 transition-opacity" />
        )}
      </div>

      {/* Content Column */}
      <div className="pb-8 text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
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

          {/* Project Title (Refined size for GRID) */}
          <h2
            className={`${spaceGrotesk.className} text-xl md:text-2xl tracking-tighter text-text-primary group-hover/btn:text-secondary transition-colors duration-300 mb-3`}
          >
            {project.title}
          </h2>

          {/* Tech Stack Powerline (More compact) */}
          <div className="mb-4 pointer-events-none flex flex-wrap gap-y-1">
            <PowerlineGroup className="gap-0 scale-75 origin-left">
              {project.technologies.slice(0, 4).map((tech, i) => {
                const isFinal =
                  i === project.technologies.slice(0, 4).length - 1;
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
                    direction={isFinal ? "right" : "both"}
                    className="h-6! text-[10px]! px-3!"
                  >
                    {tech.toUpperCase()}
                  </PowerlineSegment>
                );
              })}
            </PowerlineGroup>
          </div>
        </button>

        {/* Expandable Diff Block */}
        <div
          className={`overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="bg-bg-elevated/50 backdrop-blur-xs border border-border-subtle flex flex-col gap-4 p-4 sm:p-5 text-sm rounded-sm">
            {/* OG Image / Visual Context (Mobile First) */}
            {project.image && (
              <div className="w-full relative border border-border-subtle overflow-hidden bg-black/20 aspect-video md:aspect-auto md:h-32 mb-2">
                <div className="absolute top-0 right-0 z-20 px-2 py-0.5 text-[8px] bg-border-strong/50 text-white font-bold opacity-80 backdrop-blur-md rounded-bl-sm pointer-events-none uppercase tracking-tighter">
                  cached_buffer
                </div>
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-40 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              </div>
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
