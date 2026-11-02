"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { 
  FiChevronDown, 
  FiFolder, 
  FiExternalLink,
  FiStar
} from "react-icons/fi";
import { Project } from "@/data/projects";

export type { Project };

interface ProjectsProps {
  projects: Project[];
  autoPlayInterval?: number;
}

export default function Projects({ projects }: ProjectsProps) {
  const [showMore, setShowMore] = useState(false);

  // Filter projects based on main-project flag
  const { displayMain, moreProjects } = useMemo(() => {
    const isMain = (p: Project) => p["main-project"] === true || p.mainProject === true;
    const mains = projects.filter(isMain);
    // Showcase top 3 main projects (fallback to first 3 if none flagged)
    const mainList = mains.length > 0 ? mains.slice(0, 3) : projects.slice(0, 3);
    const moreList = projects.filter((p) => !mainList.includes(p));
    return { displayMain: mainList, moreProjects: moreList };
  }, [projects]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <FiStar className="text-emerald-400 fill-emerald-400" size={12} />
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Featured Work
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Main{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-lg mx-auto font-light">
            A selection of my primary full-stack applications and distributed systems built for scale.
          </p>
        </motion.div>

        {/* 3 Main Projects in a 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMain.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full"
            >
              <ProjectCard project={project} badge={`Main 0${idx + 1}`} />
            </motion.div>
          ))}
        </div>

        {/* More Projects Section / Button */}
        <div className="mt-14 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMore((prev) => !prev)}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/[0.08] hover:shadow-[0_0_35px_rgba(16,185,129,0.2)] active:scale-95"
            id="more-projects-btn"
          >
            <FiFolder className="text-emerald-400 group-hover:scale-110 transition-transform" size={18} />
            <span>{showMore ? "Show Fewer Projects" : "More Projects"}</span>
            {moreProjects.length > 0 && (
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-xs text-emerald-400 font-medium">
                +{moreProjects.length}
              </span>
            )}
            <FiChevronDown
              className={`transition-transform duration-300 text-zinc-400 group-hover:text-white ${
                showMore ? "rotate-180" : ""
              }`}
              size={16}
            />
          </motion.button>

          {/* Expandable More Projects Grid */}
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full mt-12 overflow-hidden"
              >
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-semibold mb-1">
                      Archive & Additional Works
                    </p>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      More Projects
                    </h3>
                  </div>
                  <a
                    href="https://github.com/harshverma-25?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
                  >
                    <span>View all repositories on GitHub</span>
                    <FiExternalLink size={12} />
                  </a>
                </div>

                {moreProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {moreProjects.map((project, idx) => (
                      <motion.div
                        key={project.title + idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="h-full"
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-dashed border-white/10 p-8 text-center bg-white/[0.01]">
                    <p className="text-zinc-500 text-sm">
                      Upload or add more projects with <code className="text-emerald-400 font-mono text-xs">&quot;main-project&quot;: false</code> in <code className="text-zinc-300 font-mono text-xs">src/data/projects.ts</code> to display them here.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}