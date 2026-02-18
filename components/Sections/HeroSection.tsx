"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "@/components/ui/type-animation";
import { heroData } from "@/data";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
} from "@/components/Layout/PageTransition";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-10rem)] flex items-center justify-center relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-hero-glow" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 grid lg:grid-cols-2 gap-8 items-center"
      >
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Greeting */}
          <motion.p
            variants={fadeInUp}
            className="text-accent-400 text-base md:text-lg font-medium mb-2"
          >
            {heroData.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 tracking-tight"
          >
            {heroData.name}
          </motion.h1>

          {/* Animated Roles */}
          <motion.div
            variants={fadeInUp}
            className="text-xl md:text-2xl lg:text-3xl font-heading mb-4 h-10 flex items-center lg:justify-start justify-center text-text-secondary font-medium"
          >
            <TypeAnimation
              words={heroData.roles}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-text-secondary text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button
              asChild
              size="lg"
              className="gap-2 group w-full sm:w-auto shadow-lg shadow-primary-500/20"
              data-testid="cta-view-work"
            >
              <Link href="/work">
                {heroData.primaryCTA}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto hover:bg-white/5 border-border-strong text-text-primary"
              data-testid="cta-contact"
            >
              <Link href="/contact">
                <Mail className="w-4 h-4" />
                {heroData.secondaryCTA}
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Profile Image */}
        <div className="flex justify-center items-center order-1 lg:order-2">
          <motion.div
            variants={scaleIn}
            className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] animate-float"
          >
            {/* Glow effects behind image */}
            <div className="absolute -inset-4 bg-linear-to-r from-primary-500 to-accent-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="absolute -inset-1 bg-linear-to-r from-primary-500 to-accent-500 rounded-full blur-sm opacity-50" />

            <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-2xl bg-bg-elevated/50 backdrop-blur-sm">
              <Image
                src="/profile.png"
                alt={heroData.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 450px"
              />
            </div>

            {/* Decorative orbit/ring (optional) */}
            <div className="absolute -inset-8 border border-white/5 rounded-full z-0 pointer-events-none" />
            <div className="absolute -inset-16 border border-white/5 rounded-full z-0 pointer-events-none opacity-50" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
