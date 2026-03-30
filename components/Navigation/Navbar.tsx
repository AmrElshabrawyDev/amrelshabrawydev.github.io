"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download, User, Terminal } from "lucide-react";
import { personalInfo } from "@/data";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";

const navLinks = [
  { href: "/", label: "HOME", color: "secondary" as const },
  { href: "/about", label: "ABOUT", color: "surface" as const },
  { href: "/services", label: "SERVICES", color: "surface" as const },
  { href: "/work", label: "WORK", color: "surface" as const },
  { href: "/contact", label: "CONTACT", color: "surface" as const },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Close menu on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setIsOpen(false);
    }
  }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-bg-base/80 backdrop-blur-md border-b border-border-subtle" : "bg-transparent"
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Powerline Nav Bar (Desktop) */}
          <div className="hidden md:flex items-stretch">
            <PowerlineGroup>
              <Link href="/">
                <PowerlineSegment color="primary" icon={<User className="w-4 h-4" />}>
                  {personalInfo.name.split(" ")[0].toUpperCase()}
                </PowerlineSegment>
              </Link>
              
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <PowerlineSegment 
                    color={pathname === link.href ? "secondary" : "surface"}
                    className={`transition-all ${
link.href ? "font-bold text-secondary" : "text-text-secondary"
                    }`}
                  >
                    {link.label}
                  </PowerlineSegment>
                </Link>
              ))}

              <a href={personalInfo.resume} download>
                <PowerlineSegment color="warning" icon={<Download className="w-4 h-4" />}>
                  CV.EXE
                </PowerlineSegment>
              </a>
            </PowerlineGroup>
          </div>

          {/* Logo (Mobile) */}
          <Link href="/" className="md:hidden flex items-center gap-2">
            <div className="bg-primary p-1">
              <Terminal className="w-5 h-5 text-bg-base" />
            </div>
            <span className="font-bold tracking-tighter text-text-primary">
              {personalInfo.name.toUpperCase()}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-text-primary hover:text-primary transition-colors z-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-bg-base flex flex-col pt-24 px-6 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-bold tracking-widest p-4 border-l-4 ${
                    pathname === link.href 
                      ? "border-secondary bg-secondary/10 text-secondary" 
                      : "border-border-subtle text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a 
                href={personalInfo.resume} 
                className="mt-4 p-4 bg-warning text-bg-base font-bold text-center flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                DOWNLOAD CV
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
