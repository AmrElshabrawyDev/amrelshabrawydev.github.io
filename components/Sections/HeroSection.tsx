"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  MessageCircle,
} from "lucide-react";
import { heroData, personalInfo } from "@/data";
import { featuredCaseStudies } from "@/data/projects";
import { whatsappLink } from "@/lib/site";
import { trackLead } from "@/lib/analytics";
import { HeroScene } from "./Hero3D/HeroScene";

const trustPoints = [
  "Arabic & English",
  "SEO-ready from day one",
  "Fixed-price quotes",
];

export function HeroSection() {
  const latest = featuredCaseStudies[0];

  // Entrance animation is pure CSS (.hero-in) so the text paints without
  // waiting for JavaScript — it's the page's Largest Contentful Paint.
  const reveal = (order: number) => ({
    style: { "--d": `${order * 80}ms` } as React.CSSProperties,
  });

  return (
    <section className="relative overflow-hidden bg-bg-base">
      {/* Background: subtle grid + glows */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-info/10 blur-3xl"
      />

      {/* 3D field (loads after the page is idle) + fade so the copy stays readable */}
      <HeroScene className="absolute inset-0 hidden lg:block" />
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block bg-[radial-gradient(ellipse_55%_60%_at_25%_45%,var(--color-bg-base)_40%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-bg-base to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg-base to-transparent"
      />

      <div className="container-custom relative grid lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-12 items-center py-16 md:py-24 lg:min-h-[calc(100vh-5rem)]">
        {/* Copy */}
        <div className="font-[family-name:var(--font-inter)]">
          <p
            className="hero-in inline-flex items-center gap-2 border border-success/30 bg-success/10 px-3 py-1.5 text-xs! font-semibold text-success! mb-8"
            {...reveal(0)}
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-success opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-success" />
            </span>
            {personalInfo.availability} · Cairo, Egypt — remote worldwide
          </p>

          <h1
            className="hero-rise normal-case! tracking-tight! font-[family-name:var(--font-inter)]!"
            {...reveal(1)}
          >
            <span className="block font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase text-primary mb-5">
              Freelance React &amp; Next.js Developer
            </span>
            <span className="block text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] font-extrabold text-text-primary">
              Fast websites that turn visitors into{" "}
              <span className="bg-linear-to-r from-primary via-secondary to-info bg-clip-text text-transparent">
                clients
              </span>
            </span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-lg! md:text-xl! leading-relaxed text-text-secondary"
            {...reveal(2)}
          >
            {heroData.description}
          </p>

          <div
            className="hero-in mt-10 flex flex-col sm:flex-row gap-3"
            {...reveal(3)}
          >
            <Link
              href="/contact"
              className="btn-primary h-14! px-7! text-base!"
              onClick={() => trackLead("contact_hero")}
            >
              {heroData.secondaryCTA} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/work" className="btn-outline h-14! px-7! text-base!">
              {heroData.primaryCTA}
            </Link>
          </div>

          <div
            className="hero-in mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold"
            {...reveal(4)}
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-success hover:text-success hover:brightness-125"
              onClick={() => trackLead("whatsapp_hero")}
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp me
            </a>
            <a
              href={personalInfo.resume}
              download
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary"
            >
              <Download className="w-4 h-4" /> Download CV (PDF)
            </a>
          </div>

          <ul
            className="hero-in mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary"
            {...reveal(5)}
          >
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div
          {...reveal(6)}
          className="hero-in relative mx-auto w-full max-w-[420px] lg:max-w-none"
        >
          <div className="relative aspect-4/5 overflow-hidden border border-border-default bg-bg-elevated shadow-[0_30px_80px_-20px] shadow-primary/25">
            <Image
              src="/profile.webp"
              alt={`${personalInfo.name} — freelance React and Next.js developer`}
              fill
              priority
              sizes="(max-width: 1024px) 420px, 480px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-bg-base/95 via-bg-base/40 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 font-[family-name:var(--font-inter)]">
              <p className="text-xl! font-bold text-text-primary">
                {personalInfo.name}
              </p>
              <p className="text-sm! text-text-secondary">
                Next.js · React · TypeScript · Salla
              </p>
            </div>
          </div>

          {/* Floating proof card → latest case study */}
          {latest && (
            <Link
              href={`/work/${latest.slug}`}
              className="group mt-4 flex flex-col lg:absolute lg:mt-0 lg:-left-10 lg:top-8 lg:max-w-[250px] border border-border-default bg-bg-base/90 backdrop-blur-md p-4 shadow-xl font-[family-name:var(--font-inter)] text-text-secondary hover:text-text-secondary hover:border-primary transition-colors"
            >
              <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-secondary mb-1.5">
                Latest case study
              </span>
              <span className="flex items-start gap-1 text-sm font-semibold text-text-primary leading-snug">
                {latest.client.split(" (")[0]} — {latest.services[0]}
                <ArrowUpRight className="w-4 h-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="block text-xs mt-1">{latest.location}</span>
            </Link>
          )}

          <div className="hidden sm:block absolute -right-6 bottom-28 border border-border-default bg-bg-base/90 backdrop-blur-md px-4 py-3 shadow-xl font-[family-name:var(--font-inter)]">
            <p className="text-2xl! font-extrabold text-primary leading-none">
              {heroData.stats.yearsOfExperience}
            </p>
            <p className="text-[11px]! uppercase tracking-widest text-text-tertiary mt-1">
              Years building for the web
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
