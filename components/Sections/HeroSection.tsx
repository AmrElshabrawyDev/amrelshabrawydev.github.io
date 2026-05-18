"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Terminal,
  User,
  Code,
  Globe,
  Zap,
  Mail,
} from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { heroData, personalInfo } from "@/data";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  // Standardized Section Reveal
  useSectionReveal(container, ".gsap-reveal", {
    stagger: 0.1,
    y: 30,
    scale: 0.98,
    duration: 0.8,
  });

  // Specialized entrance for the profile visual
  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-reveal-fade",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.4,
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="container-custom min-h-[calc(100vh-8rem)] relative overflow-hidden bg-bg-base py-20 flex flex-col justify-center"
    >
      <div className="mb-10 w-full flex justify-start gsap-reveal opacity-0">
        <PowerlineGroup>
          <PowerlineSegment color="primary" icon={<User className="w-4 h-4" />}>
            {personalInfo.name.toUpperCase()}
          </PowerlineSegment>
          <PowerlineSegment
            color="secondary"
            icon={<Code className="w-4 h-4" />}
          >
            {personalInfo.role.toUpperCase()}
          </PowerlineSegment>
        </PowerlineGroup>
      </div>

      <div className="relative z-10 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Terminal Content */}
        <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Large Hero Text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading mb-8 tracking-tighter leading-none text-text-primary gsap-reveal opacity-0">
            ENGINEERING <br />
            <span className="text-secondary">DIGITAL</span> <br />
            EXPERIENCES
          </h1>

          {/* Powerline Roles Row */}
          <div className="mb-10 w-full flex justify-start gsap-reveal opacity-0">
            <PowerlineGroup>
              <PowerlineSegment
                color="info"
                icon={<Globe className="w-4 h-4" />}
              >
                EGYPT
              </PowerlineSegment>
              <PowerlineSegment
                color="success"
                icon={<Zap className="w-4 h-4" />}
                className="tracking-normal!"
              >
                {heroData.roles[1].toUpperCase()}
              </PowerlineSegment>
              <PowerlineSegment color="warning">v2.0.0</PowerlineSegment>
            </PowerlineGroup>
          </div>

          {/* Description Block */}
          <div className="text-text-secondary text-base text-left md:text-lg max-w-xl mb-12 leading-relaxed font-mono border border-border-subtle/50 p-6 bg-bg-elevated/20 relative overflow-hidden gsap-reveal opacity-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="flex items-center gap-2 mb-4 text-text-tertiary text-[10px] uppercase tracking-widest">
              <Terminal className="w-3 h-3" />
              <span>system_info.md</span>
            </div>
            <p className="opacity-90 leading-relaxed">{heroData.description}</p>
          </div>

          {/* CTAs as Segments */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 gsap-reveal opacity-0">
            <Link href="/work" className="group">
              <PowerlineGroup>
                <PowerlineSegment
                  color="primary"
                  className="px-8! text-lg transition-transform group-hover:scale-105 duration-500"
                  icon={<ArrowRight className="w-5 h-5" />}
                  direction="both"
                >
                  {heroData.primaryCTA.toUpperCase()}
                </PowerlineSegment>
              </PowerlineGroup>
            </Link>

            <Link href="/contact" className="group">
              <PowerlineGroup>
                <PowerlineSegment
                  color="info"
                  className="px-8! text-lg transition-transform group-hover:scale-105 duration-500"
                  icon={<Mail className="w-5 h-5" />}
                  direction="both"
                >
                  {heroData.secondaryCTA.toUpperCase()}
                </PowerlineSegment>
              </PowerlineGroup>
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Image Block */}
        <div className="relative flex justify-center items-center gsap-reveal-fade opacity-0">
          {/* Terminal Window Container */}
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] terminal-card overflow-hidden rounded-sm border-border-subtle/40">
            {/* Window Controls */}
            <div className="terminal-header flex items-center justify-between bg-bg-elevated/50 backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-primary/40" />
                <div className="w-2.5 h-2.5 bg-secondary/40" />
                <div className="w-2.5 h-2.5 bg-accent/40" />
              </div>
              <div className="text-[10px] text-text-tertiary font-mono tracking-widest">
                PROFILE_VIEWER.SH
              </div>
            </div>

            {/* Profile Image with Terminal Effect */}
            <div className="relative w-full h-full p-4">
              <div className="relative w-full h-full border border-border-subtle/30 grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden group">
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent h-2 w-full animate-scanline z-10 pointer-events-none opacity-10" />

                <Image
                  src="/profile.png"
                  alt={personalInfo.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 300px, 450px"
                />

                {/* Terminal Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,17,27,0.4)_100%)]" />
              </div>
            </div>

            {/* Status Footer */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <PowerlineGroup>
                <PowerlineSegment color="secondary" className="h-8 text-[10px]">
                  OS: NEON_TERMINAL
                </PowerlineSegment>
                <PowerlineSegment color="surface" className="h-8 text-[10px]">
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
