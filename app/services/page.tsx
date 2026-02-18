import { Metadata } from "next";
import { servicesMetadata } from "@/lib/metadata";
import { ServicesSection } from "@/components/Sections/ServicesSection";

export const metadata: Metadata = servicesMetadata;

export default function ServicesPage() {
  return <ServicesSection />;
}
