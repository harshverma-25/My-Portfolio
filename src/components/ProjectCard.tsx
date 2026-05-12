"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiHeart, FiShare2, FiStar } from "react-icons/fi";
import { toast } from "react-hot-toast";

interface Props {
  project: {
    title: string;
    description: string;
    tech: string[];
    github: string;
    live: string;
    image?: string;
    featured?: boolean;
  };
}

export default function ProjectShowcase({ project }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: project.live,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(project.live);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-xl"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] min-h-[400px]">
        {/* LEFT IMAGE SECTION - Landscape optimized */}
        <div className="relative group bg-zinc-950/50 flex items-center justify-center p-4 lg:p-8">
          <motion.div 
            className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Browser Header Mockup */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-800/80 backdrop-blur-md flex items-center gap-1.5 px-3 z-10 border-b border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            </div>

            <Image
              src={project.image || "/projects/fallback.png"}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top pt-6 transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute left-6 top-6 lg:left-10 lg:top-10 z-20">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                <FiStar className="text-emerald-400 fill-emerald-400" size={10} />
                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 font-medium">
                  Featured
                </span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 bg-gradient-to-br from-transparent to-black/20">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/80 font-semibold">
              Project Case Study
            </span>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-colors ${isLiked ? "text-red-500" : "text-zinc-500 hover:text-white"}`}
              >
                <FiHeart size={16} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <FiShare2 size={16} />
              </motion.button>
            </div>
          </div>

          <h3 className="mb-4 text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {project.title}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-zinc-400 font-light">
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 text-[10px] text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-white/5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-white hover:text-emerald-400 transition-colors group"
            >
              <FiGithub size={14} className="group-hover:rotate-12 transition-transform" />
              <span>Source Code</span>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <FiExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              <span>Live Preview</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}