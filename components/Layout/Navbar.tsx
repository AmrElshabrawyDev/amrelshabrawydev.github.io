"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Download,
  Terminal,
  User,
  Cpu,
  Mail,
  FolderGit2,
} from "lucide-react";
import { personalInfo } from "@/data";
import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";
import { LogoIcon } from "../ui/LogoIcon";

const navLinks = [
  {
    href: "/",
    label: "HOME",
    icon: <Terminal className="w-4 h-4" />,
    color: "surface" as const,
  },
  {
    href: "/about",
    label: "ABOUT",
    icon: <User className="w-4 h-4" />,
    color: "surface" as const,
  },
  {
    href: "/services",
    label: "SERVICES",
    icon: <Cpu className="w-4 h-4" />,
    color: "surface" as const,
  },
  {
    href: "/contact",
    label: "CONTACT",
    icon: <Mail className="w-4 h-4" />,
    color: "surface" as const,
  },
  {
    href: "/work",
    label: "WORK",
    icon: <FolderGit2 className="w-4 h-4" />,
    color: "surface" as const,
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Adjust state during render phase if pathname changes
  // This avoids cascading renders from useEffect
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll
  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [isOpen]);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  const { oddLinks, evenLinks } = useMemo(
    () => ({
      oddLinks: navLinks.filter((_, index) => index % 2 !== 0),
      evenLinks: navLinks.filter((_, index) => index % 2 === 0),
    }),
    [],
  );

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 bg-bg-base border-b border-transparent transition-colors duration-200 ${
        scrolled && !isOpen
          ? "bg-bg-base/80 backdrop-blur-md border-border-subtle!"
          : "bg-bg-base border-transparent"
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Powerline Nav Bar (Desktop) */}
          <div className="hidden md:flex w-full">
            <PowerlineGroup className="w-full justify-between drop-shadow-[0_0_4px] drop-shadow-neon-primary">
              <div className="flex flex-1">
                <div className="flex">
                  {evenLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <PowerlineSegment
                        color={pathname === link.href ? "primary" : link.color}
                        icon={link.icon}
                        className={`transition-all ${
                          pathname === link.href
                            ? "font-bold text-base"
                            : "group duration-200 ease-linear hover:bg-accent hover:text-bg-base active:bg-primary active:text-bg-base"
                        }`}
                      >
                        {link.label}
                      </PowerlineSegment>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center flex-1">
                <Link href="/">
                  <LogoIcon className="w-14 h-14 transition-all duration-200 ease-linear hover:scale-3d hover:scale-110 active:scale-90" />
                </Link>
              </div>

              <div className="flex justify-end flex-1">
                <div className="flex">
                  {oddLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <PowerlineSegment
                        direction="right"
                        color={pathname === link.href ? "primary" : link.color}
                        icon={link.icon}
                        className={`transition-all ${
                          pathname === link.href
                            ? "font-bold text-base"
                            : "group duration-200 ease-linear hover:bg-accent hover:text-bg-base active:bg-primary active:text-bg-base"
                        }`}
                      >
                        {link.label}
                      </PowerlineSegment>
                    </Link>
                  ))}
                </div>
                <a href={personalInfo.resume} download>
                  <PowerlineSegment
                    direction="right"
                    color="surface"
                    icon={<Download className="w-4 h-4" />}
                    className={`transition-all group duration-200 ease-linear hover:bg-accent hover:text-bg-base active:bg-primary active:text-bg-base`}
                  >
                    CV.EXE
                  </PowerlineSegment>
                </a>
              </div>
            </PowerlineGroup>
          </div>

          {/* Logo (Mobile) */}
          <Link href="/" className="md:hidden flex items-center gap-2">
            <LogoIcon className="w-8 h-8" />

            <span className="font-bold tracking-tighter text-text-primary">
              {personalInfo.name.split(" ")[1].toUpperCase()}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-text-primary hover:text-primary transition-colors z-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-bg-base flex flex-col pt-24 px-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold tracking-widest p-4 border-l-4 transition-colors ${
                    pathname === link.href
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-border-subtle text-text-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={personalInfo.resume}
                download
                className="mt-4 p-4 bg-warning text-bg-base font-bold text-center flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                <Download className="w-5 h-5" />
                DOWNLOAD CV
              </a>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}
