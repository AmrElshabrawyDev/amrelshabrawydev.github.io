import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";

export function PostCard({
  post,
  headingLevel: Heading = "h2",
}: {
  post: PostMeta;
  headingLevel?: "h2" | "h3";
}) {
  const isArabic = post.lang === "ar";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      lang={post.lang}
      className="terminal-card group flex flex-col h-full p-6 gap-4"
    >
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
        className={`heading-natural text-xl md:text-2xl font-bold leading-snug ${isArabic ? "font-arabic" : ""}`}
      >
        <Link href={`/blog/${post.slug}`} className="text-text-primary hover:text-secondary">
          {post.title}
        </Link>
      </Heading>

      <p
        className={`text-sm leading-relaxed ${isArabic ? "font-arabic" : "font-[family-name:var(--font-inter)]"}`}
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
