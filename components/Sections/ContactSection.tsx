"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  AlertCircle,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { personalInfo, socialLinks } from "@/data";
import { SOCIAL, whatsappLink } from "@/lib/site";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { trackLead } from "@/lib/analytics";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const emptyForm: FormData = { name: "", email: "", projectType: "", budget: "", message: "" };

const projectTypes = [
  "Business website",
  "Online store (Next.js or Salla)",
  "WordPress → Next.js migration",
  "Web app / dashboard",
  "Speed or SEO fix",
  "Something else",
];

const budgets = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];

const nextSteps = [
  "I read your message and reply within 24 hours.",
  "A short call or chat to understand your goals.",
  "A fixed price and timeline in writing — no surprises.",
];

const fieldClass =
  "w-full bg-bg-base border border-border-default px-4 py-3 text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-text-primary">
        {label}
        {optional && <span className="font-normal text-text-tertiary"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export function ContactSection() {
  const container = useRef<HTMLDivElement>(null);

  useSectionReveal(container, ".gsap-reveal", { stagger: 0.1, y: 20, scale: 0.99 });

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [sentName, setSentName] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS configuration");
      }

      // Project type and budget are also added to the message body, so the
      // existing EmailJS template shows them without any template changes.
      const details = [
        formData.projectType && `Project type: ${formData.projectType}`,
        formData.budget && `Budget: ${formData.budget}`,
      ]
        .filter(Boolean)
        .join("\n");

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.projectType,
          budget: formData.budget,
          message: details ? `${details}\n\n${formData.message}` : formData.message,
          to_email: personalInfo.email,
        },
        publicKey,
      );

      setSentName(formData.name.split(" ")[0]);
      setStatus("success");
      trackLead("contact_form");
      setFormData(emptyForm);
    } catch (error) {
      setStatus("error");
      console.error("EmailJS error:", error);
    }
  };

  const directLinks = socialLinks.filter((link) =>
    ["LinkedIn", "GitHub", "Resume"].includes(link.platform),
  );

  return (
    <section ref={container} className="py-16 md:py-24 bg-bg-base relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-8 gsap-reveal opacity-0">
          <PowerlineGroup>
            <PowerlineSegment color="secondary" icon={<MessageSquare className="w-4 h-4" />}>
              CONTACT
            </PowerlineSegment>
            <PowerlineSegment color="surface">REPLY IN &lt; 24H</PowerlineSegment>
          </PowerlineGroup>
        </div>

        <div className="mb-14 max-w-3xl gsap-reveal opacity-0">
          <h1 className="heading-natural text-4xl md:text-6xl font-extrabold mb-6">
            Let&apos;s talk about your project
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-lg!">
            Tell me what you want to build and roughly your budget. I&apos;ll
            reply within 24 hours with honest advice and a fixed quote — no
            obligation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-12 items-start font-[family-name:var(--font-inter)]">
          {/* Form */}
          <div className="terminal-card gsap-reveal opacity-0">
            <div className="terminal-header flex items-center justify-between">
              <div className="flex gap-2" aria-hidden>
                <span className="w-2.5 h-2.5 bg-primary" />
                <span className="w-2.5 h-2.5 bg-secondary" />
                <span className="w-2.5 h-2.5 bg-accent" />
              </div>
              <span className="text-[11px] text-text-tertiary font-mono tracking-widest">
                new-project.md
              </span>
            </div>

            <div className="p-6 md:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10 gap-5" role="status">
                  <CheckCircle2 className="w-14 h-14 text-success" />
                  <h2 className="heading-natural font-[inherit]! text-2xl md:text-3xl font-bold">
                    Thanks{sentName ? `, ${sentName}` : ""}! Your message is on its way.
                  </h2>
                  <p className="max-w-md">
                    I&apos;ll reply within 24 hours. Need a faster answer? Message
                    me on WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      onClick={() => trackLead("whatsapp_contact_success")}
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <button type="button" onClick={() => setStatus("idle")} className="btn-outline">
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field id="name" label="Your name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={fieldClass}
                      />
                    </Field>
                    <Field id="email" label="Email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field id="projectType" label="What do you need?">
                      <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`${fieldClass} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Choose a project type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                      </div>
                    </Field>
                    <Field id="budget" label="Budget" optional>
                      <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`${fieldClass} appearance-none pr-10`}
                      >
                        <option value="">Choose a range</option>
                        {budgets.map((budget) => (
                          <option key={budget}>{budget}</option>
                        ))}
                      </select>
                        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                      </div>
                    </Field>
                  </div>

                  <Field id="message" label="Tell me about your project">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What does your business do, what should the website achieve, and when do you need it?"
                      className={`${fieldClass} resize-y min-h-36`}
                    />
                  </Field>

                  {status === "error" && (
                    <div
                      role="alert"
                      className="flex gap-3 items-start p-4 border border-accent/50 bg-accent/10 text-sm text-text-primary"
                    >
                      <AlertCircle className="w-5 h-5 text-accent shrink-0" />
                      <span>
                        Sorry, the message couldn&apos;t be sent. Please email me at{" "}
                        <a href={`mailto:${SOCIAL.email}`} className="underline">
                          {SOCIAL.email}
                        </a>{" "}
                        or message me on WhatsApp.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full h-14! text-base! disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-xs! text-text-tertiary text-center">
                    Your details are only used to reply to you.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Direct contact */}
          <aside className="space-y-6">
            <div className="terminal-card p-6 md:p-8 gsap-reveal opacity-0 border-success/40!">
              <p className="eyebrow mb-3 text-success!">Fastest reply</p>
              <h2 className="heading-natural font-[inherit]! text-2xl font-bold mb-2">
                Prefer a quick chat?
              </h2>
              <p className="text-sm! mb-6">Message me on WhatsApp for a faster answer.</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead("whatsapp_contact")}
                className="flex items-center justify-center gap-2 h-14 bg-success text-bg-base font-bold hover:text-bg-base hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
              <p className="mt-3 text-center text-sm! text-text-secondary" dir="ltr">
                +20 120 254 6653
              </p>
            </div>

            <div className="terminal-card p-6 md:p-8 gsap-reveal opacity-0">
              <h2 className="font-mono text-xs! font-bold uppercase tracking-[0.2em] text-secondary mb-5">
                Other ways to reach me
              </h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href={`mailto:${SOCIAL.email}`}
                    onClick={() => trackLead("email_contact")}
                    className="flex items-center gap-3 text-text-primary hover:text-primary break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-primary" /> {SOCIAL.email}
                  </a>
                </li>
                {directLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-text-primary hover:text-primary"
                    >
                      <span className="text-primary [&_svg]:w-4 [&_svg]:h-4">{link.icon}</span>
                      {link.platform === "Resume" ? "Download my CV" : link.platform}
                      <ArrowUpRight className="w-3.5 h-3.5 text-text-tertiary" />
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-text-secondary pt-2 border-t border-border-subtle">
                  <MapPin className="w-4 h-4 shrink-0" /> Cairo, Egypt — working worldwide
                </li>
                <li className="flex items-center gap-3 text-text-secondary">
                  <Clock className="w-4 h-4 shrink-0" /> Replies within 24 hours
                </li>
              </ul>
            </div>

            <div className="terminal-card p-6 md:p-8 gsap-reveal opacity-0">
              <h2 className="font-mono text-xs! font-bold uppercase tracking-[0.2em] text-secondary mb-5">
                What happens next
              </h2>
              <ol className="space-y-4">
                {nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm">
                    <span className="flex items-center justify-center w-7 h-7 shrink-0 border border-primary/50 text-primary font-mono font-bold text-xs">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-text-secondary">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
