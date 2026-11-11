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
  const isMain = (p: Project) => p["main-project"] === true || p.mainProject === true;

  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 md:pt-32">
      <main className="flex-1 px-5 sm:px-8 max-w-3xl mx-auto w-full pb-20">
        
        {/* Navigation Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Overview</span>
          </Link>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col gap-6">
          {projects.map((project, idx) => {
            const mainFlag = isMain(project);
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="w-full"
              >
                <ProjectCard
                  project={project}
                  badge={mainFlag ? `Main 0${idx + 1}` : undefined}
                  onSelectProject={setSelectedProject}
                />
              </motion.div>
            );
          })}
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
