import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, formatPostDate } from "@/lib/blog";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/metadata";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { PostCard } from "@/components/Blog/PostCard";
import { CtaBanner } from "@/components/ui/CtaBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article Not Found", robots: { index: false } };

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    locale: post.lang === "ar" ? "ar_EG" : "en_US",
  });
}

/** Internal links use client-side navigation; external links open in a new tab */
const articleComponents: Components = {
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const isArabic = post.lang === "ar";
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: absoluteUrl(`/blog/${post.slug}`),
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: post.lang,
          keywords: post.tags.join(", "),
          image: absoluteUrl("/og-image.png"),
          author: {
            "@type": "Person",
            "@id": absoluteUrl("/#person"),
            name: SITE_NAME,
            url: absoluteUrl("/about"),
          },
          publisher: { "@id": absoluteUrl("/#person") },
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        )}
      />

      <article className="bg-bg-base pt-12 pb-16">
        <div className="container-custom max-w-3xl!">
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
          </nav>

          <div dir={isArabic ? "rtl" : "ltr"} lang={post.lang}>
            <header className="mb-10 pb-8 border-b border-border-subtle">
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-border-default text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1
                className={`heading-natural text-3xl md:text-5xl font-extrabold leading-tight mb-6 ${isArabic ? "font-arabic" : ""}`}
              >
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary font-mono">
                <span className="flex items-center gap-2">
                  <Image
                    src="/profile.webp"
                    alt={SITE_NAME}
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-8 h-8"
                  />
                  <Link href="/about" className="text-text-secondary">
                    {SITE_NAME}
                  </Link>
                </span>
                <time dateTime={post.date}>{formatPostDate(post.date, post.lang)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {isArabic ? `${post.readingMinutes} دقائق قراءة` : `${post.readingMinutes} min read`}
                </span>
              </div>
            </header>

            <div className="prose-article">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={articleComponents}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mt-16">
            <CtaBanner
              source={`blog_${post.slug}`}
              lang={post.lang}
              title={isArabic ? "لديك مشروع؟ لنتحدث" : "Need help with your website?"}
              text={
                isArabic
                  ? "أخبرني عن مشروعك، وسأرد عليك خلال 24 ساعة بنصيحة صريحة وعرض سعر ثابت."
                  : undefined
              }
              whatsappText={`Hi Amr! I read your article "${post.title}" and I have a question about my project.`}
            />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-bg-base pb-24">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-natural text-2xl md:text-3xl font-bold">Keep reading</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider"
              >
                All articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
