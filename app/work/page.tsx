import { Metadata } from "next";
import { workMetadata, portfolioSchema, breadcrumbSchema } from "@/lib/metadata";
import { jsonLd } from "@/lib/seo";
import { caseStudies, featuredCaseStudies } from "@/data/projects";
import { PortfolioGrid } from "@/components/Sections/CaseStudies/PortfolioGrid";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { WorkHero } from "@/components/Sections/CaseStudies/WorkHero";

export const metadata: Metadata = workMetadata;

export default function WorkPage() {
  // Pass only what the cards need to the client component
  const items = caseStudies.map(
    ({ slug, title, type, industry, location, year, summary, stack, cover, coverAlt }) => ({
      slug, title, type, industry, location, year, summary, stack, cover, coverAlt,
    }),
  );

  const clientProjects = caseStudies.filter((study) => study.type === "Client project").length;
  const bestScore = Math.max(...caseStudies.map((study) => study.performance?.desktop ?? 0));
  const stats = [
    { value: String(caseStudies.length), label: "Case studies" },
    { value: String(clientProjects), label: "Client projects" },
    { value: String(bestScore), label: "Top PageSpeed score" },
  ];

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

      <section className="bg-bg-base overflow-hidden">
        <div className="container-custom">
          <WorkHero total={caseStudies.length} stats={stats} showcase={featuredCaseStudies} />
        </div>
      </section>

      <section aria-label="Projects" className="pb-20 bg-bg-base">
        <div className="container-custom">
          <PortfolioGrid items={items} />
        </div>
      </section>

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
