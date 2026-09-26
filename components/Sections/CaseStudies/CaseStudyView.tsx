import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Info } from "lucide-react";
import type { CaseStudy } from "@/data/projects";
import { caseStudies } from "@/data/projects";
import { CaseStudyCard } from "./CaseStudyCard";
import { CtaBanner } from "@/components/ui/CtaBanner";

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const others = caseStudies.filter((c) => c.slug !== study.slug && c.featured).slice(0, 2);

  return (
    <article className="bg-bg-base pb-24">
      <header className="container-custom pt-12 pb-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" /> All case studies
          </Link>
        </nav>

        <p className="eyebrow mb-4">
          {study.type} · {study.industry}
        </p>
        <h1 className="heading-natural text-3xl md:text-5xl font-extrabold mb-6 max-w-4xl leading-tight">
          {study.title}
        </h1>
        <p className="max-w-3xl text-lg md:text-xl font-[family-name:var(--font-inter)] leading-relaxed">
          {study.summary}
        </p>

        {(study.liveUrl || study.sourceUrl) && (
          <div className="flex flex-wrap gap-3 mt-8">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink className="w-4 h-4" /> Visit live site
              </a>
            )}
            {study.sourceUrl && (
              <a
                href={study.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Github className="w-4 h-4" /> Source code
              </a>
            )}
          </div>
        )}
      </header>

      <div className="container-custom">
        <div className="relative aspect-16/10 w-full overflow-hidden border border-border-subtle mb-4">
          <Image
            src={study.cover}
            alt={study.coverAlt}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        {study.note && (
          <p className="flex items-center gap-2 text-xs text-text-tertiary font-mono mb-12">
            <Info className="w-3.5 h-3.5" /> {study.note}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 mt-12">
          <div className="prose-article">
            <h2>The challenge</h2>
            <p>{study.challenge}</p>

            <h2>What I built</h2>
            <p>{study.solution}</p>

            <h2>Highlights</h2>
            <ul className="list-none! ps-0!">
              {study.highlights.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="terminal-card h-fit p-6 space-y-6 font-mono text-sm">
            <dl className="space-y-5">
              {[
                ["Client", study.client],
                ["Location", study.location],
                ["Year", study.year],
              ]
                .filter(([, value]) => value !== "—")
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-1">
                      {label}
                    </dt>
                    <dd className="text-text-primary">{value}</dd>
                  </div>
                ))}
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-2">
                  Services
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span key={service} className="px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                      {service}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-2">
                  Tech stack
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs border border-border-default text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mt-20">
          <CtaBanner
            source={`case_${study.slug}`}
            title="Need something similar?"
            whatsappText={`Hi Amr! I read your "${study.title}" case study and I need something similar.`}
          />
        </div>

        {others.length > 0 && (
          <section className="mt-20">
            <h2 className="heading-natural text-2xl md:text-3xl font-bold mb-8">
              More case studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {others.map((other) => (
                <CaseStudyCard key={other.slug} study={other} headingLevel="h3" />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
