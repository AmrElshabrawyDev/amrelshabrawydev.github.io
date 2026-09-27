import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Rss } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
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

      <section className="bg-bg-base">
        <div className="container-custom">
          <PageHeader
            label="BLOG"
            icon={<BookOpen className="w-4 h-4" />}
            meta={`${posts.length} ARTICLES · EN / AR`}
            title="Guides for building a website that brings clients"
            intro={
              <>
                Plain-language articles on Next.js, online stores, SEO and speed —
                for business owners deciding what to build, and developers building it.{" "}
                <Link
                  href="/rss.xml"
                  className="inline-flex items-center gap-1.5 text-warning hover:text-primary font-semibold"
                >
                  <Rss className="w-4 h-4" /> RSS
                </Link>
              </>
            }
          />
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
