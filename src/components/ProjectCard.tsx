"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar, FiFolder } from "react-icons/fi";
import { Project } from "@/data/projects";

interface Props {
  project: Project;
  badge?: string;
}

export default function ProjectCard({ project, badge }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col justify-between rounded-[28px] border border-white/[0.08] bg-zinc-950/60 p-5 md:p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-900/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] h-full"
    >
      <div>
        {/* Top Header / Actions */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-emerald-400 group-hover:border-emerald-500/30 group-hover:scale-105 transition-all">
              <FiFolder size={18} />
            </div>
            {badge && (
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono font-medium text-emerald-400">
                {badge}
              </span>
            )}
            {project.featured && !badge && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
                <FiStar size={10} className="fill-emerald-400 text-emerald-400" />
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-white/[0.06] transition-all"
                aria-label={`${project.title} GitHub repository`}
                title="View Source Code"
              >
                <FiGithub size={15} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-white/[0.06] transition-all"
                aria-label={`${project.title} Live Preview`}
                title="Open Live Preview"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Thumbnail Image (if provided) */}
        {project.image && (
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-white/10 bg-zinc-950/60 shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-5 bg-zinc-900/80 backdrop-blur-md flex items-center gap-1.5 px-3 z-10 border-b border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            </div>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top pt-5 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-5 text-xs leading-relaxed text-zinc-400 font-light line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-auto">
        {project.tech.map((tech, index) => (
          <span
            key={index}
            className="rounded-full border border-white/[0.05] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}