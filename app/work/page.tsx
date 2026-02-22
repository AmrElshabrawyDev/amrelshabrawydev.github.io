import { Metadata } from "next";
import { workMetadata, portfolioSchema } from "@/lib/metadata";
import { GitHubProjectsSection } from "@/components/Sections/GitHubProjectsSection";
import { getAllProjects } from "@/lib/github";

export const metadata: Metadata = workMetadata;

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <GitHubProjectsSection projects={projects} />
    </>
  );
}
