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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm overflow-hidden hover:border-purple-500/30 transition-all duration-400 hover:shadow-lg hover:shadow-purple-500/5">
        
        {/* HORIZONTAL LAYOUT: Flex row with image left */}
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          
          {/* LEFT SIDE: Image */}
          <div className="relative sm:w-36 md:w-48 flex-shrink-0">
            <div className="relative h-32 sm:h-full w-full rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          {/* RIGHT SIDE: Content */}
          <div className="flex-1 flex flex-col">
            {/* Title Row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                {title}
              </h3>
              
              {/* Action Buttons */}
              <div className="flex gap-1.5 flex-shrink-0">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-white/5 text-gray-400 hover:text-white hover:bg-purple-500/70 transition-all duration-200"
                  aria-label={`${title} GitHub`}
                >
                  <FiGithub size={14} />
                </a>
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-white/5 text-gray-400 hover:text-white hover:bg-purple-500/70 transition-all duration-200"
                  aria-label={`${title} Live Demo`}
                >
                  <FiExternalLink size={14} />
                </a>
              </div>
            </div>
            
            {/* Featured Badge */}
            {featured && (
              <div className="mb-2">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">
                  Featured
                </span>
              </div>
            )}
            
            {/* Description */}
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
              {description}
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {tech.slice(0, 5).map((t, i) => (
                <span
                  key={i}
                  className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10"
                >
                  {t}
                </span>
              ))}
              {tech.length > 5 && (
                <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500">
                  +{tech.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-purple-500/30 transition-all duration-400 pointer-events-none" />
      </div>
    </motion.div>
  );
}