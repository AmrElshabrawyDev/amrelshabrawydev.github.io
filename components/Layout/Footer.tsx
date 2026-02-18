import Link from "next/link";
import Image from "next/image";
import { personalInfo, socialLinks } from "@/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-elevated border-t border-border-subtle">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side: Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt={personalInfo.name}
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-text-tertiary text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Right Side: Social Icons */}
          <ul className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target={social.platform !== "Resume" ? "_blank" : undefined}
                  rel={
                    social.platform !== "Resume"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-text-secondary hover:text-primary-400 transition-colors transform hover:-translate-y-1"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
