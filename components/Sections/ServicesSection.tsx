"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { serviceData } from "@/data";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeInUp, staggerContainer } from "@/components/Layout/PageTransition";

export function ServicesSection() {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            My <span className="gradient-text">Services</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Comprehensive front-end development solutions to bring your ideas to
            life
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {serviceData.map((service, index) => (
            <motion.div key={service.title} variants={fadeInUp} custom={index}>
              <GlassCard variant="hover" className="p-8 h-full group">
                <div className="space-y-6">
                  {/* Icon */}
                  <motion.div
                    className="inline-flex p-3 rounded-xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    {service.icon}
                  </motion.div>

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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
