"use client";

import Link from "next/link";
import { Mail, MessageCircle, MapPin, Clock, FileText, Rss } from "lucide-react";
import { personalInfo, serviceData, socialLinks } from "@/data";
import { featuredCaseStudies } from "@/data/projects";
import { SOCIAL, whatsappLink } from "@/lib/site";
import { generateSlug } from "@/lib/utils";
import { trackLead } from "@/lib/analytics";
import { LogoIcon } from "@/components/ui/LogoIcon";

const serviceLinks = serviceData.slice(0, 4).map((service) => ({
  label: service.title,
  href: `/services#${generateSlug(service.title)}`,
}));

const workLinks = featuredCaseStudies.slice(0, 4).map((study) => ({
  // "Kosovo Travels — Travel & Booking…" → "Kosovo Travels"
  label: study.title.split(" — ")[0],
  href: `/work/${study.slug}`,
}));

function FooterColumn({
  title,
  links,
  more,
}: {
  title: string;
  links: { label: string; href: string }[];
  more?: { label: string; href: string };
}) {
  return (
    <nav aria-label={title}>
      <h2 className="font-mono text-xs! font-bold uppercase tracking-[0.2em] text-secondary mb-5">
        {title}
      </h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-text-secondary hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
        {more && (
          <li>
            <Link
              href={more.href}
              className="text-sm font-semibold text-primary hover:text-secondary"
            >
              {more.label} →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-base border-t border-border-default font-[family-name:var(--font-inter)]">
      <div className="container-custom pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 lg:gap-10">
          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Home">
              <LogoIcon className="w-11 h-11" />
              <span className="text-lg font-bold text-text-primary">{personalInfo.name}</span>
            </Link>
            <p className="text-sm! leading-relaxed text-text-secondary max-w-xs">
              Freelance React &amp; Next.js developer building fast, SEO-ready
              websites, online stores and web apps — in Arabic &amp; English.
            </p>
            <p className="inline-flex items-center gap-2 border border-success/30 bg-success/10 px-3 py-1.5 text-xs! font-semibold text-success!">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {personalInfo.availability}
            </p>
          </div>

          <FooterColumn
            title="Services"
            links={serviceLinks}
            more={{ label: "All services", href: "/services" }}
          />
          <FooterColumn
            title="Work"
            links={workLinks}
            more={{ label: "All case studies", href: "/work" }}
          />

          {/* Contact */}
          <div>
            <h2 className="font-mono text-xs! font-bold uppercase tracking-[0.2em] text-secondary mb-5">
              Contact
            </h2>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${SOCIAL.email}`}
                  onClick={() => trackLead("email_footer")}
                  className="flex items-center gap-3 text-text-primary hover:text-primary break-all"
                >
                  <Mail className="w-4 h-4 shrink-0 text-primary" />
                  {SOCIAL.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead("whatsapp_footer")}
                  className="flex items-center gap-3 text-text-primary hover:text-success"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 text-success" />
                  <span dir="ltr">+20 120 254 6653</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 shrink-0" />
                Cairo, Egypt — working worldwide
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <Clock className="w-4 h-4 shrink-0" />
                Replies within 24 hours
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — extra bottom padding keeps the icons clear of the floating WhatsApp button */}
      <div className="border-t border-border-subtle">
        <div className="container-custom py-6 pb-24 sm:pb-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-5">
          <p className="text-xs! text-text-tertiary text-center sm:text-left">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5 sm:mr-36">
            <Link
              href="/blog"
              className="text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-primary"
            >
              Blog
            </Link>
            <a
              href="/rss.xml"
              aria-label="RSS feed"
              title="RSS feed"
              className="text-text-tertiary hover:text-warning"
            >
              <Rss className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.resume}
              download
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-primary"
            >
              <FileText className="w-4 h-4" /> CV
            </a>
            <span aria-hidden className="w-px h-5 bg-border-default" />
            {socialLinks
              .filter((social) => ["GitHub", "LinkedIn"].includes(social.platform))
              .map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  title={social.platform}
                  className="text-text-tertiary hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
