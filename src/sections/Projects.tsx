"use client";

import { motion, Variants } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image?: string;
  featured?: boolean;
};

interface ProjectsProps {
  projects: Project[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white mb-3 text-center">
            Featured Projects
          </h2>

          <p className="text-zinc-500 text-sm text-center">
            A selection of my recent work — exploring AI, finance, and developer tools.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
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

        {/* View All Link */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/harshverma-25"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white border border-white/10 rounded-full hover:border-emerald-500/50 hover:bg-white/5 transition-all duration-300"
          >
            <span>View all on GitHub</span>
            <HiOutlineArrowNarrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}