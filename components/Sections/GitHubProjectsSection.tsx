"use client";

import React from "react";
import { Github, Code } from "lucide-react";
import type { Project } from "@/types/github";
import { ProjectCard } from "./GitHubProjects/ProjectCard";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";

interface GitHubProjectsSectionProps {
  projects: Project[];
}

export function GitHubProjectsSection({
  projects,
}: GitHubProjectsSectionProps) {
  if (projects.length === 0) {
    return (
      <section className="py-24 bg-bg-base relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <div className="terminal-card p-12 max-w-2xl mx-auto">
            <div className="terminal-header flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-accent" />
                <div className="w-2.5 h-2.5 bg-warning" />
              </div>
              <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-widest">error_log_0x404</span>
            </div>
            <Github className="w-20 h-20 mx-auto mb-8 text-secondary animate-pulse" />
            <h2 className="text-4xl font-black mb-4 font-heading text-secondary uppercase tracking-tighter">No Projects Found</h2>
            <p className="text-text-secondary text-lg font-mono">
              {">"} SYSTEM ERROR: ACCESS DENIED OR REPO EMPTY.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center lg:items-start gap-8 animate-fade-in-left opacity-0">
          <PowerlineGroup>
            <PowerlineSegment color="secondary" icon={<Code className="w-5 h-5" />}>
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 flex justify-center animate-fade-in-up [animation-delay:400ms] opacity-0">
          <a
            href={`https://github.com/AmrElshabrawyDev`}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <PowerlineGroup>
              <PowerlineSegment color="secondary" className="h-14 px-8 text-lg" icon={<Github className="w-6 h-6" />}>
                VIEW_ALL_REPOS
              </PowerlineSegment>
              <PowerlineSegment color="surface" showArrow={false} className="h-14 px-6 text-xs text-text-tertiary">
                SOURCE_CODE.sh
              </PowerlineSegment>
            </PowerlineGroup>
          </a>
        </div>
      </div>
    </section>
  );
}
