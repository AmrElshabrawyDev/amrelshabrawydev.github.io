import { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { blogMetadata, breadcrumbSchema } from "@/lib/metadata";
import { jsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/Blog/PostCard";

export const metadata: Metadata = blogMetadata;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Amr Elshabrawy — Blog",
          url: absoluteUrl("/blog"),
          author: { "@id": absoluteUrl("/#person") },
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.date,
            inLanguage: post.lang,
          })),
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        )}
      />

      <section className="pt-16 pb-12 bg-bg-base">
        <div className="container-custom">
          <p className="eyebrow mb-4">Blog</p>
          <h1 className="heading-natural text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl">
            Guides for building a website that brings clients
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-inter)] text-lg mb-6">
            Plain-language articles on Next.js, online stores, SEO and speed —
            for business owners deciding what to build, and developers building it.
          </p>
          <Link
            href="/rss.xml"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-warning hover:text-primary"
          >
            <Rss className="w-4 h-4" /> RSS feed
          </Link>
        </div>
      </section>

      <section aria-label="Articles" className="pb-24 bg-bg-base">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
