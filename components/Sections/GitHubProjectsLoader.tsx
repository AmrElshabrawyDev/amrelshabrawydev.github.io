import React from "react";
import { Code } from "lucide-react";
import { ProjectSkeletonGrid } from "./GitHubProjects/ProjectSkeletonGrid";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";

export function GitHubProjectsLoader() {
  return (
    <section className="py-24 bg-bg-base">
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center lg:items-start mb-20 animate-pulse">
          <PowerlineGroup>
            <PowerlineSegment
              color="secondary"
              icon={<Code className="w-5 h-5" />}
            >
              LOADING_PROJECTS...
            </PowerlineSegment>
            <PowerlineSegment color="surface" showArrow={false}>
              SRC: FETCHING_API
            </PowerlineSegment>
          </PowerlineGroup>

          <div className="mt-8 space-y-4 w-full max-w-2xl bg-secondary/5 border-l-4 border-secondary/20 p-6">
            <div className="h-4 bg-secondary/10 w-full" />
            <div className="h-4 bg-secondary/10 w-2/3" />
          </div>
        </div>

        {/* Projects Grid Skeleton */}
        <ProjectSkeletonGrid />
      </div>
    </section>
  );
}
