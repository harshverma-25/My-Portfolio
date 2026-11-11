"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import { 
  FiFolder
} from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";
import { Project } from "@/data/projects";

export type { Project };

interface ProjectsProps {
  projects: Project[];
  autoPlayInterval?: number;
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on main-project flag
  const { displayMain } = useMemo(() => {
    const isMain = (p: Project) => p["main-project"] === true || p.mainProject === true;
    const mains = projects.filter(isMain);
    // Showcase top 3 main projects (fallback to first 3 if none flagged)
    const mainList = mains.length > 0 ? mains.slice(0, 3) : projects.slice(0, 3);
    return { displayMain: mainList };
  }, [projects]);

  return (
    <section
      id="projects"
      className="w-full px-5 sm:px-8"
    >
      <div className="relative mx-auto max-w-3xl border-t border-zinc-800/80 pt-8 sm:pt-9 pb-8 sm:pb-9">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <h2 className="text-2xl font-normal text-white tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
              Projects
            </h2>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
              Shipped to production
            </p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
          >
            <span>All ({projects.length})</span>
            <HiArrowRight className="group-hover:translate-x-0.5 transition-transform" size={13} />
          </Link>
        </motion.div>

        {/* Main Projects List (Full-Width Horizontal Cards) */}
        <div className="flex flex-col gap-6">
          {displayMain.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="w-full"
            >
              <ProjectCard 
                project={project} 
                badge={`0${idx + 1}`}
                onSelectProject={setSelectedProject}
              />
            </motion.div>
          ))}
        </div>

        {/* More Projects Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/[0.08]"
            id="more-projects-btn"
          >
            <FiFolder className="text-zinc-400 group-hover:text-white" size={15} />
            <span>More Projects</span>
            <span className="rounded-full bg-white/[0.06] border border-white/10 px-2 py-0.5 font-mono text-[11px] text-zinc-300">
              {projects.length}
            </span>
            <HiArrowRight className="text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" size={14} />
          </Link>
        </div>
      </div>

      {/* Deep Dive & Architecture Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
