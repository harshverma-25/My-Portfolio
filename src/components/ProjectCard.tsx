"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
        
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-3xl">🎨</span>
              </div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg">
                Featured
              </span>
            </div>
          )}
          
          {/* Link Buttons Overlay */}
          <div className="absolute bottom-3 right-3 z-10 flex gap-2">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-purple-500/80 transition-all duration-300"
              aria-label={`${title} GitHub`}
            >
              <FiGithub size={14} />
            </a>
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-purple-500/80 transition-all duration-300"
              aria-label={`${title} Live Demo`}
            >
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {tech.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10 group-hover:border-purple-500/30 transition-colors duration-300"
              >
                {t}
              </span>
            ))}
            {tech.length > 4 && (
              <span className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-500">
                +{tech.length - 4}
              </span>
            )}
          </div>
        </div>
        
        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-500/30 transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}