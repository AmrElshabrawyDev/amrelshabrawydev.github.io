import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CaseStudyView } from "@/components/Sections/CaseStudies/CaseStudyView";
import { caseStudies, getCaseStudy } from "@/data/projects";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Project Not Found", robots: { index: false } };

  return buildMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
    // Social networks (LinkedIn) don't render WebP previews — use the JPEG copy
    image: study.cover.replace(/\.webp$/, ".jpg"),
    imageAlt: study.coverAlt,
    imageSize: [1600, 1000],
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          description: study.summary,
          url: absoluteUrl(`/work/${study.slug}`),
          image: absoluteUrl(study.cover),
          dateCreated: study.year,
          creator: { "@id": absoluteUrl("/#person") },
          keywords: [...study.services, ...study.stack].join(", "),
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
        )}
      />
      <CaseStudyView study={study} />
    </>
  );
}
