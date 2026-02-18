import { personSchema } from "@/lib/metadata";
import { HeroSection } from "@/components/Sections/HeroSection";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      <HeroSection />
    </>
  );
}
