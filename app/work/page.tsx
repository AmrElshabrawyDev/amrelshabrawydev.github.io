import { Metadata } from "next";
import { workMetadata, portfolioSchema, breadcrumbSchema } from "@/lib/metadata";
import { jsonLd } from "@/lib/seo";
import { caseStudies } from "@/data/projects";
import { PortfolioGrid } from "@/components/Sections/CaseStudies/PortfolioGrid";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { FolderGit2 } from "lucide-react";

export const metadata: Metadata = workMetadata;

export default function WorkPage() {
  // Pass only what the cards need to the client component
  const items = caseStudies.map(
    ({ slug, title, type, industry, location, year, summary, stack, cover, coverAlt }) => ({
      slug, title, type, industry, location, year, summary, stack, cover, coverAlt,
    }),
  );

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

      <section className="bg-bg-base">
        <div className="container-custom">
          <PageHeader
            label="WORK"
            icon={<FolderGit2 className="w-4 h-4" />}
            meta={`${caseStudies.length} PROJECTS`}
            title="Case studies: websites, stores & web apps"
            intro="Real projects for real businesses — what the client needed, how I built it, and what they got. Arabic and English, Next.js and Salla."
          />
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
