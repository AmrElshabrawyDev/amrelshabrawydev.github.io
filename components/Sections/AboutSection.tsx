"use client";

import React from "react";
import Image from "next/image";
import { aboutData, statsData } from "@/data";
import { Terminal } from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";

const proficiencyColors = {
  expert: "primary",
  advanced: "secondary",
  learning: "accent",
} as const;

export function AboutSection() {
  return (
    <section className="py-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex justify-center lg:justify-start animate-fade-in-left opacity-0">
          <PowerlineGroup>
            <PowerlineSegment
              color="primary"
              icon={<Terminal className="w-5 h-5" />}
            >
              ABOUT_IDENTITY.MD
            </PowerlineSegment>
            <PowerlineSegment color="surface" showArrow={false}>
              READ_ONLY
            </PowerlineSegment>
          </PowerlineGroup>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Bio Card */}
          <div className="md:col-span-2 lg:col-span-2 terminal-card group animate-fade-in-up [animation-delay:100ms] opacity-0">
            <div className="terminal-header flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-primary" />
                <div className="w-2.5 h-2.5 bg-secondary" />
                <div className="w-2.5 h-2.5 bg-accent" />
              </div>
              <span className="text-[10px] text-text-tertiary uppercase font-mono tracking-widest">
                bio_processor.sh
              </span>
            </div>

            <div className="p-8 lg:p-10 space-y-8">
              <h3 className="text-3xl md:text-4xl font-black font-heading text-primary uppercase">
                {">"} IDENTITY_SECURED
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg font-mono border-l-4 border-primary pl-6 py-4 bg-primary/5">
                {aboutData.bio}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {statsData.map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-border-subtle p-4 bg-bg-elevated hover:border-primary transition-colors"
                  >
                    <div className="text-2xl font-black font-heading text-primary">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-text-tertiary uppercase tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Visual Card */}
          <div className="terminal-card overflow-hidden relative min-h-[400px] animate-fade-in-up [animation-delay:200ms] opacity-0">
            <div className="terminal-header flex items-center justify-between absolute top-0 left-0 right-0 z-20">
              <span className="text-[10px] text-text-primary px-2 font-mono uppercase bg-primary/20">
                VISUAL_INDEX_01
              </span>
            </div>
            <Image
              src="/profile-about.png"
              alt="Profile"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 contrast-125"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Skill Cards */}
          {aboutData.skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="terminal-card group flex flex-col animate-fade-in-up opacity-0"
              style={{ animationDelay: `${(idx + 3) * 100}ms` }}
            >
              <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-primary">{category.icon}</div>
                  <span className="text-[10px] text-text-primary font-mono font-bold uppercase tracking-widest">
                    {category.title.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-bg-base border border-border-subtle px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-text-secondary hover:text-primary hover:border-primary transition-colors cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-bg-base/40 border-t border-border-subtle mt-auto">
                <PowerlineGroup>
                  <PowerlineSegment
                    color={proficiencyColors[category.proficiency]}
                    className="h-6 text-[10px] px-3"
                  >
                    {category.proficiency.toUpperCase()}
                  </PowerlineSegment>
                  <PowerlineSegment
                    color="surface"
                    className="h-6 text-[10px] px-3"
                    showArrow={false}
                  >
                    STRENGTH_OK
                  </PowerlineSegment>
                </PowerlineGroup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
