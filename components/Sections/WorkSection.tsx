"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Zap } from "lucide-react";
import { projectsData } from "@/data";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/components/Layout/PageTransition";

export function WorkSection() {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            My <span className="gradient-text">Work</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A selection of projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project, index) => (
            <motion.div key={project.title} variants={fadeInUp} custom={index}>
              <GlassCard
                variant="hover"
                className="overflow-hidden h-full flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-bg-base/95 via-bg-base/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-text-primary text-sm line-clamp-2">
                      {project.longDescription}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-bg-base/50 text-text-tertiary border border-border-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Performance Badge */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Zap className="w-4 h-4 text-warning" />
                    <span className="text-text-secondary">
                      Lighthouse: {project.performance.lighthouse}
                    </span>
                    <span className="text-text-tertiary">•</span>
                    <span className="text-text-tertiary">
                      {project.performance.loadTime}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <Button asChild size="sm" className="flex-1">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
