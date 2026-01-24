"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { colors } from "@/lib/constants/theme";
import { UserProfileMenu } from "@/components/ui/user-profile-menu";

const NAV_LINKS = [
  {
    href: "/coming-soon?title=Pricing&description=We're finalizing our pricing plans to offer the best value for individuals and teams. Check back soon!",
    label: "Pricing",
  },
  { href: "/enterprise", label: "Enterprise" },
  { href: "https://docs.almanacresearch.com", label: "Docs", external: true },
];

const RESOURCE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/careers", label: "We're Hiring!" },
];

export function Nav() {
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsMobileResourcesOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen, closeMobileMenu]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as HTMLElement;
      if (navRef.current?.contains(target)) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMobileMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [closeMobileMenu]);

  // Detect theme from data-navbar-theme sections
  useEffect(() => {
    const sections = document.querySelectorAll("[data-navbar-theme]");
    if (sections.length === 0) {
      setIsDarkBackground(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsDarkBackground(
              entry.target.getAttribute("data-navbar-theme") === "dark",
            );
            break;
          }
        }
      },
      { rootMargin: "-64px 0px -95% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    // Initial check
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom > 64) {
        setIsDarkBackground(
          section.getAttribute("data-navbar-theme") === "dark",
        );
        break;
      }
    }

    return () => observer.disconnect();
  }, []);

  const textColor = isDarkBackground ? "text-amber-50" : "text-amber-900";
  const hoverColor = isDarkBackground
    ? "hover:text-amber-100"
    : "hover:text-amber-900";
  const variant = isDarkBackground ? "dark" : "light";

  return (
    <>
      <nav
        ref={navRef}
        className="flex justify-between items-center px-4 md:px-10 py-4 border-neutral-200 backdrop-blur-md fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center space-x-12">
            <h1 className={`text-xl font-bold ${textColor}`}>
              ALMANAC RESEARCH
            </h1>

            <div className="flex items-center space-x-8 font-medium">
              {/* Resources Dropdown */}
              <div className="group relative inline-block">
                <button
                  className={`${hoverColor} ${textColor} transition flex items-center gap-2`}
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  aria-expanded={isResourcesOpen}
                  aria-haspopup="true"
                >
                  Resources
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                {isResourcesOpen && (
                  <div
                    className="absolute left-0 z-10 bg-white border border-neutral-200 rounded-lg shadow-md mt-0 w-48 overflow-hidden"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    {RESOURCE_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 hover:bg-neutral-50 hover:text-amber-900"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav Links */}
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${hoverColor} ${textColor} transition`}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <UserProfileMenu variant={variant} />
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between w-full">
          <h1 className={`text-xl font-bold ${textColor}`}>ALMANAC RESEARCH</h1>

          <div className="flex items-center gap-4">
            <UserProfileMenu variant={variant} />

            <button
              onClick={toggleMobileMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${textColor}`} />
              ) : (
                <Menu className={`h-6 w-6 ${textColor}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden fixed left-0 right-0 z-40 backdrop-blur-md border-b border-neutral-200 overflow-hidden"
            style={{
              top: "60px",
              backgroundColor: `${colors.background.cream}F2`,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col space-y-4 px-10 py-6">
              {/* Mobile Resources Dropdown */}
              <div>
                <button
                  className="flex items-center hover:text-amber-900 transition-colors w-full font-medium"
                  onClick={() =>
                    setIsMobileResourcesOpen(!isMobileResourcesOpen)
                  }
                  aria-expanded={isMobileResourcesOpen}
                  aria-haspopup="true"
                >
                  Resources
                  <motion.div
                    animate={{ rotate: isMobileResourcesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isMobileResourcesOpen && (
                    <motion.div
                      className="ml-4 mt-2 space-y-2 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      {RESOURCE_LINKS.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="block py-2 text-neutral-700 hover:text-amber-900"
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Nav Links */}
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-amber-900 transition font-medium"
                  onClick={() => !link.external && closeMobileMenu()}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
