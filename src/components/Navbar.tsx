"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiCode, HiClipboardList, HiUser, HiMenu, HiX, HiArrowRight } from "react-icons/hi";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "#home", icon: HiHome },
  { name: "Projects", href: "#projects", icon: HiCode },
  { name: "Skills", href: "#skills", icon: HiClipboardList },
  { name: "About", href: "#about", icon: HiUser },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: FaGithub },
  { name: "X (Twitter)", href: "https://twitter.com", icon: FaXTwitter },
  { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
];

export default function FloatingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Active section highlighting with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" }
    );

    navLinks.forEach((link) => {
      const href = link.href.slice(1);
      const element = document.getElementById(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll with offset
  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        window.history.pushState(null, "", href);
        setIsMobileMenuOpen(false);
      }
    },
    []
  );

  // Handle logo/home click (scroll to top)
  const handleHomeClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setActiveSection("home");
      setIsMobileMenuOpen(false);
    },
    []
  );

  return (
    <div className="fixed top-5 left-0 right-0 z-[100] flex justify-center px-4 sm:px-6">
      {/* Floating Pill Container - Dark/Transparent Theme */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 18 }}
        className={cn(
          "flex items-center justify-between w-full max-w-[680px]",
          "bg-black/40 backdrop-blur-xl",
          "border border-white/10",
          "rounded-full px-4 py-1.5",
          "shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
          "transition-all duration-300",
          "hover:border-white/15 hover:bg-black/45"
        )}
      >
        {/* Left Section - Logo */}
        <Link 
          href="#home" 
          onClick={handleHomeClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors group"
        >
          <span className="text-sm font-bold tracking-tighter text-white">
            harsh<span className="text-white/40 group-hover:text-white/60 transition-colors">.dev</span>
          </span>
        </Link>

        <div className="hidden md:block h-4 w-px bg-white/10 mx-1" />

        {/* Middle Section - Navigation Icons */}
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.slice(1);
            const isHome = link.name === "Home";
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={isHome ? handleHomeClick : (e) => handleSmoothScroll(e, link.href)}
                onMouseEnter={() => setHoveredIcon(link.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={cn(
                  "relative p-2 rounded-full transition-all duration-200",
                  "hover:bg-white/10",
                  isActive && "text-white",
                  "text-white/50 hover:text-white"
                )}
                aria-label={link.name}
              >
                {/* Active Indicator - Minimal dot */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon
                  size={18}
                  className={cn(
                    "transition-all duration-200",
                    isActive && "scale-105",
                    hoveredIcon === link.name && !isActive && "scale-105"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Middle Divider - Thin vertical line */}
        <div className="h-4 w-px bg-white/15" />

        {/* Right Section - Social Links */}
        <div className="flex items-center gap-0.5">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  "hover:bg-white/10",
                  "text-white/40 hover:text-white"
                )}
                aria-label={link.name}
              >
                <Icon size={16} className="transition-transform hover:scale-105" />
              </Link>
            );
          })}
        </div>

        {/* Right Section - Hire Me Button (Desktop) */}
        <div className="hidden md:flex items-center gap-2 ml-1">
          <div className="h-4 w-px bg-white/10 mr-1" />
          <Link
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Hire Me
            <HiArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Toggle - Only visible on small screens */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors -mr-1"
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiX size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiMenu size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Dropdown Menu - Glass morphism style */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[110%] left-0 right-0 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-0.5">
                {/* Navigation Links */}
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.href.slice(1);
                  const isHome = link.name === "Home";
                  
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (isHome) {
                            handleHomeClick(e);
                          } else {
                            handleSmoothScroll(e, link.href);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150",
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Icon size={16} />
                        <span className="text-sm font-medium tracking-wide">{link.name}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-1 h-1 rounded-full bg-white"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider */}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Social Links */}
                <div className="flex items-center justify-around px-4 py-2">
                  {socialLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-2.5 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
                          aria-label={link.name}
                        >
                          <Icon size={16} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Hire Me Button */}
                <div className="mt-2 px-2 pb-2">
                  <Link
                    href="#contact"
                    onClick={(e) => {
                      handleSmoothScroll(e, "#contact");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-black text-sm font-bold uppercase tracking-wider"
                  >
                    Hire Me
                    <HiArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}