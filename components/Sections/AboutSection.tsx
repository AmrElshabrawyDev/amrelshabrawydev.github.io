"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { aboutData, statsData } from "@/data";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/components/Layout/PageTransition";

const proficiencyColors = {
  expert: "bg-success/20 text-success border-success/30",
  advanced: "bg-primary-500/20 text-primary-400 border-primary-500/30",
  learning: "bg-accent-500/20 text-accent-400 border-accent-500/30",
};

export function AboutSection() {
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
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Passionate about creating exceptional web experiences
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Main Bio Card - Full Width on LG */}
          <motion.div
            variants={fadeInUp}
            className="col-span-1 md:col-span-2 lg:col-span-3"
          >
            <GlassCard variant="hover" className="p-0 overflow-hidden h-full">
              <div className="grid lg:grid-cols-5 gap-0 h-full">
                {/* Text Content */}
                <div className="p-8 lg:p-10 lg:col-span-3 space-y-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-heading font-bold text-text-primary">
                      Hi, I&apos;m Amr! 👋
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-lg">
                      {aboutData.bio}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {statsData.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-3 rounded-xl bg-bg-base/30 border border-border-subtle"
                      >
                        <div className="flex justify-center mb-2 text-primary-400">
                          {stat.icon}
                        </div>
                        <div className="text-xl font-bold font-heading text-text-primary">
                          {stat.value}
                        </div>
                        <div className="text-xs text-text-tertiary mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Image - Right Side */}
                <div className="relative min-h-[300px] lg:h-full lg:col-span-2 overflow-hidden bg-bg-elevated/50">
                  <div className="absolute inset-0 bg-linear-to-t from-bg-base/80 to-transparent z-10 lg:bg-linear-to-l" />
                  <div className="absolute inset-0 bg-linear-to-tr from-primary-500/20 to-accent-500/20 mix-blend-overlay z-10" />

                  <Image
                    src="/profile-about.png"
                    alt="Amr Elshabrawy Profile"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-20 h-20 rounded-full bg-primary-500/30 blur-3xl" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Skill Category Cards */}
          {aboutData.skillCategories.map((category, index) => (
            <motion.div key={category.title} variants={fadeInUp} custom={index}>
              <GlassCard variant="hover" className="p-6 h-full flex flex-col">
                <div className="space-y-4 flex-1">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary-500/10 backdrop-blur-sm text-primary-400 ring-1 ring-primary-500/20">
                      {category.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-lg">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-bg-base/60 hover:bg-bg-base/80 border-border-default/50 text-text-secondary"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Proficiency Badge */}
                <div className="pt-6 mt-auto border-t border-border-subtle/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-tertiary">Proficiency</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${proficiencyColors[category.proficiency]}`}
                    >
                      {category.proficiency.charAt(0).toUpperCase() +
                        category.proficiency.slice(1)}
                    </span>
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
