import { Metadata } from "next";
import { workMetadata, portfolioSchema } from "@/lib/metadata";
import { GitHubProjectsSection } from "@/components/Sections/GitHubProjectsSection";

export const metadata: Metadata = workMetadata;

export default function WorkPage() {
  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <GitHubProjectsSection />
    </>
  );
}
