"use client";

import { motion, Variants } from "framer-motion";
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const pill: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

/* ─── Icon map ─── */
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
  WebSocket:        { Icon: SiSocketdotio,     color: "#010101" },
};

/* category accent colors */
const categoryAccent: Record<string, string> = {
  frontend: "from-cyan-500/20 to-blue-500/20",
  backend:  "from-emerald-500/20 to-teal-500/20",
  database: "from-amber-500/20 to-orange-500/20",
  tools:    "from-teal-500/20 to-emerald-500/20",
};

const categoryDot: Record<string, string> = {
  frontend: "bg-cyan-400",
  backend:  "bg-emerald-400",
  database: "bg-amber-400",
  tools:    "bg-teal-400",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <FiCpu className="text-emerald-400" size={13} />
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Technical Arsenal
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Core{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Skills & Stack
            </span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-light">
            Modern technologies and tools I specialize in to build production systems.
          </p>
        </motion.div>

        {/* Skill categories — 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map(({ key, label, description, icon }, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-[28px] border border-white/[0.08] bg-zinc-950/60 backdrop-blur-xl p-6 hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Subtle corner accent glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${categoryAccent[key]}`} />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-lg">
                  {icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-white tracking-wide">{label}</h3>
                    <span className={`h-1.5 w-1.5 rounded-full ${categoryDot[key]}`} />
                  </div>
                  {description && (
                    <p className="text-xs text-zinc-500 mt-0.5 font-light">{description}</p>
                  )}
                </div>
              </div>

              {/* Pills */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {(skills[key as keyof typeof skills] || []).map((skill: string) => {
                  const entry = iconMap[skill];
                  return (
                    <motion.span
                      key={skill}
                      variants={pill}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium
                        bg-white/[0.03] border border-white/[0.06] text-zinc-300
                        hover:bg-white/[0.08] hover:border-emerald-500/40 hover:text-white
                        hover:scale-[1.03] transition-all duration-200 cursor-default"
                    >
                      {entry && (
                        <entry.Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: entry.color }} />
                      )}
                      <span>{skill}</span>
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}