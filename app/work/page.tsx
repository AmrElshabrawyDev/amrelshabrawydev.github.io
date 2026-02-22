import { Metadata } from "next";
import { Suspense } from "react";
import { workMetadata, portfolioSchema } from "@/lib/metadata";
import { GitHubProjectsSection } from "@/components/Sections/GitHubProjectsSection";
import { GitHubProjectsLoader } from "@/components/Sections/GitHubProjectsLoader";
import { getAllProjects } from "@/lib/github";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = workMetadata;

/**
 * Server Component that fetches projects and renders the client section.
 * This is wrapped in Suspense to enable streaming.
 */
async function GitHubProjectsServer() {
  const projects = await getAllProjects();
  return <GitHubProjectsSection projects={projects} />;
}

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

      <Suspense fallback={<GitHubProjectsLoader />}>
        <GitHubProjectsServer />
      </Suspense>
    </>
  );
}
