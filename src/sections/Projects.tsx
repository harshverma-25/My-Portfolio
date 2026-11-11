"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import { 
  FiFolder, 
  FiStar
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
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <FiStar className="text-white fill-white" size={12} />
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-medium">
              Featured Work
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Main{" "}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
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
              <ProjectCard 
                project={project} 
                badge={`Main 0${idx + 1}`}
                onSelectProject={setSelectedProject}
              />
            </motion.div>
          ))}
        </div>

        {/* More Projects Section / Button -> navigates to /projects */}
        <div className="mt-14 flex flex-col items-center">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_0_35px_rgba(255,255,255,0.1)] active:scale-95"
            id="more-projects-btn"
          >
            <FiFolder className="text-zinc-300 group-hover:scale-110 group-hover:text-white transition-all" size={18} />
            <span>More Projects</span>
            <span className="rounded-full bg-white/[0.06] border border-white/15 px-2.5 py-0.5 font-mono text-xs text-zinc-300 font-medium">
              View All ({projects.length})
            </span>
            <HiArrowRight
              className="text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              size={16}
            />
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
