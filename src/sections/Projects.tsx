"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiChevronDown, 
  FiFolder, 
  FiGithub, 
  FiExternalLink,
  FiStar 
} from "react-icons/fi";
import { Project } from "@/data/projects";

export type { Project };

interface ProjectsProps {
  projects: Project[];
  autoPlayInterval?: number;
}

export default function Projects({ projects, autoPlayInterval = 8000 }: ProjectsProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [showMore, setShowMore] = useState(false);

  // Filter projects based on main-project flag
  const { displayMain, moreProjects } = useMemo(() => {
    const isMain = (p: Project) => p["main-project"] === true || p.mainProject === true;
    const mains = projects.filter(isMain);
    // Showcase top 3 main projects (fallback to first 3 if none marked)
    const mainList = mains.length > 0 ? mains.slice(0, 3) : projects.slice(0, 3);
    const moreList = projects.filter((p) => !mainList.includes(p));
    return { displayMain: mainList, moreProjects: moreList };
  }, [projects]);

  const totalMain = displayMain.length;

  const nextProject = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (totalMain > 0 ? (prev + 1) % totalMain : 0));
  }, [totalMain]);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (totalMain > 0 ? (prev === 0 ? totalMain - 1 : prev - 1) : 0));
  }, [totalMain]);

  // Clamp current index if totalMain changes
  useEffect(() => {
    if (current >= totalMain && totalMain > 0) {
      setCurrent(0);
    }
  }, [current, totalMain]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalMain <= 1) return;
    
    const interval = setInterval(nextProject, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextProject, autoPlayInterval, totalMain]);

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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1 mb-4">
            <FiStar className="text-emerald-400 fill-emerald-400" size={12} />
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Featured Work
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Selected{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-lg mx-auto">
            A curated selection of primary full-stack applications and distributed systems built for scale and real-world impact.
          </p>
        </motion.div>

        {/* Project Slider (Main 3 Projects) */}
        {totalMain > 0 && (
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
                <ProjectCard project={displayMain[current]} />
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
                  <span className="text-emerald-500 font-bold">
                    {String(current + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 opacity-20">/</span>
                  <span>{String(totalMain).padStart(2, "0")}</span>
                </motion.div>

                <div className="hidden md:flex gap-1.5">
                  {displayMain.map((_, idx) => (
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
                      aria-label={`Go to project ${idx + 1}`}
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
        )}

        {/* More Projects Option */}
        {moreProjects.length > 0 && (
          <div className="mt-14 flex flex-col items-center">
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/[0.08] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] active:scale-95"
              id="toggle-more-projects"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{showMore ? "Show Less Projects" : "Explore More Projects"}</span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-xs text-emerald-400">
                +{moreProjects.length}
              </span>
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  showMore ? "rotate-180" : ""
                }`}
                size={16}
              />
            </button>

            {/* Expandable More Projects Grid */}
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full mt-12 overflow-hidden"
                >
                  <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-semibold mb-1">
                        Archive & Other Works
                      </p>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        Additional Projects
                      </h3>
                    </div>
                    <a
                      href="https://github.com/harshverma-25?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
                    >
                      <span>Explore all repositories</span>
                      <FiExternalLink size={12} />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {moreProjects.map((project, idx) => (
                      <motion.div
                        key={project.title + idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-zinc-900/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                      >
                        <div>
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-emerald-400 group-hover:border-emerald-500/30 group-hover:scale-105 transition-all">
                              <FiFolder size={18} />
                            </div>
                            <div className="flex items-center gap-3 text-zinc-400">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-emerald-400 transition-colors"
                                  aria-label={`${project.title} GitHub repository`}
                                >
                                  <FiGithub size={16} />
                                </a>
                              )}
                              {project.live && (
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-emerald-400 transition-colors"
                                  aria-label={`${project.title} Live Preview`}
                                >
                                  <FiExternalLink size={16} />
                                </a>
                              )}
                            </div>
                          </div>

                          <h4 className="mb-2 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {project.title}
                          </h4>

                          <p className="mb-6 text-xs leading-relaxed text-zinc-400 font-light line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                          {project.tech.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}