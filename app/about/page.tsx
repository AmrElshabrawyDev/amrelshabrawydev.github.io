import { Metadata } from "next";
import { aboutMetadata, personSchema } from "@/lib/metadata";
import { jsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { AboutSection } from "@/components/Sections/AboutSection";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata: Metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: absoluteUrl("/about"),
          mainEntity: personSchema,
        })}
      />
      <AboutSection />
      <section className="pb-24 bg-bg-base">
        <div className="container-custom">
          <CtaBanner source="about" title="Let's build something together" />
        </div>
      </section>
    </>
  );
}
