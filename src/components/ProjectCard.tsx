"use client";

import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
}: Project) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative glass rounded-3xl p-8 flex flex-col h-full overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        <p className="text-zinc-400 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {tech.map((t, index) => (
            <span
              key={index}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-white transition-colors"
          >
            <Terminal size={18} />
            Source
          </a>
          <a 
            href={live} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
            Visit Live
          </a>
        </div>
      </div>
    </motion.div>
  );
}