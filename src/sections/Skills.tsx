"use client";

import { motion, Variants } from "framer-motion";
import { skills, skillCategories } from "../data/skills";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiPython, SiGo, SiExpress, SiFastapi,
  SiPostgresql, SiMongodb, SiPrisma, SiRedis, SiMysql,
  SiDocker, SiKubernetes, SiGit, SiGithubactions, SiVercel,
  SiFigma, SiFramer, SiJest, SiWebpack,
} from "react-icons/si";
import { IconType } from "react-icons";

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
  visible: { transition: { staggerChildren: 0.06 } },
};

const pill: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
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
};

/* category accent colors */
const categoryAccent: Record<string, string> = {
  frontend: "from-blue-500/20 to-cyan-500/20 border-blue-500/20",
  backend:  "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
  database: "from-orange-500/20 to-amber-500/20 border-orange-500/20",
  tools:    "from-purple-500/20 to-violet-500/20 border-purple-500/20",
};

const categoryDot: Record<string, string> = {
  frontend: "bg-blue-400",
  backend:  "bg-emerald-400",
  database: "bg-orange-400",
  tools:    "bg-purple-400",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-5xl mx-auto">

        {/* Header — mirrors Contact / Projects */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-3">
            Tech Stack
          </h2>
          <p className="text-zinc-500 text-sm text-center">
            Tools and technologies I specialize in.
          </p>
        </motion.div>

        {/* Skill categories — 2-col grid on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillCategories.map(({ key, label, description, icon }, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-sm p-5 hover:border-white/[0.12] transition-all duration-400"
            >
              {/* Subtle corner accent glow */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${categoryAccent[key]}`} />

              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className={`h-2 w-2 rounded-full flex-shrink-0 ${categoryDot[key]}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{icon}</span>
                    <h3 className="text-sm font-semibold text-white tracking-wide">{label}</h3>
                  </div>
                  {description && (
                    <p className="text-[11px] text-zinc-600 mt-0.5">{description}</p>
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium
                        bg-white/[0.03] border border-white/[0.06] text-zinc-400
                        hover:bg-white/[0.07] hover:border-white/[0.14] hover:text-zinc-200
                        hover:scale-[1.04] transition-all duration-200 cursor-default"
                    >
                      {entry && (
                        <entry.Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: entry.color }} />
                      )}
                      {skill}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 pt-8 border-t border-white/[0.06] flex flex-wrap gap-8 justify-center"
        >
          {[
            { value: "20+", label: "Technologies" },
            { value: "3+",  label: "Years learning" },
            { value: "∞",   label: "Still learning" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xl font-bold text-white font-mono">{value}</span>
              <span className="text-xs text-zinc-600">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}