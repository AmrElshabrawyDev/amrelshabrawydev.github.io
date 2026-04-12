"use client";

import Link from "next/link";
import { personalInfo, socialLinks } from "@/data";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { GitBranch, User, Code, Terminal, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-base border-t border-border-subtle/30 pt-12 pb-8 font-mono overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand/Status Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-sm">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary tracking-tighter">
                  {personalInfo.name.toUpperCase()}
                </h3>
                <p className="text-[10px] text-text-tertiary uppercase tracking-widest">
                  v2.0.0 — PRODUCTION_BUILD
                </p>
              </div>
            </div>

            <div className="p-4 bg-bg-elevated/30 border border-border-subtle/50 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary opacity-50" />
              <div className="flex items-center gap-2 mb-2 text-text-tertiary text-[10px] uppercase tracking-widest">
                <Terminal className="w-3 h-3" />
                <span>status.sh</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {">"} system_online: true <br />
                {">"} build_status: success <br />
                {">"} visibility: available_for_hire
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em]">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/" className="text-text-secondary hover:text-primary transition-colors">/HOME</Link></li>
                <li><Link href="/about" className="text-text-secondary hover:text-primary transition-colors">/ABOUT</Link></li>
                <li><Link href="/services" className="text-text-secondary hover:text-primary transition-colors">/SERVICES</Link></li>
                <li><Link href="/work" className="text-text-secondary hover:text-primary transition-colors">/WORK</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em]">Contact</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/contact" className="text-text-secondary hover:text-primary transition-colors">/HIRE_ME</Link></li>
                <li><a href={`mailto:${personalInfo.email}`} className="text-text-secondary hover:text-primary transition-colors">/EMAIL</a></li>
                <li><a href={personalInfo.resume} className="text-text-secondary hover:text-primary transition-colors">/RESUME</a></li>
              </ul>
            </div>
          </div>

          {/* Prompt Section (Simplified) */}
          <div className="lg:col-span-3 flex flex-col justify-end items-end space-y-4">
             <PowerlineGroup className="flex justify-end opacity-80 hover:opacity-100 transition-opacity">
                <PowerlineSegment color="surface" direction="left">
                   <span className="flex items-center gap-1.5 text-[10px]">
                      <GitBranch className="w-3 h-3" />
                      main
                   </span>
                </PowerlineSegment>
                <PowerlineSegment color="success" direction="right" showArrow={false}>
                   <span className="text-[10px]">READY</span>
                </PowerlineSegment>
             </PowerlineGroup>
             <div className="text-[10px] text-text-tertiary flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>LAST_SYNC: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             </div>
          </div>
        </div>

        {/* Bottom Bar: copyright + social tokens */}
        <div className="pt-8 border-t border-border-subtle/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-text-tertiary tracking-widest uppercase">
            © {currentYear} ALL_RIGHTS_RESERVED // ENCRYPTED_BY_NEON
          </p>

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.platform}
                className="w-10 h-10 flex items-center justify-center text-text-tertiary hover:text-primary hover:bg-primary/5 transition-all border border-transparent hover:border-border-subtle"
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
