import { Metadata } from "next";
import { aboutMetadata } from "@/lib/metadata";
import { AboutSection } from "@/components/Sections/AboutSection";

export const metadata: Metadata = aboutMetadata;

export default function AboutPage() {
  return <AboutSection />;
}
