"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight, FiCpu } from "react-icons/fi";
import { Project } from "@/data/projects";

interface Props {
  project: Project;
  badge?: string;
  onSelectProject?: (project: Project) => void;
}

export default function ProjectCard({ project, badge, onSelectProject }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for subtle spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [0, 1], [-3, 3]);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    mouseX.set(x / rect.width);
    mouseY.set(y / rect.height);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Allow clicking specific external links without opening modal
    if (target.closest("a[data-external='true']")) return;

    if (onSelectProject) {
      onSelectProject(project);
    } else if (project.live) {
      window.open(project.live, "_blank", "noopener,noreferrer");
    }
  };

  // Split title and subtitle if formatted as "Name — Subtitle" or "Name - Subtitle"
  const titleParts = project.title.split(/\s+[—–-]\s+/);
  const mainTitle = titleParts[0]?.trim() || project.title;
  const subtitle = titleParts[1]?.trim();

  // Extract clean domain for top bar
  const domainSlug = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${mainTitle.toLowerCase().replace(/\s+/g, "")}.app`;

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative w-full rounded-2xl border border-white/[0.08] bg-zinc-950/40 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden cursor-pointer"
      >
        {/* Subtle Cursor Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.04), transparent 80%)`,
          }}
        />

        {/* ── Minimal Horizontal Split ── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* ════ LEFT: Clean Image Preview ════ */}
          <div className="md:col-span-5 flex-shrink-0">
            {project.image ? (
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-zinc-900/60 shadow-sm transition-all duration-300 group-hover:border-white/20 flex flex-col">
                {/* Subtle macOS Dot Bar */}
                <div className="h-6 bg-zinc-950/90 backdrop-blur-sm flex items-center justify-between px-2.5 z-10 border-b border-white/[0.05] shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 truncate max-w-[130px]">
                    {domainSlug}
                  </span>
                  <div className="w-3" />
                </div>

                <div className="relative flex-1 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Subtle Hover Action Pill */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2 z-20 backdrop-blur-[1px]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-[11px] font-medium shadow-md">
                    <span>View Architecture</span>
                    <FiArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-[16/10] rounded-xl border border-white/[0.08] bg-zinc-900/40 flex items-center justify-center text-zinc-600">
                <FiCpu size={28} />
              </div>
            )}
          </div>

          {/* ════ RIGHT: Minimal Project Details ════ */}
          <div className="md:col-span-7 flex flex-col justify-between min-h-[140px]">
            <div>
              {/* Header: Badge & Quick External Links */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                  {badge || "Project"}
                </span>

                <div className="flex items-center gap-1.5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-external="true"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                      aria-label={`${project.title} GitHub`}
                      title="GitHub Repository"
                    >
                      <FiGithub size={14} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-external="true"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                      aria-label={`${project.title} Live Preview`}
                      title="Live Preview"
                    >
                      <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors flex items-center gap-1.5">
                  <span>{mainTitle}</span>
                  <FiArrowUpRight className="text-zinc-500 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} />
                </h3>
                {subtitle && (
                  <p className="text-xs text-zinc-400 font-normal">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Concise 1-2 Line Overview */}
              <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2 mb-3">
                {project.description}
              </p>
            </div>

            {/* Bottom: Minimal Tech Stack & Inspect Link */}
            <div className="pt-2.5 border-t border-white/[0.04] flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 items-center">
                {project.tech.slice(0, 5).map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 5 && (
                  <span className="text-[10px] font-mono text-zinc-500">
                    +{project.tech.length - 5}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors flex-shrink-0 flex items-center gap-1">
                <span>Details</span>
                <span>→</span>
              </span>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
