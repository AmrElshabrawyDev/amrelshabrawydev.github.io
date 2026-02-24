"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Close menu on route change (use pathname only)
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      // always schedule closing after navigation commit
      const raf = requestAnimationFrame(() => setIsOpen(false));
      return () => cancelAnimationFrame(raf);
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Efficient scroll handler using rAF
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  // Use functional toggle to avoid stale state
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-md md:hidden"
            id="mobile-menu"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`text-2xl font-heading font-medium transition-colors ${
                      pathname === link.href
                        ? "gradient-text"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button asChild size="lg" className="gap-2 mt-4">
                  <a href={personalInfo.resume} download onClick={closeMenu}>
                    <Download className="w-5 h-5" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isOpen
            ? "bg-bg-base border-transparent shadow-none"
            : "bg-bg-base/80 backdrop-blur-lg",
          !isOpen && scrolled
            ? "border-border-subtle shadow-md"
            : "border-transparent",
          !isOpen && !scrolled && "border-transparent",
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center"
              onClick={isOpen ? closeMenu : undefined}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Image
                  src="/logo.svg"
                  alt={personalInfo.name}
                  width={42}
                  height={42}
                  priority
                  className="h-10 w-10"
                />
              </motion.div>
              <span className="ml-1 text-sm font-semibold text-text-primary hidden sm:inline-block font-heading">
                {personalInfo.name.slice(4)}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-primary-400"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Button asChild size="sm" className="gap-2">
                <a href={personalInfo.resume} download>
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-text-primary hover:text-primary-400 transition-colors relative z-50"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
