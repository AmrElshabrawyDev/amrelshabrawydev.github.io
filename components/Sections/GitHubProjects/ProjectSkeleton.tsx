import React from "react";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function ProjectSkeleton() {
  return (
    <div className={`grid grid-cols-[16px_1fr] md:grid-cols-[20px_1fr] flex-1 gap-4 relative animate-pulse ${jetbrainsMono.className}`}>
      {/* Spine Column Skeleton */}
      <div className="flex flex-col items-center pt-1.5">
        <div className="w-3 h-3 rounded-full bg-border-subtle" />
        <div className="w-px h-full bg-border-subtle/30 mt-2" />
      </div>

      {/* Content Column Skeleton */}
      <div className="pb-8 space-y-4">
        {/* Meta Row */}
        <div className="flex gap-2">
          <div className="h-3 w-20 bg-border-subtle/50 rounded-sm" />
          <div className="h-3 w-16 bg-border-subtle/50 rounded-sm" />
        </div>

        {/* Title */}
        <div className="h-8 bg-secondary/10 w-3/4 rounded-sm" />
        
        {/* Tech Stack */}
        <div className="flex gap-1">
          <div className="h-5 w-16 bg-border-subtle/30 rounded-xs" />
          <div className="h-5 w-20 bg-border-subtle/30 rounded-xs" />
          <div className="h-5 w-14 bg-border-subtle/30 rounded-xs" />
        </div>

        {/* Description Preview (Simulated) */}
        <div className="space-y-2 pt-2">
           <div className="h-3 bg-border-subtle/20 w-full rounded-sm" />
           <div className="h-3 bg-border-subtle/20 w-5/6 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
