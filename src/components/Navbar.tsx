"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX, HiArrowRight } from "react-icons/hi";
import { navLinks, socialLinks } from "../data/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    pathname === "/projects" ? "projects" : "home"
  );

  // Sync active section when on /projects
  useEffect(() => {
    if (pathname === "/projects") {
      setActiveSection("projects");
    }
  }, [pathname]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Active section highlighting with IntersectionObserver (only on home)
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/") {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      router.push("/" + href);
      return;
    }

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
    <div className="fixed top-5 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center justify-between w-full max-w-[680px] bg-black/65 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
      >
        {/* Logo */}
        <Link 
          href="/#home" 
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 group"
          aria-label="Harsh Verma Portfolio"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
          <span>harsh<span className="text-emerald-400">.dev</span></span>
        </Link>

        {/* Desktop Links with smooth gliding layoutId active pill */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.slice(1);
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={cn(
                  "relative p-2.5 rounded-full transition-colors flex items-center justify-center text-sm",
                  isActive ? "text-emerald-400" : "text-zinc-400 hover:text-white"
                )}
                aria-label={link.name}
                title={link.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={18} className="relative z-10" />
              </Link>
            );
          })}
          
          <div className="w-px h-4 bg-white/10 mx-1.5" />
          
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors rounded-full hover:bg-white/5"
              aria-label={link.name}
              title={link.name}
            >
              <link.icon size={15} />
            </a>
          ))}

          <div className="w-px h-4 bg-white/10 mx-1.5" />

          <Link
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-black rounded-full text-[11px] font-bold uppercase tracking-wider hover:from-emerald-400 hover:to-teal-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300"
          >
            Hire Me
            <HiArrowRight size={13} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[125%] left-0 right-0 p-3 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl md:hidden flex flex-col gap-1 shadow-2xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    activeSection === link.href.slice(1)
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
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
                    className="p-2.5 text-zinc-400 hover:text-emerald-400 rounded-full hover:bg-white/5 transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
              
              <Link
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="mt-1 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black rounded-2xl text-sm font-bold uppercase tracking-wider shadow-lg"
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
