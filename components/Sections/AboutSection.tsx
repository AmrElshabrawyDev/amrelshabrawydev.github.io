"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileCheck2,
  Gauge,
  Handshake,
  User,
} from "lucide-react";
import { aboutData, personalInfo, statsData } from "@/data";
import { getCaseStudy } from "@/data/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { trackLead } from "@/lib/analytics";

const promises = [
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "You work directly with me",
    text: "No agency layers or hand-offs. The person you talk to is the person writing your code.",
  },
  {
    icon: <FileCheck2 className="w-6 h-6" />,
    title: "Fixed price, in writing",
    text: "Scope, timeline and price agreed before we start — and a live preview link every week.",
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "Fast code you own",
    text: "SEO-ready, measured with PageSpeed, and handed over completely: code, accounts and docs.",
  },
];

const whoami = [
  ["name", personalInfo.name],
  ["role", "React & Next.js developer"],
  ["based", `${personalInfo.location} · remote`],
  ["speaks", "Arabic, English"],
  ["status", personalInfo.availability],
];

const featuredSkills = aboutData.skillCategories.filter((c) => c.featured);
const gridSkills = aboutData.skillCategories.filter((c) => !c.featured);

/** Links to the case studies where a group of tools was used */
function UsedIn({
  slugs,
  className = "",
}: {
  slugs: string[];
  className?: string;
}) {
  const projects = slugs
    .map((slug) => getCaseStudy(slug))
    .filter((study) => study !== undefined);
  if (projects.length === 0) return null;
  return (
    <div className={className}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-2">
        Used in
      </p>
      <ul className="flex flex-col gap-1.5">
        {projects.map((study) => (
          <li key={study.slug}>
            <Link
              href={`/work/${study.slug}`}
              className="group inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary"
            >
              {study.title.split(" — ")[0]}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "50+" → { value: 50, suffix: "+" } so the number can count up */
const parseStat = (raw: string) => {
  const match = raw.match(/^(\d+)(.*)$/);
  return match ? { value: Number(match[1]), suffix: match[2] } : null;
};

export function AboutSection() {
  const container = useRef<HTMLDivElement>(null);

  useSectionReveal(container, ".gsap-reveal", {
    stagger: 0.1,
    y: 20,
    scale: 0.99,
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-photo", {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.1,
          ease: "power3.inOut",
        });
        gsap.from(".about-whoami > *", {
          opacity: 0,
          x: -12,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.7,
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => {
              el.textContent = Math.round(counter.value).toLocaleString(
                "en-US",
              );
            },
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="pb-24 bg-bg-base relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Hero: intro + photo */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center pb-16">
          <PageHeader
            className="pb-0! md:pb-0!"
            label="ABOUT"
            icon={<User className="w-4 h-4" />}
            meta="CAIRO, EGYPT"
            title="I build websites that work for your business"
            intro={aboutData.bio}
          >
            <div className="mt-10 flex flex-col sm:flex-row gap-3 font-[family-name:var(--font-inter)]">
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
          </PageHeader>

          <div className="relative lg:mt-12 max-w-md w-full mx-auto lg:mx-0 lg:justify-self-end pb-16 sm:pb-10">
            <div className="about-photo relative aspect-4/5 overflow-hidden border border-border-default bg-bg-elevated">
              <Image
                src="/profile-about.png"
                alt={`${personalInfo.name}, freelance front-end developer in Cairo`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 28rem"
              />
            </div>

            {/* whoami card overlapping the photo */}
            <div className="absolute -left-4 sm:-left-10 right-8 sm:right-auto bottom-0 sm:w-80 terminal-card shadow-2xl shadow-black/50">
              <div className="terminal-header flex items-center justify-between">
                <span className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent/80" />
                  <span className="w-2 h-2 rounded-full bg-warning/80" />
                  <span className="w-2 h-2 rounded-full bg-success/80" />
                </span>
                <span className="font-mono text-[10px] text-text-tertiary">
                  ~/amr
                </span>
              </div>
              <dl className="about-whoami p-4 font-mono text-xs space-y-1.5">
                <p className="text-text-tertiary mb-2">
                  <span className="text-success">$</span> whoami
                </p>
                {whoami.map(([key, value]) => (
                  <div key={key} className="flex gap-3">
                    <dt className="w-14 shrink-0 text-secondary">{key}</dt>
                    <dd
                      className={
                        key === "status" ? "text-success" : "text-text-primary"
                      }
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Stats */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px border border-border-subtle bg-border-subtle font-[family-name:var(--font-inter)]">
          {statsData.map((stat) => {
            const parsed = parseStat(stat.value);
            return (
              <div
                key={stat.label}
                className="flex flex-col-reverse p-6 md:p-8 bg-bg-elevated"
              >
                <dt className="text-sm text-text-tertiary mt-2">
                  {stat.label}
                </dt>
                <dd className="text-4xl md:text-5xl font-extrabold text-primary tabular-nums">
                  {parsed ? (
                    <>
                      <span data-count={parsed.value}>
                        {parsed.value.toLocaleString("en-US")}
                      </span>
                      {parsed.suffix}
                    </>
                  ) : (
                    stat.value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        {/* How I work */}
        <div className="mt-24">
          <p className="eyebrow mb-3">Working with me</p>
          <h2 className="heading-natural text-3xl md:text-5xl font-extrabold mb-12">
            What you can count on
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-[family-name:var(--font-inter)]">
            {promises.map((item, index) => (
              <article
                key={item.title}
                className="terminal-card p-6 md:p-8 gsap-reveal opacity-0"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="flex items-center justify-center w-12 h-12 border border-success/40 bg-success/10 text-success">
                    {item.icon}
                  </span>
                  <span className="font-mono text-sm text-text-tertiary">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="heading-natural font-[inherit]! text-lg! font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm! leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Skills &amp; tools</p>
              <h2 className="heading-natural text-3xl md:text-5xl font-extrabold mb-4">
                What I work with
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-lg">
                Only tools I&apos;ve shipped real projects with — each one
                linked to the case studies where you can see it in action.
              </p>
            </div>
          </div>

          {featuredSkills.map((category) => (
            <article
              key={category.title}
              className="terminal-card mb-6 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_0.7fr] gap-8 items-center border-l-2! border-l-primary! font-[family-name:var(--font-inter)] gsap-reveal opacity-0"
            >
              <div>
                <span className="flex items-center justify-center w-12 h-12 mb-5 border border-primary/40 bg-primary/10 text-primary">
                  {category.icon}
                </span>
                <h3 className="heading-natural font-[inherit]! text-xl! md:text-2xl! font-bold mb-2">
                  {category.title}
                </h3>
                <p className="text-sm! leading-relaxed">{category.benefit}</p>
              </div>

              <ul
                className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3"
                aria-label={`${category.title} tools`}
              >
                {category.skills.map((skill) => {
                  const [name, detail] = skill.split(" (");
                  return (
                    <li
                      key={skill}
                      className="flex flex-col justify-center min-h-16 px-4 py-3 border border-border-default bg-bg-base/40"
                    >
                      <span className="font-bold text-text-primary">
                        {name}
                      </span>
                      {detail && (
                        <span className="font-mono text-[10px] text-text-tertiary">
                          {detail.replace(")", "")}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <UsedIn slugs={category.projects} />
            </article>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-[family-name:var(--font-inter)]">
            {gridSkills.map((category, index) => {
              return (
                <article
                  key={category.title}
                  className="terminal-card p-6 md:p-7 flex flex-col gap-5 gsap-reveal opacity-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex items-center justify-center w-12 h-12 border border-primary/40 bg-primary/10 text-primary">
                      {category.icon}
                    </span>
                    <span className="font-mono text-sm text-text-tertiary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="heading-natural font-[inherit]! text-lg! font-bold mb-1.5">
                      {category.title}
                    </h3>
                    <p className="text-sm! leading-relaxed">
                      {category.benefit}
                    </p>
                  </div>

                  <ul
                    className="flex flex-wrap gap-2"
                    aria-label={`${category.title} tools`}
                  >
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono border border-border-default text-text-secondary"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>

                  <UsedIn
                    slugs={category.projects}
                    className="mt-auto pt-4 border-t border-border-subtle"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
