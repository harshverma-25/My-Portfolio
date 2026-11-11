"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar, FiFolder, FiCpu } from "react-icons/fi";
import { Project } from "@/data/projects";

interface Props {
  project: Project;
  badge?: string;
  onSelectProject?: (project: Project) => void;
}

export default function ProjectCard({ project, badge, onSelectProject }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for dynamic spotlight & 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);

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
    // Avoid triggering card click if clicking on links or buttons
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;

    if (onSelectProject) {
      onSelectProject(project);
    } else if (project.live) {
      window.open(project.live, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
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
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative flex flex-col justify-between rounded-[30px] border border-white/10 bg-zinc-950/40 p-5 md:p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-zinc-900/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] h-full overflow-hidden cursor-pointer"
      >
        {/* Cursor Spotlight Gradient inside card (Monochrome) */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[30px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.06), transparent 80%)`,
          }}
        />

        {/* Subtle border spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[30px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.25), transparent 70%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        <div className="relative z-10">
          {/* Top Header / Actions */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-zinc-300 group-hover:border-white/20 group-hover:bg-white/[0.06] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                <FiFolder size={18} />
              </div>
              {badge && (
                <span className="rounded-full bg-white/[0.06] border border-white/15 px-2.5 py-0.5 text-[10px] font-mono font-medium text-zinc-300 shadow-sm">
                  {badge}
                </span>
              )}
              {project.featured && !badge && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium text-zinc-300">
                  <FiStar size={10} className="fill-white text-white" />
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] hover:border-white/30 hover:text-white hover:bg-white/[0.08] hover:scale-105 transition-all duration-200"
                  aria-label={`${project.title} GitHub repository`}
                  title="View Source Code"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub size={15} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] hover:border-white/30 hover:text-white hover:bg-white/[0.08] hover:scale-105 transition-all duration-200"
                  aria-label={`${project.title} Live Preview`}
                  title="Open Live Preview"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Thumbnail Image with Live & Architecture Quick Actions */}
          {project.image && (
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-white/10 bg-zinc-950/80 shadow-lg group-hover:border-white/20 transition-all duration-300">
              {/* macOS window title bar */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-900/90 backdrop-blur-md flex items-center justify-between px-3 z-10 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
                  <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
                  <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
                </div>
                <span className="text-[9px] font-mono text-zinc-500 truncate max-w-[140px]">
                  {project.title.split("—")[0].trim().toLowerCase().replace(/\s+/g, "")}.app
                </span>
                <div className="w-6" />
              </div>

              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top pt-6 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 p-4 z-20 backdrop-blur-[2px]">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-bold shadow-lg hover:bg-zinc-200 transition-all hover:scale-105"
                  >
                    <span>Live Demo</span>
                    <FiExternalLink size={12} />
                  </a>
                )}
                {onSelectProject && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-medium border border-white/20 hover:bg-white/20 transition-all hover:scale-105 backdrop-blur-md"
                  >
                    <FiCpu size={12} className="text-zinc-300" />
                    <span>Deep Dive</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Title with link hover */}
          <h3 className="mb-2 text-lg font-bold text-white group-hover:text-zinc-200 transition-colors duration-200 line-clamp-1 flex items-center justify-between">
            <span>{project.title}</span>
            <span className="text-xs font-normal text-zinc-500 group-hover:text-white transition-all duration-200">
              →
            </span>
          </h3>

          {/* Description */}
          <p className="mb-4 text-xs leading-relaxed text-zinc-400 font-light line-clamp-3">
            {project.description}
          </p>

          {/* Architecture trigger pill */}
          {onSelectProject && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(project);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors mb-3 group/btn"
            >
              <FiCpu size={12} className="group-hover/btn:rotate-45 transition-transform" />
              <span>Inspect Architecture & Stack</span>
              <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
            </button>
          )}
        </div>

        {/* Tech Tags */}
        <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-auto">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400 transition-all duration-200 group-hover:border-white/20 group-hover:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
