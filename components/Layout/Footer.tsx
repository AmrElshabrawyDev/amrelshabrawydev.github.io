"use client";

import { personalInfo, socialLinks } from "@/data";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { GitBranch, Clock } from "lucide-react";

const terminalSessions = [
  {
    exitCode: 0,
    time: "02:42",
    command: `portfolio.sh --mode=showcase --stack="React, Next.js, TypeScript"`,
    outputs: [
      { text: "building production bundle...", color: "muted" as const },
      {
        text: "✓  compiled successfully  •  6 projects loaded",
        color: "success" as const,
      },
    ],
  },
  {
    exitCode: 0,
    time: "02:55",
    command: `contact --hire=true --remote=true --email="${personalInfo.email}"`,
    outputs: [
      { text: "connecting...", color: "muted" as const },
      {
        text: "✓  available for freelance & full-time  •  remote friendly",
        color: "success" as const,
      },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-base border-t border-border-subtle/70 py-6 font-mono">
      <div className="container-custom space-y-5">
        {terminalSessions.map((session, i) => (
          <div key={i}>
            {/* ── Prompt Bar ── */}
            <div className="flex items-stretch justify-between w-full">
              {/* Left: name + branch + path */}
              <PowerlineGroup className="flex">
                <PowerlineSegment color="surface">
                  <span className="flex items-center gap-2">
                    <span className="text-primary">≡</span>
                    <span>{personalInfo.name.toUpperCase()}</span>
                  </span>
                </PowerlineSegment>

                <PowerlineSegment color="surface">
                  <span className="flex items-center gap-1.5 text-text-secondary">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>main</span>
                  </span>
                </PowerlineSegment>

                <PowerlineSegment color="surface">
                  <span className="text-text-secondary">~</span>
                </PowerlineSegment>
              </PowerlineGroup>

              {/* Right: exit code + time */}
              <PowerlineGroup className="flex">
                <PowerlineSegment
                  color={session.exitCode === 0 ? "success" : "accent"}
                  direction="right"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{session.exitCode === 0 ? "✓" : "✗"}</span>
                    <span>{session.exitCode}</span>
                  </span>
                </PowerlineSegment>

                <PowerlineSegment color="surface" direction="right">
                  <span className="flex items-center gap-1.5 text-text-secondary">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{session.time}</span>
                  </span>
                </PowerlineSegment>
              </PowerlineGroup>
            </div>

            {/* ── Command + Output ── */}
            <div className="mt-1.5 pl-1 space-y-1">
              <div className="flex items-start gap-2">
                <span className="text-success select-none text-sm shrink-0">
                  &gt;&gt;
                </span>
                <span className="text-primary text-sm tracking-wide break-all">
                  {session.command}
                </span>
              </div>
              {session.outputs.map((line, j) => (
                <div key={j} className="pl-6">
                  <span
                    className={`text-xs tracking-wide ${
                      line.color === "success"
                        ? "text-success"
                        : "text-text-tertiary"
                    }`}
                  >
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── Divider ── */}
        <div className="border-t border-border-subtle/40" />

        {/* ── Bottom Bar: copyright + social ── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-4">
          <div className="flex flex-wrap items-stretch justify-center lg:justify-start flex-1">
            <PowerlineGroup className="flex">
              <PowerlineSegment
                color="warning"
                className="opacity-75 tracking-widest"
              >
                © {currentYear}
              </PowerlineSegment>
            </PowerlineGroup>
          </div>

          <div className="flex items-center flex-1 justify-center lg:justify-end">
            <PowerlineGroup className="flex justify-end">
              <PowerlineSegment
                direction="right"
                color="surface"
                className="text-text-secondary tracking-[0.12em] lg:order-1 order-0"
              >
                SOCIAL
              </PowerlineSegment>
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:no-underline group"
                >
                  <PowerlineSegment
                    color="accent"
                    direction="right"
                    icon={social.icon}
                    className="px-4 transition-all duration-150 hover:brightness-110 hover:-translate-y-px"
                  >
                    {social.platform.toUpperCase()}
                  </PowerlineSegment>
                </a>
              ))}
            </PowerlineGroup>
          </div>
        </div>
      </div>
    </footer>
  );
}
