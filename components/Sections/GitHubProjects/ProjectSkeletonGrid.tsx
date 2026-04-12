import { ProjectSkeleton } from "./ProjectSkeleton";

export function ProjectSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(6)].map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  );
}
