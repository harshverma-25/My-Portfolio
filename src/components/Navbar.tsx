"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FolderLock, 
  Cpu, 
  Database, 
  GraduationCap, 
  Send, 
  Menu, 
  X,
  Home
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Projects", href: "#projects", icon: FolderLock },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Education", href: "#education", icon: GraduationCap },
];

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
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
      { threshold: 0.4, rootMargin: "-80px 0px -50% 0px" }
    );

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll with offset
  const handleSmoothScroll = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>, 
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = scrolled ? 80 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      window.history.pushState(null, "", href);
      setIsOpen(false);
    }
  }, [scrolled]);

  // Handle logo click
  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6">
      {/* Main Pill Container */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "flex items-center justify-between w-full max-w-[600px]",
          "bg-zinc-950/60 backdrop-blur-xl",
          "border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]",
          "rounded-full px-5 py-2 relative"
        )}
      >
        {/* Subtle Inner Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-2 group z-10">
          <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-[10px] font-black text-black">H</span>
          </div>
          <span className="text-sm font-semibold text-zinc-100 tracking-tight">
            harsh<span className="text-cyan-400">.</span>dev
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 z-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative px-3 py-1.5 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <span className="relative z-10">{link.name}</span>
              <motion.span 
                className="absolute inset-0 bg-white/10 rounded-full -z-0 opacity-0 group-hover:opacity-100"
                layoutId="nav-pill-hover"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:block z-10">
          <Link 
            href="#contact" 
            className="px-4 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[12px] font-bold rounded-full border border-cyan-500/20 transition-all active:scale-95"
          >
            Connect
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-zinc-400 hover:text-white z-10"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-[120%] left-0 right-0 p-2 bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                  >
                    <link.icon size={16} className="text-cyan-500/50" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}