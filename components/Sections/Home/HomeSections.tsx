import Link from "next/link";
import { ArrowRight, Plus, Quote } from "lucide-react";
import {
  heroData,
  serviceData,
  processData,
  faqData,
  testimonialData,
} from "@/data";
import { featuredCaseStudies } from "@/data/projects";
import type { PostMeta } from "@/lib/blog";
import { CaseStudyCard } from "@/components/Sections/CaseStudies/CaseStudyCard";
import { PostCard } from "@/components/Blog/PostCard";

function SectionHeader({
  eyebrow,
  title,
  text,
  link,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-natural text-3xl md:text-5xl font-extrabold mb-4">{title}</h2>
        {text && <p className="font-[family-name:var(--font-inter)] text-lg">{text}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider shrink-0"
        >
          {link.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

export function StatsBar() {
  const stats = [
    { value: heroData.stats.yearsOfExperience, label: "Years of experience" },
    { value: heroData.stats.projectsCompleted, label: "Projects delivered" },
    { value: heroData.stats.happyClients, label: "Happy clients" },
    { value: "AR · EN", label: "Arabic & English sites" },
  ];

  return (
    <section aria-label="Key numbers" className="bg-bg-base border-y border-border-subtle">
      <dl className="container-custom grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-8 px-4 text-center flex flex-col-reverse justify-center border-border-subtle not-last:border-r max-md:nth-2:border-r-0 max-md:nth-[n+3]:border-t"
          >
            <dt className="text-[11px] uppercase tracking-widest text-text-tertiary mt-2">
              {stat.label}
            </dt>
            <dd className="text-3xl md:text-4xl font-black text-primary font-heading">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="py-24 bg-bg-base">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Services"
          title="What I can build for you"
          text="From a fast business website to a full online store — built to rank on Google and turn visitors into customers."
          link={{ href: "/services", label: "All services" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData.map((service) => (
            <Link
              key={service.title}
              href="/services"
              className="terminal-card group p-6 flex flex-col gap-4 text-text-secondary hover:text-text-secondary"
            >
              <div className="text-info">{service.icon}</div>
              <h3 className="heading-natural text-xl font-bold text-text-primary group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedWork() {
  return (
    <section className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Selected work"
          title="Recent client projects"
          text="Real businesses, real problems solved — from saving a Kuwaiti company's Google rankings to a full digital marketplace."
          link={{ href: "/work", label: "All case studies" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCaseStudies.slice(0, 4).map((study) => (
            <CaseStudyCard key={study.slug} study={study} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="container-custom">
        <SectionHeader
          eyebrow="How it works"
          title="A simple, transparent process"
          text="You always know what's happening, what it costs and when it's ready."
        />
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processData.map((item) => (
            <li key={item.step} className="terminal-card p-6">
              <div className="text-4xl font-black font-heading text-primary/60 mb-4">
                {item.step}
              </div>
              <h3 className="heading-natural text-lg font-bold mb-2">{item.title}</h3>
              <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Renders only once real testimonials are added in data/index.tsx */
export function Testimonials() {
  if (testimonialData.length === 0) return null;

  return (
    <section className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="container-custom">
        <SectionHeader eyebrow="Testimonials" title="What clients say" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialData.map((t) => (
            <figure key={t.name} className="terminal-card p-6 flex flex-col gap-4">
              <Quote className="w-6 h-6 text-primary" />
              <blockquote className="font-[family-name:var(--font-inter)] text-text-primary leading-relaxed">
                {t.message}
              </blockquote>
              <figcaption className="mt-auto text-sm">
                <span className="font-bold text-text-primary">{t.name}</span>
                <span className="block text-text-tertiary">
                  {t.position}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LatestPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="container-custom">
        <SectionHeader
          eyebrow="From the blog"
          title="Guides & insights"
          link={{ href: "/blog", label: "All articles" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="container-custom max-w-4xl!">
        <SectionHeader eyebrow="FAQ" title="Questions clients ask" />
        <div className="divide-y divide-border-default border-y border-border-default">
          {faqData.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-inter)] text-lg font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus className="w-5 h-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 font-[family-name:var(--font-inter)] leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
