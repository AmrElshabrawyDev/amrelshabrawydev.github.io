"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal, User, Code, Globe, Zap } from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { heroData, personalInfo } from "@/data";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center relative overflow-hidden bg-bg-base py-20">
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Terminal Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Powerline Identity Row */}
          <div className="mb-8 w-full flex justify-center lg:justify-start animate-fade-in-left [animation-delay:100ms] opacity-0">
            <PowerlineGroup>
              <PowerlineSegment color="primary" icon={<User className="w-4 h-4" />}>
                {personalInfo.name.toUpperCase()}
              </PowerlineSegment>
              <PowerlineSegment color="secondary" icon={<Code className="w-4 h-4" />}>
                {personalInfo.role.toUpperCase()}
              </PowerlineSegment>
            </PowerlineGroup>
          </div>

          {/* Large Hero Text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading mb-8 tracking-tighter leading-none text-text-primary animate-fade-in-up [animation-delay:200ms] opacity-0">
            ENGINEERING <br />
            <span className="text-secondary">DIGITAL</span> <br />
            EXPERIENCES
          </h1>

          {/* Powerline Roles Row */}
          <div className="mb-10 w-full flex justify-center lg:justify-start animate-fade-in-left [animation-delay:300ms] opacity-0">
            <PowerlineGroup>
              <PowerlineSegment color="info" icon={<Globe className="w-4 h-4" />}>
                EGYPT
              </PowerlineSegment>
              <PowerlineSegment color="success" icon={<Zap className="w-4 h-4" />}>
                {heroData.roles[0].toUpperCase()}
              </PowerlineSegment>
              <PowerlineSegment color="surface" showArrow={false}>
                v2.0.0
              </PowerlineSegment>
            </PowerlineGroup>
          </div>

          {/* Description Block */}
          <div className="text-text-secondary text-base md:text-lg max-w-xl mb-12 leading-relaxed font-mono border border-border-subtle p-6 bg-bg-elevated relative overflow-hidden animate-fade-in-up [animation-delay:400ms] opacity-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="flex items-center gap-2 mb-4 text-text-tertiary text-xs uppercase tracking-widest">
              <Terminal className="w-3 h-3" />
              <span>system_info.md</span>
            </div>
            {heroData.description}
          </div>

          {/* CTAs as Segments */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up [animation-delay:500ms] opacity-0">
            <Link href="/work" className="hover:no-underline">
              <PowerlineGroup>
                <PowerlineSegment color="primary" className="h-14 px-8 text-lg" icon={<ArrowRight className="w-5 h-5" />}>
                  {heroData.primaryCTA.toUpperCase()}
                </PowerlineSegment>
              </PowerlineGroup>
            </Link>

            <Link href="/contact" className="hover:no-underline">
              <PowerlineGroup>
                <PowerlineSegment color="surface" className="h-14 px-8 text-lg" showArrow={false}>
                  {heroData.secondaryCTA.toUpperCase()}
                </PowerlineSegment>
              </PowerlineGroup>
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Image Block */}
        <div className="relative flex justify-center items-center animate-fade-in [animation-delay:600ms] opacity-0">
          {/* Terminal Window Container */}
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] terminal-card overflow-hidden">
            {/* Window Controls */}
            <div className="terminal-header flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-accent" />
                <div className="w-3 h-3 bg-warning" />
                <div className="w-3 h-3 bg-success" />
              </div>
              <div className="text-[10px] text-text-tertiary font-mono tracking-tighter">
                PROFILE_VIEWER.SH — 80x24
              </div>
            </div>

            {/* Profile Image with Terminal Effect */}
            <div className="relative w-full h-full p-4">
              <div className="relative w-full h-full border border-border-subtle grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden group">
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent h-2 w-full animate-scanline z-10 pointer-events-none opacity-20" />
                
                <Image
                  src="/profile.png"
                  alt={personalInfo.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 300px, 450px"
                />
                
                {/* Terminal Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,17,27,0.2)_100%)]" />
              </div>
            </div>

            {/* Status Footer */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <PowerlineGroup>
                <PowerlineSegment color="secondary" className="h-8 text-[10px]">
                  OS: NEON_TERMINAL
                </PowerlineSegment>
                <PowerlineSegment color="surface" className="h-8 text-[10px]" showArrow={false}>
                  READY
                </PowerlineSegment>
              </PowerlineGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
