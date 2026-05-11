"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";
import Image from "next/image";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image?: string;
  featured?: boolean;
};

interface ProjectCardProps extends Project {
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
  image,
  featured,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 rounded-2xl blur-xl transition-all duration-500 group-hover:from-emerald-500/20 group-hover:via-emerald-500/10 group-hover:to-emerald-500/0" />
      
      <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-white/[0.12] group-hover:shadow-2xl h-full flex flex-col">
        
        {/* Image Section - Full width at top */}
        <div className="relative w-full aspect-video overflow-hidden">
          <div className="relative w-full h-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
            {image ? (
              <>
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <span className="text-3xl">⚡</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons - Overlay on image */}
          <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/[0.1] text-zinc-300 hover:text-white hover:bg-emerald-500/80 hover:border-emerald-500/30 transition-all duration-300"
              aria-label={`${title} GitHub`}
            >
              <FiGithub size={15} />
            </a>
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/[0.1] text-zinc-300 hover:text-white hover:bg-emerald-500/80 hover:border-emerald-500/30 transition-all duration-300"
              aria-label={`${title} Live Demo`}
            >
              <FiExternalLink size={15} />
            </a>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 flex flex-col p-5">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1">
                {title}
              </h3>
              {featured && (
                <FiStar className="w-4 h-4 text-emerald-400 fill-emerald-400 flex-shrink-0 mt-0.5" />
              )}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-zinc-500 border border-white/[0.05] group-hover:border-emerald-500/20 transition-colors duration-300"
              >
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.02] text-zinc-600">
                +{tech.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.article>
  );
}