"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, Check, Cpu, Users } from "lucide-react";
import { serviceData } from "@/data";
import { generateSlug } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";

export function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);

  useSectionReveal(container, ".gsap-reveal", { stagger: 0.12, y: 20, scale: 0.99 });

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".service-index-item", { opacity: 0, x: 24, duration: 0.5, stagger: 0.07, delay: 0.2 });
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="pb-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center pb-12 md:pb-16">
          <PageHeader
            className="pb-0! md:pb-0!"
            label="SERVICES"
            icon={<Cpu className="w-4 h-4" />}
            meta="FIXED QUOTES · AR / EN"
            title="Web development services for growing businesses"
            intro="Next.js websites, online stores on Next.js or Salla, WordPress migrations, dashboards, speed and SEO. You work directly with me, get a fixed quote upfront, and own everything at the end."
          />

          {/* Service index: jump links to each card */}
          <nav aria-label="Services on this page" className="terminal-card lg:mt-16 font-[family-name:var(--font-inter)]">
            <div className="terminal-header flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                services.list
              </span>
              <span className="font-mono text-[10px] text-text-tertiary">{serviceData.length} items</span>
            </div>
            <ol className="divide-y divide-border-subtle">
              {serviceData.map((service, index) => (
                <li key={service.title} className="service-index-item">
                  <a
                    href={`#${generateSlug(service.title)}`}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-primary/5"
                  >
                    <span className="font-mono text-xs text-text-tertiary group-hover:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-text-primary">{service.title}</span>
                    <ArrowDownRight className="w-4 h-4 text-text-tertiary transition-transform group-hover:text-primary group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[family-name:var(--font-inter)]">
          {serviceData.map((service, index) => (
            <article
              key={service.title}
              id={generateSlug(service.title)}
              className="terminal-card p-6 md:p-8 flex flex-col gap-6 scroll-mt-28 gsap-reveal opacity-0"
            >
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-14 h-14 shrink-0 border border-info/40 bg-info/10 text-info [&_svg]:w-7 [&_svg]:h-7">
                  {service.icon}
                </span>
                <div className="flex-1">
                  <span className="block font-mono text-xs text-text-tertiary mb-1">
                    {String(index + 1).padStart(2, "0")} / {String(serviceData.length).padStart(2, "0")}
                  </span>
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
