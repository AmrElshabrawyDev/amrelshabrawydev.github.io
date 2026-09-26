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
import { CaseStudyView } from "@/components/Sections/CaseStudies/CaseStudyView";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { caseStudies, getCaseStudy } from "@/data/projects";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/metadata";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

import { getOpenSourceProjects, getProjectReadme } from "@/lib/github";

interface Props {
  params: Promise<{ slug: string }>;
}

// Fetch project data (now using direct library call and on-demand README)
async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const projects = await getOpenSourceProjects();
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

  const study = getCaseStudy(slug);
  if (study) {
    return buildMetadata({
      title: study.title,
      description: study.summary,
      path: `/work/${study.slug}`,
      image: study.cover,
      imageAlt: study.coverAlt,
      imageSize: [1600, 1000],
      type: "article",
    });
  }

  const project = await fetchProject(slug);
  if (!project) {
    return { title: "Project Not Found", robots: { index: false } };
  }

  return buildMetadata({
    title: `${project.title} — Open-Source Project`,
    description:
      project.description === "No description available."
        ? `${project.title}: an open-source ${project.language} project by ${SITE_NAME}.`
        : project.description,
    path: `/work/${slug}`,
    image: project.image,
    type: "article",
  });
}

export async function generateStaticParams() {
  const projects = await getOpenSourceProjects();
  const slugs = new Set([
    ...caseStudies.map((study) => study.slug),
    ...projects.map((project) => generateSlug(project.title)),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const study = getCaseStudy(slug);
  if (study) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: study.title,
            description: study.summary,
            url: absoluteUrl(`/work/${study.slug}`),
            image: absoluteUrl(study.cover),
            dateCreated: study.year,
            creator: { "@id": absoluteUrl("/#person") },
            keywords: [...study.services, ...study.stack].join(", "),
          })}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: study.title, path: `/work/${study.slug}` },
            ]),
          )}
        />
        <CaseStudyView study={study} />
      </>
    );
  }

  const project = await fetchProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-base">
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
        <Link
          href="/work"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 border border-border-default backdrop-blur-sm bg-bg-base/50 text-text-primary hover:bg-bg-elevated transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      {/* Project Content */}
      <div className="container-custom -mt-20 relative z-10 pb-20">
        <article className="terminal-card p-6 md:p-12">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="heading-natural text-4xl md:text-5xl font-bold text-primary mb-4">
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
                  className="px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
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
              <div className="markdown-body bg-bg-elevated/50 rounded-lg p-6 max-w-none [&_a_img]:inline-block!">
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

        <div className="mt-16">
          <CtaBanner source={`repo_${slug}`} />
        </div>
      </div>
    </div>
  );
}
