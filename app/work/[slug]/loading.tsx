export default function ProjectLoading() {
  return (
    <main className="min-h-screen bg-bg-base">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] w-full bg-bg-elevated animate-pulse">
        <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/60 to-bg-base/20" />

        {/* Back Button Skeleton */}
        <div className="absolute top-8 left-8 z-10">
          <div className="h-10 w-40 bg-bg-overlay rounded-lg" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-custom -mt-32 relative z-10 pb-20">
        <div className="glass-card p-8 md:p-12 animate-pulse">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="h-12 bg-primary-500/20 rounded-lg w-3/4 mb-4" />
              <div className="h-6 bg-primary-500/10 rounded w-full mb-2" />
              <div className="h-6 bg-primary-500/10 rounded w-5/6" />
            </div>

            <div className="flex gap-3 shrink-0">
              <div className="h-12 w-32 bg-primary-500/20 rounded-lg" />
              <div className="h-12 w-32 bg-primary-500/10 rounded-lg" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8 p-4 rounded-lg bg-bg-elevated/50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 w-24 bg-primary-500/10 rounded" />
            ))}
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <div className="h-6 w-32 bg-primary-500/20 rounded mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-9 w-20 bg-primary-500/10 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <div className="h-6 w-28 bg-primary-500/20 rounded mb-4" />
            <div className="h-4 rounded-full bg-primary-500/10 mb-4" />
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500/20" />
                  <div className="h-4 w-20 bg-primary-500/10 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* README */}
          <div className="border-t border-border-subtle pt-8">
            <div className="h-8 w-32 bg-primary-500/20 rounded mb-6" />
            <div className="bg-bg-elevated/50 rounded-lg p-6 space-y-4">
              <div className="h-8 bg-primary-500/10 rounded w-1/2" />
              <div className="h-4 bg-primary-500/10 rounded w-full" />
              <div className="h-4 bg-primary-500/10 rounded w-5/6" />
              <div className="h-4 bg-primary-500/10 rounded w-4/5" />
              <div className="h-4 bg-primary-500/10 rounded w-full" />
              <div className="h-4 bg-primary-500/10 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
