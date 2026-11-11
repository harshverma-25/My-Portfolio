"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { skills, skillCategories } from "../data/skills";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiPython, SiGo, SiExpress, SiFastapi,
  SiPostgresql, SiMongodb, SiPrisma, SiRedis, SiMysql,
  SiDocker, SiKubernetes, SiGit, SiGithubactions, SiVercel,
  SiFigma, SiFramer, SiJest, SiWebpack,
  SiRedux, SiPostman, SiFirebase, SiSocketdotio,
} from "react-icons/si";
import { IconType } from "react-icons";
import { FiCpu } from "react-icons/fi";

/* ─── Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const pill: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

/* ─── Technology Brand Color Map (PRESERVED) ─── */
const iconMap: Record<string, { Icon: IconType; color: string }> = {
  React:            { Icon: SiReact,          color: "#61DAFB" },
  "Next.js":        { Icon: SiNextdotjs,       color: "#ffffff" },
  TypeScript:       { Icon: SiTypescript,      color: "#3178C6" },
  JavaScript:       { Icon: SiJavascript,      color: "#F7DF1E" },
  "Tailwind CSS":   { Icon: SiTailwindcss,     color: "#06B6D4" },
  "Node.js":        { Icon: SiNodedotjs,       color: "#339933" },
  Python:           { Icon: SiPython,          color: "#3776AB" },
  Go:               { Icon: SiGo,              color: "#00ADD8" },
  Express:          { Icon: SiExpress,         color: "#ffffff" },
  FastAPI:          { Icon: SiFastapi,         color: "#009688" },
  PostgreSQL:       { Icon: SiPostgresql,      color: "#4169E1" },
  MongoDB:          { Icon: SiMongodb,         color: "#47A248" },
  Prisma:           { Icon: SiPrisma,          color: "#a0aec0" },
  Redis:            { Icon: SiRedis,           color: "#DC382D" },
  MySQL:            { Icon: SiMysql,           color: "#4479A1" },
  Docker:           { Icon: SiDocker,          color: "#2496ED" },
  Kubernetes:       { Icon: SiKubernetes,      color: "#326CE5" },
  Git:              { Icon: SiGit,             color: "#F05032" },
  "GitHub Actions": { Icon: SiGithubactions,   color: "#2088FF" },
  Vercel:           { Icon: SiVercel,          color: "#ffffff" },
  Figma:            { Icon: SiFigma,           color: "#F24E1E" },
  "Framer Motion":  { Icon: SiFramer,          color: "#0055FF" },
  Jest:             { Icon: SiJest,            color: "#C21325" },
  Webpack:          { Icon: SiWebpack,         color: "#8DD6F9" },
  Redux:            { Icon: SiRedux,           color: "#764ABC" },
  Postman:          { Icon: SiPostman,         color: "#FF6C37" },
  Firebase:         { Icon: SiFirebase,        color: "#FFCA28" },
  WebSocket:        { Icon: SiSocketdotio,     color: "#ffffff" },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Arsenal" },
    ...skillCategories.map((c) => ({ key: c.key, label: c.label })),
  ];

  const displayedCategories = activeCategory === "all"
    ? skillCategories
    : skillCategories.filter((c) => c.key === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <FiCpu className="text-zinc-300" size={13} />
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-medium">
              Technical Arsenal
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Core{" "}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Skills & Stack
            </span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-light">
            Production technologies, databases, and architectural frameworks I work with daily.
          </p>

          {/* Category Filter Tabs (Black & White) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-skill-tab"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skill categories — Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map(({ key, label, description, icon }, i) => (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative rounded-[30px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl p-6 md:p-7 hover:border-white/25 hover:bg-zinc-900/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden"
              >
                {/* Subtle corner accent glow */}
                <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-10 bg-white" />

                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl group-hover:scale-105 group-hover:border-white/20 transition-all duration-300 shadow-sm text-zinc-300">
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white tracking-wide">{label}</h3>
                      <span className="h-2 w-2 rounded-full bg-zinc-400" />
                    </div>
                    {description && (
                      <p className="text-xs text-zinc-400 mt-0.5 font-light">{description}</p>
                    )}
                  </div>
                </div>

                {/* Pills — original brand colors on icons with rounded pill shapes */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-2.5"
                >
                  {(skills[key as keyof typeof skills] || []).map((skill: string) => {
                    const entry = iconMap[skill];

                    return (
                      <motion.div
                        key={skill}
                        variants={pill}
                        whileHover={{ y: -3, scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group/pill relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium
                          bg-white/[0.03] border border-white/10 text-zinc-300 backdrop-blur-md
                          hover:text-white hover:border-white/30 hover:bg-white/[0.07] transition-all duration-200 cursor-default shadow-sm"
                      >
                        {entry && (
                          <entry.Icon
                            className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover/pill:scale-110"
                            style={{ color: entry.color }}
                          />
                        )}
                        <span>{skill}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
