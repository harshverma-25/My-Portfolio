"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "DSA", href: "#dsa" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold text-white hover:text-blue-400 transition-colors duration-200"
        >
          harsh<span className="text-blue-400">.</span>dev
        </Link>

        {/* Desktop nav */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={itemVariants}>
              <Link
                href={link.href}
                className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white rounded-md hover:bg-white/[0.05] transition-all duration-200"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile burger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block w-5 h-px bg-zinc-400 transition-all duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-zinc-400 transition-all duration-200 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-zinc-400 transition-all duration-200 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 text-sm text-zinc-400 hover:text-white rounded-md hover:bg-white/[0.05] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}