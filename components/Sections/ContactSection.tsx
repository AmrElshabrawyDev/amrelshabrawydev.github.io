"use client";

import React, { useState, FormEvent } from "react";
import { Send, CheckCircle, Loader2, Terminal, Globe, MessageSquare } from "lucide-react";
import emailjs from "@emailjs/browser";
import Confetti from "react-confetti";
import { personalInfo, socialLinks, contactData } from "@/data";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";

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

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("Missing EmailJS configuration");
      }

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
      setErrorMessage("FAILED to send transmission. Check console for logs.");
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
    <section className="py-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex justify-center lg:justify-start animate-fade-in-left opacity-0">
          <PowerlineGroup>
            <PowerlineSegment color="secondary" icon={<MessageSquare className="w-5 h-5" />}>
              COMMUNICATION_CHANNEL.SH
            </PowerlineSegment>
            <PowerlineSegment color="surface" showArrow={false}>
              STATUS: LISTENING
            </PowerlineSegment>
          </PowerlineGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form Block */}
          <div className="terminal-card animate-fade-in-up [animation-delay:100ms] opacity-0">
            <div className="terminal-header flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-primary" />
                <div className="w-2.5 h-2.5 bg-secondary" />
                <div className="w-2.5 h-2.5 bg-accent" />
              </div>
              <span className="text-[10px] text-text-tertiary uppercase font-mono tracking-widest">secure_transmission_form</span>
            </div>

            <div className="p-8 lg:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 animate-fade-in">
                  {showConfetti && (
                    <Confetti recycle={false} numberOfPieces={200} colors={["#3b82f6", "#8b5cf6", "#10b981"]} />
                  )}
                  <div className="p-4 bg-success/10 border border-success">
                    <CheckCircle className="w-12 h-12 text-success" />
                  </div>
                  <h3 className="text-3xl font-black font-heading text-success uppercase">
                    TRANSFER_COMPLETE
                  </h3>
                  <p className="text-text-secondary font-mono">
                    {contactData.successMessage.description.toUpperCase()}
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setShowConfetti(false); }}
                    className="px-8 h-12 bg-bg-elevated border border-border-subtle hover:border-primary transition-colors text-xs font-mono font-bold uppercase tracking-widest"
                  >
                    RETURN_TO_INPUT
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                      <Terminal className="w-3 h-3" />
                      <span>SRC_NAME</span>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ENTER_NAME..."
                      className="w-full bg-bg-base/50 border border-border-subtle px-4 py-3 font-mono text-sm text-text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-text-tertiary/30"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-secondary uppercase tracking-widest">
                      <Terminal className="w-3 h-3" />
                      <span>SRC_EMAIL</span>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ENTER_EMAIL..."
                      className="w-full bg-bg-base/50 border border-border-subtle px-4 py-3 font-mono text-sm text-text-primary focus:outline-none focus:border-secondary transition-colors placeholder:text-text-tertiary/30"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
                      <Terminal className="w-3 h-3" />
                      <span>PAYLOAD_MSG</span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="ENTER_MESSAGE_DATA..."
                      rows={5}
                      className="w-full bg-bg-base/50 border border-border-subtle px-4 py-3 font-mono text-sm text-text-primary focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-text-tertiary/30"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 bg-error/10 border-l-4 border-error text-error text-[10px] font-mono font-bold uppercase tracking-widest">
                      [!] ERROR: {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-14 bg-primary text-bg-base font-black font-heading uppercase tracking-tighter hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        UPLOADING_DATA...
                      </>
                    ) : (
                      <>
                        INITIATE_TRANSFER.SH
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Social Links Block */}
          <div className="flex flex-col gap-10">
            <div className="animate-fade-in-up [animation-delay:200ms] opacity-0">
              <h3 className="text-2xl font-black font-heading uppercase text-text-primary mb-8 border-b border-border-subtle pb-4">
                {">"} CONNECTION_NODES
              </h3>
              
              <div className="grid gap-4">
                {socialLinks.map((link, idx) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group animate-fade-in-left opacity-0"
                    style={{ animationDelay: `${(idx + 5) * 100}ms` }}
                  >
                    <PowerlineGroup>
                      <PowerlineSegment color="surface" className="w-12 flex justify-center group-hover:bg-bg-elevated transition-colors">
                        {link.icon}
                      </PowerlineSegment>
                      <PowerlineSegment color="secondary" className="px-6 group-hover:bg-primary group-hover:text-bg-base transition-colors">
                        {link.platform.toUpperCase()}
                      </PowerlineSegment>
                      <PowerlineSegment color="surface" showArrow={false} className="flex-1 text-[10px] text-text-tertiary overflow-hidden whitespace-nowrap">
                        {link.username.toUpperCase()}
                      </PowerlineSegment>
                    </PowerlineGroup>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="animate-fade-in-up [animation-delay:300ms] opacity-0">
              <PowerlineGroup>
                <PowerlineSegment color="success" className="h-16 px-8 animate-pulse-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-bg-base animate-ping" />
                    LIVE_STATUS: {personalInfo.availability.toUpperCase()}
                  </div>
                </PowerlineSegment>
                <PowerlineSegment color="surface" showArrow={false} className="h-16 flex items-center px-6">
                  <Globe className="w-5 h-5" />
                </PowerlineSegment>
              </PowerlineGroup>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
