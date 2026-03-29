"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { serviceData } from "@/data";
import { GlassCard } from "@/components/ui/glass-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // Animate Header
    tl.fromTo(".gsap-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // Animate Services Grid Cards
    tl.fromTo(".gsap-service-card",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "power2.out" 
      },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div className="gsap-header opacity-0 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            My <span className="gradient-text">Services</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Comprehensive front-end development solutions to bring your ideas to
            life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceData.map((service) => (
            <div key={service.title} className="gsap-service-card opacity-0">
              <GlassCard variant="hover" className="p-8 h-full group">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {service.icon}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
