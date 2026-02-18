"use client";

export function ProjectSkeleton() {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-primary-500/10" />

      <div className="p-6">
        {/* Title */}
        <div className="flex justify-between mb-4">
          <div className="h-7 bg-primary-500/20 rounded w-3/4" />
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-primary-500/10 rounded" />
            <div className="h-5 w-12 bg-primary-500/10 rounded" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-primary-500/10 rounded w-full" />
          <div className="h-4 bg-primary-500/10 rounded w-5/6" />
        </div>

        {/* Languages bar */}
        <div className="h-2 bg-primary-500/10 rounded-full mb-4" />

        {/* Tags */}
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-20 bg-primary-500/10 rounded-full" />
          <div className="h-6 w-16 bg-primary-500/10 rounded-full" />
          <div className="h-6 w-24 bg-primary-500/10 rounded-full" />
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-4 border-t border-border-subtle">
          <div className="h-4 w-24 bg-primary-500/10 rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-primary-500/10 rounded" />
            <div className="h-8 w-8 bg-primary-500/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
