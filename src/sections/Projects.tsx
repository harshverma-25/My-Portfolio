"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  autoPlayInterval?: number;
}

export default function Projects({ projects, autoPlayInterval = 8000 }: ProjectsProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const nextProject = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [projects.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextProject, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextProject, autoPlayInterval]);

  const handleUserInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    const timeout = setTimeout(() => setIsAutoPlaying(true), 15000);
    return () => clearTimeout(timeout);
  }, []);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    }),
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black py-20 px-6 md:px-12 lg:px-24"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-emerald-500 font-medium">
            Featured Work
          </p>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Selected{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Project Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ProjectCard project={projects[current]} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-mono text-zinc-500"
              >
                <span className="text-emerald-500 font-bold">{String(current + 1).padStart(2, "0")}</span>
                <span className="mx-2 opacity-20">/</span>
                <span>{String(projects.length).padStart(2, "0")}</span>
              </motion.div>

              <div className="hidden md:flex gap-1.5">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > current ? 1 : -1);
                      setCurrent(idx);
                      handleUserInteraction();
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === current ? "w-8 bg-emerald-500" : "w-2 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  prevProject();
                  handleUserInteraction();
                }}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] text-white hover:bg-emerald-500 hover:text-black transition-all"
                aria-label="Previous project"
              >
                <FiChevronLeft size={18} />
              </button>

              <button
                onClick={() => {
                  nextProject();
                  handleUserInteraction();
                }}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] text-white hover:bg-emerald-500 hover:text-black transition-all"
                aria-label="Next project"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}