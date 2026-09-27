"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { personalInfo } from "@/data";
import { whatsappLink } from "@/lib/site";
import { trackLead } from "@/lib/analytics";
import { LogoIcon } from "../ui/LogoIcon";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close the mobile menu on navigation (state adjusted during render)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-200 ${
        // No backdrop-blur while open: it would become the containing block of the fixed menu
        isOpen
          ? "bg-bg-base border-border-default"
          : scrolled
            ? "bg-bg-base/90 backdrop-blur-md border-border-default"
            : "bg-bg-base border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="container-custom h-20 flex items-center justify-between gap-6 font-[family-name:var(--font-inter)]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${personalInfo.name} — home`}>
          <LogoIcon
            className="w-10 h-10 transition-transform duration-200 hover:scale-105"
            // the intro film's logo flies here
            data-intro-target=""
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-text-primary">{personalInfo.name}</span>
            <span className="font-mono text-[11px] tracking-wider text-text-tertiary">
              React &amp; Next.js developer
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 bg-primary transition-transform duration-200 origin-left ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="btn-primary h-11! px-5! text-xs!"
            onClick={() => trackLead("contact_header")}
          >
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="lg:hidden p-2 -mr-2 text-text-primary hover:text-primary transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-bg-base overflow-y-auto font-[family-name:var(--font-inter)]"
        >
          <div className="container-custom py-8 flex flex-col gap-8">
            <ul className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...navLinks, { href: "/contact", label: "Contact" }].map(
                (link) => {
                  const active = link.href === "/" ? pathname === "/" : isActive(link.href);
                  return (
                    <li key={link.href} className="border-b border-border-subtle">
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between py-4 text-2xl font-bold ${
                          active ? "text-primary" : "text-text-primary"
                        }`}
                      >
                        {link.label}
                        {active && <span className="w-2 h-2 rounded-full bg-primary" />}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="btn-primary h-14!"
                onClick={() => trackLead("contact_mobile_menu")}
              >
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline h-14! border-success/60! text-success!"
                onClick={() => trackLead("whatsapp_mobile_menu")}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
