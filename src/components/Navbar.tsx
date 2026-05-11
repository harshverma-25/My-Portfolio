"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiCode, HiClipboardList, HiMail, HiMenu, HiX, HiArrowRight } from "react-icons/hi";
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
  { name: "Contact", href: "#contact", icon: HiMail },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/harshverma-25", icon: FaGithub },
  { name: "X", href: "https://twitter.com/harshverma_25", icon: FaXTwitter },
  { name: "LinkedIn", href: "https://linkedin.com/in/harshverma-25", icon: FaLinkedinIn },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on scroll or click
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
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
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between w-full max-w-[650px] bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 shadow-2xl"
      >
        {/* Logo */}
        <Link 
          href="#home" 
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="text-sm font-bold text-white tracking-tighter"
        >
          harsh<span className="opacity-40">.dev</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.slice(1);
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isActive ? "text-white bg-white/10" : "text-white/50 hover:text-white"
                )}
                aria-label={link.name}
              >
                <Icon size={18} />
              </Link>
            );
          })}
          
          <div className="w-px h-4 bg-white/10 mx-1" />
          
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/40 hover:text-white transition-colors"
              aria-label={link.name}
            >
              <link.icon size={16} />
            </a>
          ))}

          <div className="w-px h-4 bg-white/10 mx-1" />

          <Link
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Hire Me
            <HiArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 text-white/60 hover:text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-[120%] left-0 right-0 p-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl md:hidden flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    activeSection === link.href.slice(1) ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  <link.icon size={18} />
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
              <div className="h-px bg-white/10 my-1 mx-2" />
              <div className="flex items-center justify-around py-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/40 hover:text-white transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
              
              <Link
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-xl text-sm font-bold uppercase tracking-wider"
              >
                Hire Me
                <HiArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}