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
    scale: 0.99
  });

  return (
    <section ref={container} className="py-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 flex justify-center lg:justify-start gsap-reveal opacity-0">
          <PowerlineGroup>
            <PowerlineSegment color="info" icon={<Cpu className="w-5 h-5" />}>
              CAPABILITIES_INDEX.LOG
            </PowerlineSegment>
            <PowerlineSegment color="surface" showArrow={false}>
              SERVICES_VERB_LEVEL_P0
            </PowerlineSegment>
          </PowerlineGroup>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceData.map((service, idx) => (
            <div
              key={service.title}
              className="terminal-card gsap-reveal opacity-0"
            >
              <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-info">{service.icon}</div>
                  <span className="text-[10px] text-text-primary font-mono font-bold uppercase tracking-widest px-2">
                    {service.title.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <p className="text-text-secondary text-sm leading-relaxed font-mono">
                  {">"} {service.description.toUpperCase()}
                </p>

                <div className="pt-6 border-t border-border-subtle">
                  <div className="text-[10px] text-text-tertiary font-mono font-bold uppercase tracking-[0.2em] mb-4">
                    core_deliverables
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-center gap-3 text-xs text-text-secondary font-mono hover:text-info transition-colors"
                      >
                        <span className="text-info font-bold">▶</span>
                        <span>{deliverable.toUpperCase()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-bg-base/40 border-t border-border-subtle flex justify-end">
                <PowerlineGroup>
                  <PowerlineSegment
                    color="info"
                    className="h-6 text-[10px] px-3"
                  >
                    OPTIMIZED
                  </PowerlineSegment>
                  <PowerlineSegment
                    color="surface"
                    className="h-6 text-[10px] px-3"
                    showArrow={false}
                  >
                    v3.1.0
                  </PowerlineSegment>
                </PowerlineGroup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
