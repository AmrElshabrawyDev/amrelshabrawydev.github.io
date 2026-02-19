"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { personalInfo, socialLinks, contactData } from "@/data";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fadeInUp, staggerContainer } from "@/components/Layout/PageTransition";

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

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
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <GlassCard variant="strong" className="p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-6"
                  >
                    <CheckCircle className="w-16 h-16 text-success" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {contactData.successMessage.title}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {contactData.successMessage.description}
                  </p>
                  <Button onClick={() => setStatus("idle")} variant="outline">
                    {contactData.successMessage.buttonText}
                  </Button>
                </motion.div>
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
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-6">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
