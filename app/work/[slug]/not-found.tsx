import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="glass-card p-12 max-w-xl mx-auto">
          <FileQuestion className="w-20 h-20 mx-auto mb-6 text-text-tertiary" />
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Project Not Found
          </h1>
          <p className="text-text-secondary text-lg mb-8">
            The project you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild size="lg">
            <Link href="/work">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
