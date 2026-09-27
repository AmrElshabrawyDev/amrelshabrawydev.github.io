"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Download, User } from "lucide-react";
import { aboutData, personalInfo, statsData } from "@/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { trackLead } from "@/lib/analytics";

const levels = {
  expert: { label: "Expert", dot: "bg-primary", text: "text-primary" },
  advanced: { label: "Advanced", dot: "bg-secondary", text: "text-secondary" },
  learning: { label: "Learning", dot: "bg-warning", text: "text-warning" },
} as const;

const promises = [
  "You work directly with me — no middlemen or hand-offs",
  "A fixed price and timeline in writing before we start",
  "Fast, SEO-ready code that you fully own",
];

export function AboutSection() {
  const container = useRef<HTMLDivElement>(null);

  useSectionReveal(container, ".gsap-reveal", { stagger: 0.1, y: 20, scale: 0.99 });

  return (
    <section ref={container} className="pb-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom relative z-10">
        <PageHeader
          label="ABOUT"
          icon={<User className="w-4 h-4" />}
          meta="CAIRO, EGYPT"
          title="Freelance front-end developer who builds websites that work for your business"
        />

        {/* Bio + photo */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-12 items-start font-[family-name:var(--font-inter)]">
          <div className="space-y-8">
            <div className="terminal-card p-6 md:p-10 gsap-reveal opacity-0">
              <p className="eyebrow mb-3">Hi, I&apos;m Amr</p>
              <p className="text-lg! leading-relaxed text-text-primary">{aboutData.bio}</p>

              <ul className="mt-8 space-y-3">
                {promises.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-sm">
                    <Check className="w-5 h-5 text-success shrink-0" />
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn-primary"
                  onClick={() => trackLead("contact_about")}
                >
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={personalInfo.resume} download className="btn-outline">
                  <Download className="w-4 h-4" /> Download CV
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 gsap-reveal opacity-0">
              {statsData.map((stat) => (
                <div key={stat.label} className="terminal-card p-5 flex flex-col-reverse">
                  <dt className="text-xs text-text-tertiary mt-1">{stat.label}</dt>
                  <dd className="text-3xl font-extrabold text-primary">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-4/5 overflow-hidden border border-border-default bg-bg-elevated gsap-reveal opacity-0">
            <Image
              src="/profile-about.png"
              alt={`${personalInfo.name}, freelance front-end developer in Cairo`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-bg-base/95 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5">
              <p className="text-xl! font-bold text-text-primary">{personalInfo.name}</p>
              <p className="text-sm! text-text-secondary">{personalInfo.location} · Remote worldwide</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-24">
          <p className="eyebrow mb-3">Skills &amp; tools</p>
          <h2 className="heading-natural text-3xl md:text-5xl font-extrabold mb-12">
            What I work with
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-[family-name:var(--font-inter)]">
            {aboutData.skillCategories.map((category) => {
              const level = levels[category.proficiency];
              return (
                <article key={category.title} className="terminal-card p-6 flex flex-col gap-5 gsap-reveal opacity-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-primary">{category.icon}</span>
                      <h3 className="heading-natural font-[inherit]! text-lg! font-bold">
                        {category.title}
                      </h3>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold shrink-0 ${level.text}`}>
                      <span className={`w-2 h-2 rounded-full ${level.dot}`} />
                      {level.label}
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono border border-border-default text-text-secondary"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
