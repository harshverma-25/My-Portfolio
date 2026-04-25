"use client";

import { motion } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

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
    <div className="group card card-hover p-5 flex flex-col sm:flex-row sm:items-start gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t, i) => (
            <span key={i} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center sm:flex-col sm:items-end gap-3 shrink-0">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} GitHub`}
          className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
        >
          <FaGithub size={15} />
        </a>
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} live demo`}
          className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
        >
          <HiExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}