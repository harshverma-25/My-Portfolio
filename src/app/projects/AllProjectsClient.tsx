"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import Footer from "@/components/Footer";
import { FiArrowLeft } from "react-icons/fi";
import { Project } from "@/data/projects";

interface AllProjectsClientProps {
  projects: Project[];
}

export default function AllProjectsClient({ projects }: AllProjectsClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "flagship" | "other">("all");
  const isMain = (p: Project) => p["main-project"] === true || p.mainProject === true;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "flagship") return isMain(p);
    if (activeFilter === "other") return !isMain(p);
    return true;
  });

  const flagshipCount = projects.filter(isMain).length;
  const otherCount = projects.length - flagshipCount;

  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 md:pt-32">
      <main className="flex-1 px-5 sm:px-8 max-w-3xl mx-auto w-full pb-20">
        
        {/* Navigation Back Link & Title */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group mb-4"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Overview</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-wide font-serif" style={{ fontFamily: "var(--font-serif)" }}>
                Selected Deployments
              </h1>
              <p className="text-xs font-mono text-zinc-400 mt-1.5 uppercase tracking-wider">
                Full-stack applications, distributed systems &amp; developer tools
              </p>
            </div>

            {/* Filter Pills */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFilter === "all" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setActiveFilter("flagship")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFilter === "flagship" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"
                }`}
              >
                Flagship ({flagshipCount})
              </button>
              <button
                onClick={() => setActiveFilter("other")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFilter === "other" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"
                }`}
              >
                Web &amp; Tools ({otherCount})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
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
      </main>

      {/* Deep Dive & Architecture Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer />
    </div>
  );
}
