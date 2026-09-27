"use client";

import { useRef } from "react";
import { Check, Cpu, Users } from "lucide-react";
import { serviceData } from "@/data";
import { generateSlug } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";

export function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);

  useSectionReveal(container, ".gsap-reveal", { stagger: 0.12, y: 20, scale: 0.99 });

  return (
    <section ref={container} className="pb-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom">
        <PageHeader
          label="SERVICES"
          icon={<Cpu className="w-4 h-4" />}
          meta="FIXED QUOTES · AR / EN"
          title="Web development services for growing businesses"
          intro="Next.js websites, online stores on Next.js or Salla, WordPress migrations, dashboards, speed and SEO. You work directly with me, get a fixed quote upfront, and own everything at the end."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[family-name:var(--font-inter)]">
          {serviceData.map((service) => (
            <article
              key={service.title}
              id={generateSlug(service.title)}
              className="terminal-card p-6 md:p-8 flex flex-col gap-6 scroll-mt-28 gsap-reveal opacity-0"
            >
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-14 h-14 shrink-0 border border-info/40 bg-info/10 text-info [&_svg]:w-7 [&_svg]:h-7">
                  {service.icon}
                </span>
                <div>
                  <h2 className="heading-natural font-[inherit]! text-xl! md:text-2xl! font-bold mb-2">
                    {service.title}
                  </h2>
                  <p className="text-base! leading-relaxed">{service.description}</p>
                </div>
              </div>

              <p className="flex items-start gap-2 text-sm! text-text-secondary border-l-2 border-secondary pl-3">
                <Users className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>
                  <span className="font-semibold text-text-primary">Ideal for: </span>
                  {service.idealFor}
                </span>
              </p>

              <div className="mt-auto pt-6 border-t border-border-subtle">
                <h3 className="font-mono text-xs! font-bold uppercase tracking-[0.2em] text-secondary mb-4">
                  What you get
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-2.5 items-start text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
