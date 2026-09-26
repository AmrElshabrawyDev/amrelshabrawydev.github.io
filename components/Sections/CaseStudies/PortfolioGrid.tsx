"use client";

import { useState } from "react";
import type { PortfolioCardData, ProjectType } from "@/data/projects";
import { CaseStudyCard } from "./CaseStudyCard";

const filters: { label: string; types: ProjectType[] | null }[] = [
  { label: "All", types: null },
  { label: "Client work", types: ["Client project"] },
  { label: "Concepts & UI", types: ["Concept study", "UI build"] },
  { label: "Open source", types: ["Open source"] },
];

export function PortfolioGrid({ items }: { items: PortfolioCardData[] }) {
  const [active, setActive] = useState(0);

  // Hide filters that would show nothing (e.g. no repos fetched)
  const available = filters.filter(
    (f) => !f.types || items.some((item) => f.types!.includes(item.type)),
  );
  const current = available[active] ?? available[0];

  const visible = current.types
    ? items.filter((item) => current.types!.includes(item.type))
    : items;

  return (
    <>
      {available.length > 2 && (
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 mb-10">
          {available.map((filter, index) => {
            const count = filter.types
              ? items.filter((item) => filter.types!.includes(item.type)).length
              : items.length;
            const isActive = index === active;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                className={`px-4 h-10 text-xs font-bold uppercase tracking-widest border transition-colors ${
                  isActive
                    ? "bg-primary text-bg-base border-primary"
                    : "border-border-default text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {filter.label} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visible.map((item, index) => (
          <CaseStudyCard key={item.slug} study={item} priority={index < 2} />
        ))}
      </div>
    </>
  );
}
