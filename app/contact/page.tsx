import { Metadata } from "next";
import { contactMetadata } from "@/lib/metadata";
import { ContactSection } from "@/components/Sections/ContactSection";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return <ContactSection />;
}
