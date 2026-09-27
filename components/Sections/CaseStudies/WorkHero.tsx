"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FolderGit2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { shortTitle } from "@/data/projects";

interface WorkHeroProps {
  total: number;
  stats: { value: string; label: string }[];
  /** Three featured projects shown as a stack of browser windows */
  showcase: { slug: string; title: string; cover: string; coverAlt: string }[];
}

// Resting position of each window in the stack (back → front)
const stack = [
  "left-0 top-0 w-[62%] -rotate-2",
  "right-[2%] top-[10%] w-[58%] rotate-2",
  "left-[16%] bottom-[4%] w-[66%]",
];

export function WorkHero({ total, stats, showcase }: WorkHeroProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".work-window", {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        });
        gsap.from(".work-stat", {
          y: 16,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.2,
        });
      });

      // Mouse parallax: each window moves by a different depth
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 1024px)",
        () => {
          const stage =
            container.current?.querySelector<HTMLElement>(".work-stage");
          if (!stage) return;
          const windows = gsap.utils.toArray<HTMLElement>(".work-window");
          const movers = windows.map((el, i) => ({
            x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
            depth: (i + 1) * 10,
          }));
          const onMove = (event: MouseEvent) => {
            const rect = stage.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            movers.forEach((m) => {
              m.x(px * m.depth);
              m.y(py * m.depth);
            });
          };
          const onLeave = () => movers.forEach((m) => (m.x(0), m.y(0)));
          window.addEventListener("mousemove", onMove);
          stage.addEventListener("mouseleave", onLeave);
          return () => {
            window.removeEventListener("mousemove", onMove);
            stage.removeEventListener("mouseleave", onLeave);
          };
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center pb-12 md:pb-16"
    >
      <PageHeader
        className="pb-0! md:pb-0!"
        label="WORK"
        icon={<FolderGit2 className="w-4 h-4" />}
        meta={`${total} PROJECTS`}
        title="Case studies: websites, stores & web apps"
        intro="Real projects for real businesses — what the client needed, how I built it, and what they got. Arabic and English, Next.js and Salla."
      >
        <dl className="mt-10 grid grid-cols-3 max-w-lg border-y border-border-subtle divide-x divide-border-subtle font-[family-name:var(--font-inter)]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="work-stat flex flex-col-reverse py-4 px-4 first:pl-0"
            >
              <dt className="text-xs text-text-tertiary mt-1">{stat.label}</dt>
              <dd className="text-2xl md:text-3xl font-extrabold text-text-primary">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div
        className="work-stage hidden md:block relative aspect-5/4 w-full max-w-xl mx-auto lg:mt-10"
        aria-hidden
      >
        {showcase.slice(0, 3).map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            tabIndex={-1}
            className={`work-window absolute block border border-border-default bg-bg-elevated shadow-2xl shadow-black/50 transition-colors hover:border-primary ${stack[index]}`}
            style={{ zIndex: index + 1 }}
          >
            <span className="relative block aspect-16/10">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                priority={index === 2}
                sizes="(max-width: 1024px) 70vw, 30vw"
                className="object-cover"
              />
              <span className="absolute left-0 bottom-0 px-2 py-1 bg-bg-base/90 font-mono text-[10px] text-text-secondary">
                {shortTitle(project)}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
