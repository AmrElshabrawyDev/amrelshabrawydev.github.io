import React from "react";

export function ProjectSkeleton() {
  return (
    <div className="terminal-card animate-pulse">
      <div className="terminal-header flex items-center justify-between">
        <div className="h-3 w-24 bg-secondary/10" />
      </div>
      
      <div className="aspect-video bg-bg-base/50 border-b border-border-subtle" />

      <div className="p-6 space-y-6">
        <div className="h-6 bg-secondary/20 w-3/4" />
        
        <div className="space-y-3">
          <div className="h-4 bg-secondary/10 w-full" />
          <div className="h-4 bg-secondary/10 w-5/6" />
        </div>

        <div className="flex gap-2">
          <div className="h-8 w-16 bg-secondary/5" />
          <div className="h-8 w-16 bg-secondary/5" />
          <div className="h-8 w-16 bg-secondary/5" />
        </div>

        <div className="pt-4 border-t border-border-subtle flex justify-between">
          <div className="h-4 w-20 bg-secondary/10" />
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-secondary/10" />
            <div className="h-6 w-6 bg-secondary/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
