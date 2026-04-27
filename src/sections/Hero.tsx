"use client";

import { motion, Variants } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { contact } from "../data/contact";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center section-container pt-20 pb-24"
    >
      {/* Availability pill */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 text-xs text-zinc-500 border border-white/[0.08] rounded-full px-3 py-1.5 bg-zinc-900/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
      >
        Harsh Verma
      </motion.h1>

      {/* Role */}
      <motion.p
        custom={0.18}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-xl text-blue-400 font-medium mb-5"
      >
        Full Stack Developer
      </motion.p>

      {/* Tagline */}
      <motion.p
        custom={0.26}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-zinc-400 text-base leading-relaxed max-w-xl mb-10"
      >
        I build fast, accessible, and well-crafted web applications — from
        clean UIs to scalable backends. Currently exploring distributed systems
        and developer tooling.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={0.34}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center gap-3 mb-12"
      >
        <a
          href="#projects"
          id="hero-view-projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium transition-colors duration-200"
        >
          View Projects
          <HiArrowRight size={14} />
        </a>
        <a
          href="/resume.pdf"
          id="hero-resume"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-300 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <FaFileAlt size={14} />
          Resume
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        custom={0.42}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-4"
      >
        <a
          href={contact.github}
          id="hero-github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-zinc-500 hover:text-white transition-colors duration-200"
        >
          <FaGithub size={18} />
        </a>
        <a
          href={contact.linkedin}
          id="hero-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-zinc-500 hover:text-white transition-colors duration-200"
        >
          <FaLinkedin size={18} />
        </a>
        <a
          href={`mailto:${contact.email}`}
          id="hero-email"
          aria-label="Email"
          className="text-zinc-500 text-sm hover:text-white transition-colors duration-200"
        >
          {contact.email}
        </a>
      </motion.div>
    </section>
  );
}