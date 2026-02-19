"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/components/Layout/PageTransition";
import type { Project } from "@/types/github";
import { ProjectCard } from "./GitHubProjects/ProjectCard";
import { ProjectSkeleton } from "./GitHubProjects/ProjectSkeleton";

// ====================================
// 🎨 Component
// ====================================

export function GitHubProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/github-projects");

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch projects");
      }

      const { projects } = await response.json();
      setProjects(projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // ====================================
  // 🎬 Loading State
  // ====================================

  if (loading) {
    return (
      <section className="section-spacing bg-bg-base">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Loading Projects from GitHub...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ====================================
  // ❌ Error State
  // ====================================

  if (error) {
    return (
      <section className="section-spacing bg-bg-base">
        <div className="container-custom text-center">
          <div className="glass-card p-12 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-error">
              Oops! Something went wrong
            </h2>
            <p className="text-text-secondary mb-8 text-lg">{error}</p>
            <Button onClick={fetchProjects} size="lg">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

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
