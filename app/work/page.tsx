import { Metadata } from "next";
import { Suspense } from "react";
import { workMetadata, portfolioSchema, breadcrumbSchema } from "@/lib/metadata";
import { jsonLd } from "@/lib/seo";
import { caseStudies } from "@/data/projects";
import { CaseStudyCard } from "@/components/Sections/CaseStudies/CaseStudyCard";
import { GitHubProjectsSection } from "@/components/Sections/GitHubProjectsSection";
import { GitHubProjectsLoader } from "@/components/Sections/GitHubProjectsLoader";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { getOpenSourceProjects } from "@/lib/github";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = workMetadata;

/**
 * Server Component that fetches projects and renders the client section.
 * This is wrapped in Suspense to enable streaming.
 */
async function GitHubProjectsServer() {
  const projects = await getOpenSourceProjects();
  if (projects.length === 0) return null;
  return <GitHubProjectsSection projects={projects} />;
}

export default function WorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(portfolioSchema)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        )}
      />

      <section className="pt-16 pb-12 bg-bg-base">
        <div className="container-custom">
          <p className="eyebrow mb-4">Portfolio</p>
          <h1 className="heading-natural text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl">
            Case studies: websites, stores &amp; web apps
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-inter)] text-lg">
            Real projects for real businesses — what the client needed, how I
            built it, and what they got. Arabic and English, Next.js and Salla.
          </p>
        </div>
      </section>

      <section aria-label="Case studies" className="pb-20 bg-bg-base">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} priority={index < 2} />
          ))}
        </div>
      </section>

      <Suspense fallback={<GitHubProjectsLoader />}>
        <GitHubProjectsServer />
      </Suspense>

      <section className="pb-24 bg-bg-base">
        <div className="container-custom">
          <CtaBanner
            source="work"
            title="Want results like these for your business?"
            whatsappText="Hi Amr! I saw your portfolio and I'd like a website like your case studies."
          />
        </div>
      </section>
    </>
  );
}
