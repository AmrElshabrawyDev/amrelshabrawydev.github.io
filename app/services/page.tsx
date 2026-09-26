import { Metadata } from "next";
import {
  servicesMetadata,
  professionalServiceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/metadata";
import { jsonLd } from "@/lib/seo";
import { faqData } from "@/data";
import { ServicesSection } from "@/components/Sections/ServicesSection";
import { ProcessSection, FaqSection } from "@/components/Sections/Home/HomeSections";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata: Metadata = servicesMetadata;

export default function ServicesPage() {
  return (
    <>
      {[
        professionalServiceSchema,
        faqSchema(faqData),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      ))}

      <ServicesSection />
      <ProcessSection />
      <FaqSection />

      <section className="pb-24 bg-bg-base">
        <div className="container-custom">
          <CtaBanner
            source="services"
            title="Not sure which service you need?"
            text="Describe your business and goal in a few lines. I'll recommend the simplest solution that works — and send a fixed quote."
          />
        </div>
      </section>
    </>
  );
}
