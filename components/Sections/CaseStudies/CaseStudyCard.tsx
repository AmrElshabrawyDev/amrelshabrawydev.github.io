import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { PortfolioCardData, ProjectType } from "@/data/projects";

const typeColors: Record<ProjectType, string> = {
  "Client project": "bg-success text-bg-base",
  "Concept study": "bg-info text-bg-base",
  "UI build": "bg-warning text-bg-base",
  "Open source": "bg-primary text-bg-base",
};

interface CaseStudyCardProps {
  study: PortfolioCardData;
  /** Only the first cards above the fold should be eager-loaded */
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

/** Cover for projects without a screenshot — matches the site's style */
function GeneratedCover({ title, stack }: { title: string; stack: string[] }) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(500px_300px_at_20%_0%,rgba(137,180,250,0.18),transparent_70%),radial-gradient(400px_300px_at_100%_100%,rgba(203,166,247,0.15),transparent_70%)] bg-bg-elevated">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[32px_32px]" />
      <div className="relative h-full flex flex-col justify-end p-6 gap-3">
        <Code2 className="w-8 h-8 text-primary/70" />
        <span className="font-mono text-2xl md:text-3xl font-bold text-text-primary leading-tight line-clamp-2">
          {title}
        </span>
        {stack[0] && (
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">
            {stack.slice(0, 3).join(" · ")}
          </span>
        )}
      </div>
    </div>
  );
}

export function CaseStudyCard({
  study,
  priority = false,
  headingLevel: Heading = "h2",
}: CaseStudyCardProps) {
  const cta = study.type === "Open source" ? "View project" : "Read case study";
  const meta = [study.industry, study.location, study.year].filter(
    (value) => value && value !== "—",
  );

  return (
    <article className="terminal-card group flex flex-col h-full overflow-hidden">
      <Link
        href={`/work/${study.slug}`}
        className="relative block aspect-16/10 overflow-hidden border-b border-border-subtle"
        aria-label={`${cta}: ${study.title}`}
      >
        {study.cover ? (
          <Image
            src={study.cover}
            alt={study.coverAlt ?? study.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <GeneratedCover title={study.title} stack={study.stack} />
        )}
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${typeColors[study.type]}`}
        >
          {study.type}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-text-tertiary">
          {meta.join(" · ")}
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
          {cta} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
