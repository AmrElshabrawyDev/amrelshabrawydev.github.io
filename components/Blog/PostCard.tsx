import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";

export function PostCard({
  post,
  headingLevel: Heading = "h2",
  featured = false,
}: {
  post: PostMeta;
  headingLevel?: "h2" | "h3";
  /** Full-width "latest article" card */
  featured?: boolean;
}) {
  const isArabic = post.lang === "ar";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      lang={post.lang}
      className={`terminal-card group flex flex-col h-full gap-4 ${
        featured ? "md:col-span-2 lg:col-span-3 p-6 md:p-10 border-l-2! border-l-primary!" : "p-6"
      }`}
    >
      {featured && (
        <span className="self-start px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest bg-primary text-bg-base">
          {isArabic ? "أحدث مقال" : "Latest article"}
        </span>
      )}
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-text-tertiary">
        <time dateTime={post.date}>{formatPostDate(post.date, post.lang)}</time>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {isArabic ? `${post.readingMinutes} دقائق قراءة` : `${post.readingMinutes} min read`}
        </span>
        {isArabic && (
          <span className="px-1.5 py-0.5 bg-secondary text-bg-base font-bold">عربي</span>
        )}
      </div>

      <Heading
        className={`heading-natural font-bold leading-snug ${
          featured ? "text-2xl md:text-4xl max-w-3xl" : "text-xl md:text-2xl"
        } ${isArabic ? "font-arabic" : ""}`}
      >
        <Link href={`/blog/${post.slug}`} className="text-text-primary hover:text-secondary">
          {post.title}
        </Link>
      </Heading>

      <p
        className={`leading-relaxed ${featured ? "text-base! max-w-2xl" : "text-sm"} ${isArabic ? "font-arabic" : "font-[family-name:var(--font-inter)]"}`}
      >
        {post.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-border-default text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-primary hover:text-secondary"
      >
        {isArabic ? "اقرأ المقال" : "Read article"} <ArrowUpRight className="w-4 h-4" />
      </Link>
    </article>
  );
}
