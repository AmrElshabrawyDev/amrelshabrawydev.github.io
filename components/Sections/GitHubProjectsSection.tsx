"use client";

import { motion } from "framer-motion";
import { Github, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/components/Layout/PageTransition";
import type { Project } from "@/types/github";
import { ProjectCard } from "./GitHubProjects/ProjectCard";

// ====================================
// 🎨 Component
// ====================================

interface GitHubProjectsSectionProps {
  projects: Project[];
}

export function GitHubProjectsSection({
  projects,
}: GitHubProjectsSectionProps) {
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
    <section className="section-spacing bg-bg-base">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center text-center mb-20"
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1 border-primary-500/30 bg-primary-500/5 text-primary-400 font-medium tracking-widest uppercase text-[10px] rounded-full"
          >
            <Code2 className="w-3 h-3 mr-2" />
            Open Source Work
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text tracking-tight">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-linear-to-r from-primary-500 to-accent-500 rounded-full mb-8 opacity-40 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            A curated selection of my latest work from GitHub, demonstrating my
            commitment to clean code, performance, and exceptional UI
            engineering.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View All on GitHub */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-12"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
