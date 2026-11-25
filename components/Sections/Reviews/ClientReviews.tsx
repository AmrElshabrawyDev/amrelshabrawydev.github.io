"use client";

import { useState } from "react";
import { ArrowUpRight, Languages, Star } from "lucide-react";
import { reviewCompletion, reviewSources, testimonialData } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Lang = "en" | "ar";

const Stars = ({
  rating,
  className = "w-4 h-4",
}: {
  rating: number;
  className?: string;
}) => (
  <span
    className="flex gap-0.5 text-warning"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${className} ${i < rating ? "fill-current" : "opacity-30"}`}
      />
    ))}
  </span>
);

/** Real Khamsat and Mostaql reviews: English translation by default, Arabic original on demand */
export function ClientReviews({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState<Lang>("en");

  if (testimonialData.length === 0) return null;

  const totalReviews = reviewSources.reduce((sum, source) => sum + source.count, 0);
  const sourceNames = reviewSources.map((source) => source.name).join(" and ");

  return (
    <section
      className={`py-24 bg-bg-base border-t border-border-subtle ${className}`}
    >
      <div className="container-custom font-[family-name:var(--font-inter)]">
        <SectionHeader
          eyebrow="Client reviews"
          title="What clients say"
          text={`Verified reviews from my ${sourceNames} profiles. Clients wrote them in Arabic — read the English translation or the original.`}
          asideFrom="lg"
          aside={
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0">
              {/* Rating summary, with a link to each platform's reviews */}
              <div className="terminal-card flex items-center gap-4 px-5 py-4 text-text-secondary">
                <span className="text-4xl font-extrabold text-text-primary leading-none">
                  {reviewSources[0].rating.toFixed(1)}
                </span>
                <span className="flex flex-col gap-1">
                  <Stars rating={5} />
                  <span className="flex flex-wrap items-center gap-x-1 text-xs">
                    {totalReviews} reviews · {reviewCompletion} orders completed
                    {reviewSources.map((source) => (
                      <span key={source.name} className="flex items-center gap-x-1">
                        ·
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center font-semibold text-primary hover:text-secondary"
                        >
                          {source.name}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </span>
                    ))}
                  </span>
                </span>
              </div>

              {/* Language toggle */}
              <div
                role="group"
                aria-label="Review language"
                className="flex items-center self-start sm:self-stretch lg:self-start xl:self-stretch border border-border-default"
              >
                <Languages
                  className="w-4 h-4 mx-3 text-text-tertiary"
                  aria-hidden
                />
                {(
                  [
                    ["en", "English"],
                    ["ar", "العربية"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={lang === value}
                    onClick={() => setLang(value)}
                    lang={value}
                    className={`h-full min-h-10 px-4 text-sm font-semibold transition-colors ${
                      lang === value
                        ? "bg-primary text-bg-base"
                        : "text-text-secondary hover:text-primary"
                    } ${value === "ar" ? "font-arabic" : ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialData.map((review, index) => {
            const isArabic = lang === "ar";
            return (
              <figure
                key={review.source + review.name + review.date}
                className={`terminal-card flex flex-col gap-5 p-6 md:p-8 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <Stars rating={review.rating} />
                <blockquote
                  lang={lang}
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`leading-relaxed text-text-primary ${
                    isArabic ? "font-arabic" : ""
                  } ${index === 0 ? "text-lg md:text-xl" : "text-base"}`}
                >
                  {isArabic
                    ? `«${review.original}»`
                    : `“${review.translation}”`}
                </blockquote>
                <p className="-mt-2 text-xs text-text-tertiary">
                  {isArabic ? "Original review" : "Translated from Arabic"}
                </p>
                <figcaption className="mt-auto pt-5 border-t border-border-subtle flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-primary/15 text-primary font-bold"
                  >
                    {review.name.charAt(0)}
                  </span>
                  <span className="min-w-0 text-sm">
                    <span className="block font-bold text-text-primary">
                      {review.name}
                    </span>
                    <span className="block text-text-tertiary truncate">
                      {review.source} · {review.date} · {review.service}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
