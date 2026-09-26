import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/projects";

const typeColors: Record<CaseStudy["type"], string> = {
  "Client project": "bg-success text-bg-base",
  "Concept study": "bg-info text-bg-base",
  "UI build": "bg-warning text-bg-base",
};

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Only the first card above the fold should be eager-loaded */
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

export function CaseStudyCard({
  study,
  priority = false,
  headingLevel: Heading = "h2",
}: CaseStudyCardProps) {
  return (
    <article className="terminal-card group flex flex-col h-full overflow-hidden">
      <Link
        href={`/work/${study.slug}`}
        className="relative block aspect-16/10 overflow-hidden border-b border-border-subtle"
        aria-label={`Read the ${study.title} case study`}
      >
        <Image
          src={study.cover}
          alt={study.coverAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${typeColors[study.type]}`}
        >
          {study.type}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-text-tertiary">
          {study.industry}
          {study.location !== "—" && ` · ${study.location}`} · {study.year}
        </div>

        <Heading className="heading-natural text-xl md:text-2xl font-bold leading-snug">
          <Link
            href={`/work/${study.slug}`}
            className="text-text-primary hover:text-secondary"
          >
            {study.title}
          </Link>
        </Heading>

        <p className="text-sm leading-relaxed font-[family-name:var(--font-inter)]">
          {study.summary}
        </p>

        <ul className="flex flex-wrap gap-2 mt-auto pt-2" aria-label="Tech stack">
          {study.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-border-default text-text-secondary"
            >
              {tech}
            </li>
          ))}
        </ul>

        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-primary hover:text-secondary"
        >
          Read case study <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
