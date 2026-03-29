"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, Code } from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { generateSlug } from "@/lib/utils";
import type { Project } from "@/types/github";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const slug = generateSlug(project.title);

  return (
    <article
      className="terminal-card group flex flex-col h-full bg-bg-elevated transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-accent" />
          <div className="w-2.5 h-2.5 bg-warning" />
        </div>
        <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-widest">
          {project.title.toLowerCase().replace(/ /g, "_")}.sh
        </span>
      </div>

      {/* Project Image */}
      <Link
        href={`/work/${slug}`}
        className="relative w-full h-48 bg-black overflow-hidden border-b border-border-subtle group-hover:border-primary transition-colors"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-6">
        <div>
          <h3 className="text-2xl font-black font-heading text-text-primary uppercase mb-2 group-hover:text-primary transition-colors">
            {"> "} {project.title}
          </h3>
          <p className="text-text-secondary text-sm font-mono line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Stats & Languages Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-secondary">
              <Star className="w-3.5 h-3.5" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center gap-1.5 text-accent">
              <Code className="w-3.5 h-3.5" />
              <span>{project.languages[0]?.name.toUpperCase() || "SOURCE"}</span>
            </div>
          </div>
        </div>

        {/* Tech Segments */}
        <div className="mt-auto">
          <PowerlineGroup>
            {project.technologies.slice(0, 3).map((tech) => (
              <PowerlineSegment key={tech} color="surface" className="h-6 text-[10px] px-3">
                {tech.toUpperCase()}
              </PowerlineSegment>
            ))}
          </PowerlineGroup>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-bg-base/40 border-t border-border-subtle flex items-center justify-end gap-2">
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 border border-border-subtle hover:border-primary hover:text-primary transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-primary text-bg-base hover:brightness-110 transition-all font-bold"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </article>
  );
}
