"use client";

import { motion, Variants } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          {/* Decorative gradient line */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>
          
          {/* Title with gradient */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-white/90 to-purple-400/70 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          
          {/* Description */}
          <p className="text-gray-500 max-w-md mx-auto">
            A selection of my recent work — exploring AI, finance, and developer tools.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={index}
            />
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/harshverma-25"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-400 hover:text-white border border-white/10 rounded-full hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 group"
          >
            <span>View all on GitHub</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}