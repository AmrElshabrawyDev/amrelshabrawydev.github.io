import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioCardData, ProjectType } from "@/data/projects";

const typeColors: Record<ProjectType, string> = {
  "Client project": "bg-success text-bg-base",
  "Personal project": "bg-primary text-bg-base",
  "Concept study": "bg-info text-bg-base",
};

interface CaseStudyCardProps {
  study: PortfolioCardData;
  /** Only the first cards above the fold should be eager-loaded */
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  /** Full-width card with the image beside the text (md and up) */
  wide?: boolean;
}

export function CaseStudyCard({
  study,
  priority = false,
  headingLevel: Heading = "h2",
  wide = false,
}: CaseStudyCardProps) {
  const cta = "Read case study";
  const meta = [study.industry, study.location, study.year].filter(
    (value) => value && value !== "—",
  );

  return (
    <article
      className={`terminal-card group flex flex-col h-full overflow-hidden ${
        wide ? "md:col-span-2 lg:grid lg:grid-cols-[1.4fr_1fr]" : ""
      }`}
    >
      <Link
        href={`/work/${study.slug}`}
        className={`relative block aspect-16/10 overflow-hidden border-b border-border-subtle ${
          wide ? "lg:aspect-auto lg:min-h-full lg:border-b-0 lg:border-r" : ""
        }`}
        aria-label={`${cta}: ${study.title}`}
      >
        <Image
          src={study.cover}
          alt={study.coverAlt}
          fill
          priority={priority}
          sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${typeColors[study.type]}`}
        >
          {study.type}
        </span>
      </Link>

      <div className={`flex flex-col flex-1 p-6 gap-4 ${wide ? "lg:p-10 lg:justify-center" : ""}`}>
        <div className="text-[11px] font-mono uppercase tracking-widest text-text-tertiary">
          {meta.join(" · ")}
        </div>

        <Heading
          className={`heading-natural font-bold leading-snug ${wide ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
        >
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

        <ul
          className={`flex flex-wrap gap-2 pt-2 ${wide ? "lg:mt-2" : "mt-auto"}`}
          aria-label="Tech stack"
        >
          {study.stack.slice(0, wide ? 6 : 4).map((tech) => (
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
