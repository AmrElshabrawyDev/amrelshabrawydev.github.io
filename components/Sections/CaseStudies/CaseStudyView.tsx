import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Info,
  Monitor,
  Smartphone,
  Gauge,
} from "lucide-react";
import type { CaseStudy } from "@/data/projects";
import { caseStudies } from "@/data/projects";
import { CaseStudyCard } from "./CaseStudyCard";
import { CtaBanner } from "@/components/ui/CtaBanner";

/** Lighthouse colour bands: 90+ good, 50–89 needs improvement, <50 poor */
const scoreColor = (score: number) =>
  score >= 90 ? "text-success border-success" : score >= 50 ? "text-warning border-warning" : "text-accent border-accent";

function ScoreRing({ label, score, icon }: { label: string; score: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex items-center justify-center w-14 h-14 rounded-full border-4 text-lg font-extrabold font-[family-name:var(--font-inter)] ${scoreColor(score)}`}
      >
        {score}
      </span>
      <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-text-secondary">
        {icon} {label}
      </span>
    </div>
  );
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const others = caseStudies.filter((c) => c.slug !== study.slug && c.featured).slice(0, 2);

  const details = [
    ["Client", study.client],
    ["Role", study.role],
    ["Period", study.period],
    ["Location", study.location],
  ].filter(([, value]) => value && value !== "—");

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
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink className="w-4 h-4" /> Visit live site
              </a>
            )}
            {study.sourceUrl && (
              <a href={study.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Github className="w-4 h-4" /> {study.sourceLabel ?? "Source code"}
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
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-1">{label}</dt>
                  <dd className="text-text-primary">{value}</dd>
                </div>
              ))}
              {study.performance && (
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-2">
                    Lighthouse performance
                  </dt>
                  <dd className="flex gap-4 text-text-primary">
                    <span>
                      Desktop <b className={scoreColor(study.performance.desktop).split(" ")[0]}>{study.performance.desktop}</b>
                    </span>
                    <span>
                      Mobile <b className={scoreColor(study.performance.mobile).split(" ")[0]}>{study.performance.mobile}</b>
                    </span>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-2">Services</dt>
                <dd className="flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span key={service} className="px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                      {service}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-text-tertiary mb-2">Tech stack</dt>
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

        {study.gallery && (
          <section className="mt-20">
            <h2 className="heading-natural text-2xl md:text-3xl font-bold mb-8">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 items-start">
              <figure className="terminal-card overflow-hidden">
                <Image
                  src={study.gallery.desktop}
                  alt={`${study.title} — desktop screenshot`}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="w-full h-auto"
                />
                <figcaption className="flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-widest text-text-tertiary border-t border-border-subtle">
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </figcaption>
              </figure>
              <figure className="terminal-card overflow-hidden max-w-[260px] mx-auto md:mx-0 w-full">
                <Image
                  src={study.gallery.mobile}
                  alt={`${study.title} — mobile screenshot`}
                  width={390}
                  height={844}
                  sizes="260px"
                  className="w-full h-auto"
                />
                <figcaption className="flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-widest text-text-tertiary border-t border-border-subtle">
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        {study.performance && (
          <section className="mt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="eyebrow mb-3 flex items-center gap-2">
                  <Gauge className="w-4 h-4" /> Google PageSpeed Insights
                </p>
                <h2 className="heading-natural text-2xl md:text-3xl font-bold">Performance</h2>
              </div>
              <div className="flex gap-8">
                <ScoreRing label="Desktop" score={study.performance.desktop} icon={<Monitor className="w-3.5 h-3.5" />} />
                <ScoreRing label="Mobile" score={study.performance.mobile} icon={<Smartphone className="w-3.5 h-3.5" />} />
              </div>
            </div>
            {study.pagespeed && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(["desktop", "mobile"] as const).map((device) => (
                  <a
                    key={device}
                    href={study.pagespeed![device]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-card overflow-hidden block"
                  >
                    <Image
                      src={study.pagespeed![device]}
                      alt={`${study.title} — PageSpeed Insights ${device} report`}
                      width={1400}
                      height={623}
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="w-full h-auto"
                    />
                    <span className="block px-4 py-3 text-xs font-mono uppercase tracking-widest text-text-tertiary border-t border-border-subtle">
                      PageSpeed report — {device}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="mt-20">
          <CtaBanner
            source={`case_${study.slug}`}
            title="Need something similar?"
            whatsappText={`Hi Amr! I read your "${study.title}" case study and I need something similar.`}
          />
        </div>

        {others.length > 0 && (
          <section className="mt-20">
            <h2 className="heading-natural text-2xl md:text-3xl font-bold mb-8">More case studies</h2>
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
