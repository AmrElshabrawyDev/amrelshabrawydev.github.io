"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Clock,
  Code2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/components/Layout/PageTransition";
import { formatDate, generateSlug } from "@/lib/utils";
import type { Project } from "@/types/github";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className="glass-card overflow-hidden hover:border-border-default transition-all group relative h-full flex flex-col"
      whileHover={{ y: -4 }}
    >
      {/* Card Link Overlay - Covers entire card apart from buttons */}
      <Link
        href={`/work/${generateSlug(project.title)}`}
        className="absolute inset-0 z-0"
        aria-label={`View details for ${project.title}`}
      />

      {/* Project Image */}
      <div className="relative w-full h-48 bg-bg-elevated overflow-hidden shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKp79S29wAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-base/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative z-10 pointer-events-none">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-text-tertiary shrink-0 ml-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary mb-4 line-clamp-2 min-h-12">
          {project.description}
        </p>

        {/* Languages Chart */}
        {project.languages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm text-text-tertiary">Languages</span>
            </div>
            <div className="flex gap-1 h-2 rounded-full overflow-hidden">
              {project.languages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.languages.slice(0, 3).map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 text-xs text-text-tertiary"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span>
                    {lang.name} ({lang.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary-500/10 text-primary-400"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer Buttons - Separated from Link Overlay */}
      <div className="px-6 pb-6 mt-auto relative z-20 flex items-center justify-between pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-1 text-sm text-text-tertiary">
          <Clock className="w-3 h-3" />
          <span>{formatDate(project.updatedAt)}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>
          {project.liveUrl && (
            <Button size="sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
