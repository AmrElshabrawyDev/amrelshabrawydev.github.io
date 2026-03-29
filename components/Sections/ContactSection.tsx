"use client";

import { useState, FormEvent, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import Confetti from "react-confetti";
import { personalInfo, socialLinks, contactData } from "@/data";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    tl.fromTo(".gsap-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(".gsap-contact-content",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.2, 
        ease: "power2.out" 
      },
      "-=0.3"
    );
  }, { scope: containerRef });

  useGSAP(() => {
    if (status === "success" && successRef.current) {
      gsap.fromTo(successRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(".gsap-check-icon",
        { scale: 0 },
        { scale: 1, duration: 0.5, delay: 0.2, ease: "back.out(1.7)" }
      );
    }
  }, [status]);

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: personalInfo.email,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setShowConfetti(true);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
      console.error("EmailJS error:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section ref={containerRef} className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div className="gsap-header opacity-0 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            {contactData.header.title.first}{" "}
            <span className="gradient-text">
              {contactData.header.title.highlight}
            </span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {contactData.header.description}
          </p>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            {contactData.header.subDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="gsap-contact-content opacity-0">
            <GlassCard variant="strong" className="p-8">
              {status === "success" ? (
                <div
                  ref={successRef}
                  className="relative flex flex-col items-center justify-center py-12 text-center"
                >
                  {showConfetti && <Confetti recycle={false} numberOfPieces={200} gravity={0.08} initialVelocityY={30}/>}
                  <div className="gsap-check-icon mb-6">
                    <CheckCircle className="w-16 h-16 text-success" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {contactData.successMessage.title}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {contactData.successMessage.description}
                  </p>
                  <Button
                    onClick={() => {
                      setStatus("idle");
                      setShowConfetti(false);
                    }}
                    variant="outline"
                  >
                    {contactData.successMessage.buttonText}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      {contactData.form.labels.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={contactData.form.placeholders.name}
                      className="bg-bg-base/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      {contactData.form.labels.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={contactData.form.placeholders.email}
                      className="bg-bg-base/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      {contactData.form.labels.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={contactData.form.placeholders.message}
                      className="bg-bg-base/50 resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-error text-sm">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full gap-2 cursor-pointer"
                    size="lg"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {contactData.form.buttonText.loading}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {contactData.form.buttonText.idle}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>

          {/* Contact Info */}
          <div className="gsap-contact-content opacity-0 space-y-6">
            {/* Contact Methods */}
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <GlassCard key={link.platform} variant="hover" className="p-4">
                  <a
                    href={link.url}
                    target={link.platform !== "Resume" ? "_blank" : undefined}
                    rel={
                      link.platform !== "Resume"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500/20 transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary group-hover:text-primary-400 transition-colors">
                        {link.platform}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {link.username}
                      </div>
                    </div>
                  </a>
                </GlassCard>
              ))}
            </div>

            {/* Availability Badge */}
            <GlassCard variant="default" className="p-4 mt-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
                </span>
                <span className="text-text-secondary">
                  {personalInfo.availability}
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
