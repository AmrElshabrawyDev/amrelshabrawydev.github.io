import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  text?: React.ReactNode;
  /** "See all"-style link shown on the right */
  link?: { href: string; label: string };
  /** Any other content for the right side (e.g. a rating summary) */
  aside?: React.ReactNode;
  /** Screen size from which the right side sits beside the title */
  asideFrom?: "md" | "lg";
}

const layouts = {
  md: "md:flex-row md:items-end md:justify-between gap-6",
  lg: "lg:flex-row lg:items-end lg:justify-between gap-8",
};

/** Section title block used across pages: eyebrow → H2 → intro (+ right side) */
export function SectionHeader({
  eyebrow,
  title,
  text,
  link,
  aside,
  asideFrom = "md",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col mb-12 ${layouts[asideFrom]}`}>
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2
          className={`heading-natural text-3xl md:text-5xl font-extrabold ${text ? "mb-4" : ""}`}
        >
          {title}
        </h2>
        {text && (
          <p className="font-[family-name:var(--font-inter)] text-lg">{text}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider shrink-0"
        >
          {link.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
      {aside}
    </div>
  );
}
