"use client";

import { personalInfo, socialLinks } from "@/data";
import { MapPin, CheckCircle, Terminal } from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-base border-t border-border-subtle py-6">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Status Bar Section */}
          <div className="flex flex-wrap items-stretch justify-center lg:justify-start flex-1">
            <PowerlineGroup>
              <PowerlineSegment
                color="primary"
                icon={<Terminal className="w-4 h-4" />}
              >
                {personalInfo.name.toUpperCase()}
              </PowerlineSegment>

              <PowerlineSegment
                color="info"
                icon={<MapPin className="w-4 h-4" />}
              >
                {personalInfo.location.toUpperCase()}
              </PowerlineSegment>

              <PowerlineSegment
                color="success"
                icon={<CheckCircle className="w-4 h-4" />}
              >
                {personalInfo.availability.toUpperCase()}
              </PowerlineSegment>

              <PowerlineSegment color="surface">
                © {currentYear}
              </PowerlineSegment>
            </PowerlineGroup>
          </div>

          {/* Social Links Section */}
          <div className="flex items-center lg:justify-end flex-1">
            <PowerlineGroup>
              <PowerlineSegment color="surface" className="text-text-tertiary">
                SOCIAL
              </PowerlineSegment>

              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:no-underline"
                >
                  <PowerlineSegment
                    color="accent"
                    icon={social.icon}
                    className="px-4"
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
