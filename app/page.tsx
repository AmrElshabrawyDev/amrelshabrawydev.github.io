import type { Metadata } from "next";
import {
  homeMetadata,
  personSchema,
  websiteSchema,
  professionalServiceSchema,
} from "@/lib/metadata";
import { jsonLd } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { HeroSection } from "@/components/Sections/HeroSection";
import {
  StatsBar,
  ServicesPreview,
  FeaturedWork,
  ProcessSection,
  Testimonials,
  LatestPosts,
  FaqSection,
} from "@/components/Sections/Home/HomeSections";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* JSON-LD for SEO */}
      {/* FAQPage schema lives on /services only, to avoid duplicate FAQ markup */}
      {[personSchema, websiteSchema, professionalServiceSchema].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd(schema)}
          />
        ),
      )}

      <HeroSection />
      <StatsBar />
      <ServicesPreview />
      <FeaturedWork />
      <ProcessSection />
      <Testimonials />
      <LatestPosts posts={latestPosts} />
      <FaqSection />

      <section className="pb-24 bg-bg-base">
        <div className="container-custom">
          <CtaBanner
            source="home"
            title="Ready to get a website that brings you clients?"
          />
        </div>
      </section>
    </>
  );
}
