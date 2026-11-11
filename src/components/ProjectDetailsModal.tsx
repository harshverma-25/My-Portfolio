"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiX, 
  FiExternalLink, 
  FiGithub, 
  FiCpu, 
  FiLayers, 
  FiCheckCircle,
  FiZap 
} from "react-icons/fi";
import { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: Props) {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/10 bg-zinc-950/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(255,255,255,0.06)] backdrop-blur-2xl z-10 scrollbar-thin scrollbar-thumb-white/10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.1] hover:scale-105 transition-all z-20"
              aria-label="Close details"
            >
              <FiX size={18} />
            </button>

            {/* Header info */}
            <div className="mb-6 pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                {project["main-project"] && (
                  <span className="rounded-full bg-white/10 border border-white/20 px-3 py-0.5 text-[11px] font-mono font-medium text-white">
                    Flagship Architecture
                  </span>
                )}
                {project.featured && !project["main-project"] && (
                  <span className="rounded-full bg-white/[0.06] border border-white/15 px-3 py-0.5 text-[11px] font-mono font-medium text-zinc-300">
                    Featured
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                {project.title}
              </h2>

              <p className="text-sm leading-relaxed text-zinc-300 font-light">
                {project.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-95"
                >
                  <span>Launch Live Platform</span>
                  <FiExternalLink size={14} />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-zinc-200 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                >
                  <FiGithub size={14} />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>

            {/* Thumbnail with browser chrome */}
            {project.image && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10 bg-zinc-900 shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-900/90 backdrop-blur-md flex items-center justify-between px-3 z-10 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[200px]">
                    {project.live ? new URL(project.live).hostname : "system-preview"}
                  </span>
                  <div className="w-6" />
                </div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover object-top pt-6"
                />
              </div>
            )}

            {/* Technical Architecture Breakdown */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiCpu className="text-zinc-300" size={17} />
                  <h3 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                    System Architecture & Engineering Highlights
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      <FiCheckCircle className="text-white flex-shrink-0 mt-1" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Decisions */}
            {project.keyDecisions && project.keyDecisions.length > 0 && (
              <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiZap className="text-zinc-300" size={17} />
                  <h3 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                    Key Architectural Decisions
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {project.keyDecisions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      <span className="text-white font-bold font-mono">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Tech Stack */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiLayers className="text-zinc-400" size={15} />
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
                  Technologies & Frameworks
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
