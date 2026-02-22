import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectSkeletonGrid } from "./GitHubProjects/ProjectSkeletonGrid";

export function GitHubProjectsLoader() {
  return (
    <section className="section-spacing bg-bg-base">
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center mb-20 animate-pulse">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1 border-primary-500/30 bg-primary-500/5 text-primary-400/50 font-medium tracking-widest uppercase text-[10px] rounded-full"
          >
            <Code2 className="w-3 h-3 mr-2" />
            Loading...
          </Badge>
          <div className="h-12 md:h-16 bg-primary-500/10 rounded-lg w-64 md:w-96 mb-6" />
          <div className="h-1 w-20 bg-primary-500/20 rounded-full mb-8" />
          <div className="h-4 bg-primary-500/10 rounded w-full max-w-2xl mb-2" />
          <div className="h-4 bg-primary-500/10 rounded w-2/3 max-w-2xl" />
        </div>

        {/* Projects Grid Skeleton */}
        <ProjectSkeletonGrid />
      </div>
    </section>
  );
}
