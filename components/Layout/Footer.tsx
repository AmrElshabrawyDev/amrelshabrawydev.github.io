"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { personalInfo, socialLinks } from "@/data";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Logo Hover Animation
  const { contextSafe } = useGSAP({ scope: footerRef });
  const handleLogoEnter = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      rotate: 10,
      scale: 1.05,
      duration: 0.4,
      ease: "back.out(1.7)",
    });
  });
  const handleLogoLeave = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
  });

  // Social Icons Animation
  useGSAP(() => {
    gsap.fromTo(".gsap-social-icon",
      { opacity: 0, y: 10 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "power2.out" 
      }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      aria-label="Site Footer"
      className="relative bg-bg-elevated border-t border-border-subtle backdrop-blur-lg"
    >
      {/* ✨ Gradient Glow Border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary-500/0 via-primary-500/70 to-accent-500/0 blur-[2px]" />

      <div className="container-custom py-3 md:py-5 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Brand + Copyright */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div
                ref={logoBoxRef}
                onMouseEnter={handleLogoEnter}
                onMouseLeave={handleLogoLeave}
              >
                <Image
                  src="/logo.svg"
                  alt={personalInfo.name}
                  width={42}
                  height={42}
                  priority
                  className="h-10 w-10"
                />
              </div>
              <span className="ml-1 text-sm font-semibold text-text-primary hidden sm:inline-block">
                {personalInfo.name.slice(4)}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-text-tertiary text-xs md:text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <nav aria-label="Social media">
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <div
                  key={social.platform}
                  className="gsap-social-icon opacity-0"
                >
                  <a
                    href={social.url}
                    target={social.platform !== "Resume" ? "_blank" : undefined}
                    rel={
                      social.platform !== "Resume"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-text-secondary hover:text-primary-400 transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500/30 rounded-sm inline-block"
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
