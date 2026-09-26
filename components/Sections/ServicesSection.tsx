"use client";

import React from "react";
import { serviceData } from "@/data";
import { Cpu } from "lucide-react";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { useRef } from "react";

export function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);

  useSectionReveal(container, ".gsap-reveal", {
    stagger: 0.15,
    y: 20,
    scale: 0.99,
  });

  return (
    <section
      ref={container}
      className="py-24 bg-bg-base relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 flex justify-center lg:justify-start gsap-reveal opacity-0">
          <PowerlineGroup>
            <PowerlineSegment color="info" icon={<Cpu className="w-5 h-5" />}>
              CAPABILITIES_INDEX.LOG
            </PowerlineSegment>
            <PowerlineSegment color="surface">
              FIXED QUOTES · AR / EN
            </PowerlineSegment>
          </PowerlineGroup>
        </div>

        <div className="mb-16 max-w-3xl gsap-reveal opacity-0">
          <h1 className="heading-natural text-4xl md:text-6xl font-extrabold mb-6">
            Web development services for growing businesses
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-lg">
            Next.js websites, online stores on Next.js or Salla, WordPress
            migrations, dashboards, speed and SEO. You work directly with me,
            get a fixed quote upfront, and own everything at the end.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceData.map((service) => (
            <div
              key={service.title}
              className="terminal-card gsap-reveal opacity-0"
            >
              <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-info">{service.icon}</div>
                  <h2 className="heading-natural text-base md:text-lg font-bold text-text-primary px-2">
                    {service.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <p className="text-text-secondary text-base leading-relaxed font-[family-name:var(--font-inter)]">
                  {service.description}
                </p>
                <p className="text-xs font-mono text-text-tertiary">
                  <span className="text-secondary font-bold uppercase tracking-widest">
                    Ideal for:
                  </span>{" "}
                  {service.idealFor}
                </p>

                <div className="pt-6 border-t border-border-subtle">
                  <h3 className="text-[10px]! text-text-tertiary font-mono font-bold uppercase tracking-[0.2em] mb-4">
                    What you get
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-center gap-3 text-xs text-text-secondary font-mono hover:text-info transition-colors"
                      >
                        <span className="text-info font-bold">▶</span>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
