"use client";

import Link from "next/link";
import { personalInfo, socialLinks } from "@/data";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { GitBranch, Code, Terminal, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-base border-t border-border-subtle/30 pt-16 pb-8 font-mono overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* 1. Brand Section */}
          <div className="lg:max-w-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-xs">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary tracking-tighter">
                  {personalInfo.name.toUpperCase()}
                </h3>
                <p className="text-[10px] text-text-tertiary uppercase tracking-widest">
                  v2.2.0 — STABLE_BUILD
                </p>
              </div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed opacity-80">
              {">"} Professional Front-End Architect. <br />
              {">"} Building performant, accessible web systems with precision
              and care.
            </p>
          </div>

          {/* 2. Links Section */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em] border-b border-border-subtle pb-2 block w-max">
                Nav
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link
                    href="/"
                    className="text-text-secondary hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      {">"}
                    </span>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-text-secondary hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      {">"}
                    </span>
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="text-text-secondary hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      {">"}
                    </span>
                    WORK
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em] border-b border-border-subtle pb-2 block w-max">
                Contact
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link
                    href="/contact"
                    className="text-text-secondary hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      {">"}
                    </span>
                    HIRE_ME
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-text-secondary hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      {">"}
                    </span>
                    EMAIL
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.resume}
                    className="text-text-secondary hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      {">"}
                    </span>
                    RESUME
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Status Section */}
          <div className="flex flex-col items-start lg:items-end gap-6">
            <div className="space-y-2 text-left lg:text-right">
              <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em]">
                Deploy Status
              </span>
              <PowerlineGroup className="lg:justify-end">
                <PowerlineSegment color="surface" direction="left">
                  <span className="flex items-center gap-1.5 text-[10px]">
                    <GitBranch className="w-3 h-3" />
                    prod
                  </span>
                </PowerlineSegment>
                <PowerlineSegment
                  color="success"
                  direction="right"
                  showArrow={false}
                >
                  <span className="text-[10px]">ONLINE</span>
                </PowerlineSegment>
              </PowerlineGroup>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-1.5 grayscale opacity-50">
              <div className="text-[9px] text-text-tertiary flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>
                  SYNC_COMPLETE:{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="text-[9px] text-text-tertiary flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                <span>LOCAL_TIME: UTC+2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <p className="text-[10px] text-text-tertiary tracking-widest uppercase">
              © {currentYear} AMR_ELSHABRAWY // NEON_PORTFOLIO_V2
            </p>
            <p className="text-[8px] text-text-tertiary/50 uppercase tracking-tighter">
              Crafted with Next.js 16 + GSAP + Tailwind 4
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.platform}
                className="w-9 h-9 flex items-center justify-center text-text-tertiary hover:text-primary hover:bg-primary/5 transition-all border border-border-subtle/30 hover:border-primary/50 rounded-xs"
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
