import { Menu, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { colors } from "@/lib/constants/theme";

export function Nav() {
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <>
      <nav
        className="flex justify-between items-center px-10 py-4 border-neutral-200 backdrop-blur-md sticky top-0 z-50"
        style={{ backgroundColor: `${colors.background.cream}80` }}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          <h1 className="text-xl font-bold text-amber-900">ALMANAC RESEARCH</h1>

          <div className="flex items-center space-x-8 font-medium">
            <div className="group relative inline-block">
              <button
                className="hover:text-amber-900 transition flex items-center gap-2"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                Resources
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              {/* Dropdown menu */}
              {isResourcesOpen && (
                <div
                  className="absolute left-0 z-10 bg-white border border-neutral-200 rounded-lg shadow-md mt-0 w-48 overflow-hidden"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <a
                    href="/blog"
                    className="block px-4 py-2 hover:bg-neutral-50 hover:text-amber-900"
                  >
                    Blog
                  </a>
                  <a
                    href="/coming-soon?title=Pricing&description=We're finalizing our pricing plans to offer the best value for individuals and teams. Check back soon!"
                    className="block px-4 py-2 hover:bg-neutral-50 hover:text-amber-900"
                  >
                    Pricing
                  </a>
                  <a
                    href="/enterprise"
                    className="block px-4 py-2 hover:bg-neutral-50 hover:text-amber-900"
                  >
                    Enterprise
                  </a>
                </div>
              )}
            </div>
            <a href="/about" className="hover:text-amber-900 transition">
              About Us
            </a>
            <a href="/careers" className="hover:text-amber-900 transition">
              We're Hiring!
            </a>
          </div>
        </div>

        {/* Mobile Logo & Menu Button */}
        <div className="md:hidden flex items-center justify-between w-full">
          <h1 className="text-xl font-bold text-amber-900">ALMANAC RESEARCH</h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-amber-900" />
            ) : (
              <Menu className="h-6 w-6 text-amber-900" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
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
              {/* Resources with Dropdown in Mobile */}
              <div>
                <button
                  className="flex items-center hover:text-amber-900 transition-colors w-full font-medium"
                  onClick={() =>
                    setIsMobileResourcesOpen(!isMobileResourcesOpen)
                  }
                >
                  Resources
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: isMobileResourcesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
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
                      <a
                        href="/blog"
                        className="block py-2 text-neutral-700 hover:text-amber-900"
                      >
                        Blog
                      </a>
                      <a
                        href="/coming-soon?title=Pricing&description=We're finalizing our pricing plans to offer the best value for individuals and teams. Check back soon!"
                        className="block py-2 text-neutral-700 hover:text-amber-900"
                      >
                        Pricing
                      </a>
                      <a
                        href="/enterprise"
                        className="block py-2 text-neutral-700 hover:text-amber-900"
                      >
                        Enterprise
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/about"
                className="hover:text-amber-900 transition font-medium"
              >
                About Us
              </a>
              <a
                href="/careers"
                className="hover:text-amber-900 transition font-medium"
              >
                We're Hiring!
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
