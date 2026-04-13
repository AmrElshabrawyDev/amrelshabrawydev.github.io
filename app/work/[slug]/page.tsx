import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  HardDrive,
  BookOpen,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { formatDate, generateSlug } from "@/lib/utils";
import type { Project } from "@/types/github";
import { markdownComponents } from "@/components/ui/markdown-components";

import { getAllProjects, getProjectReadme } from "@/lib/github";

interface Props {
  params: Promise<{ slug: string }>;
}

// Fetch project data (now using direct library call and on-demand README)
async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const projects = await getAllProjects();
    const project =
      projects.find((p) => generateSlug(p.title) === slug) || null;

    if (project) {
      // Fetch README only for this specific project
      const readme = await getProjectReadme(
        project.fullName,
        project.defaultBranch,
      );
      project.readme = readme;
    }

    return project;
  } catch (error) {
    console.error("[ProjectPage] Error fetching project:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Amr Elshabrawy",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Amr Elshabrawy`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: generateSlug(project.title),
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-base">
      {/* Hero Section with Project Image */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKp79S29wAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/60 to-bg-base/20" />

        {/* Back Button */}
        <Link href="/work" className="absolute top-8 left-8 z-10">
          <button className="flex items-center gap-2 px-4 py-2 border border-border-default backdrop-blur-sm bg-bg-base/50 text-text-primary hover:bg-bg-elevated transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </Link>
      </div>

      {/* Project Content */}
      <div className="container-custom -mt-20 relative z-10 pb-20">
        <article className="glass-card md:p-12">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl">
                {project.description}
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 h-12 bg-primary text-bg-base font-bold hover:brightness-110 transition-all text-sm"
              >
                <Github className="w-5 h-5 mr-2" />
                View Code
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 h-12 border border-primary text-primary font-bold hover:bg-primary/10 transition-all text-sm"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </header>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-warning" />
              <span>{project.stars} stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-info" />
              <span>{project.forks} forks</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              <span>{project.size}</span>
            </div>
          </div>

          {/* Technologies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 text-xs font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Languages Chart */}
          {project.languages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Languages</h2>
              <div className="flex gap-0.5 h-4 rounded-full overflow-hidden mb-4">
                {project.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {project.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-text-tertiary">
                      {lang.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* README Content */}
          {project.readme && (
            <section className="border-t border-border-subtle pt-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> README
              </h2>
              <div className="markdown-body bg-bg-elevated/50 rounded-lg p-6 prose prose-invert prose-blue max-w-none [&_a_img]:inline-block!">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  urlTransform={(uri) =>
                    uri.startsWith("http") || uri.startsWith("data:")
                      ? uri
                      : `https://raw.githubusercontent.com/${project.fullName}/${project.defaultBranch}/${uri.replace(/^\.\//, "")}`
                  }
                  components={markdownComponents}
                >
                  {project.readme.full}
                </ReactMarkdown>
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
