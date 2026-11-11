"use client";

import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiDocker, SiGit, SiVercel, SiFigma, SiRedux, SiPostman, SiFirebase, SiSocketdotio,
} from "react-icons/si";
import { IconType } from "react-icons";

const iconMap: Record<string, { Icon: IconType; color: string }> = {
  React:            { Icon: SiReact,          color: "#61DAFB" },
  "Next.js":        { Icon: SiNextdotjs,       color: "#ffffff" },
  TypeScript:       { Icon: SiTypescript,      color: "#3178C6" },
  JavaScript:       { Icon: SiJavascript,      color: "#F7DF1E" },
  "Tailwind CSS":   { Icon: SiTailwindcss,     color: "#06B6D4" },
  Redux:            { Icon: SiRedux,           color: "#764ABC" },
  "Node.js":        { Icon: SiNodedotjs,       color: "#339933" },
  Express:          { Icon: SiExpress,         color: "#ffffff" },
  "Socket.IO":      { Icon: SiSocketdotio,     color: "#ffffff" },
  MongoDB:          { Icon: SiMongodb,         color: "#47A248" },
  Redis:            { Icon: SiRedis,           color: "#DC382D" },
  PostgreSQL:       { Icon: SiPostgresql,      color: "#4169E1" },
  MySQL:            { Icon: SiMysql,           color: "#4479A1" },
  Firebase:         { Icon: SiFirebase,        color: "#FFCA28" },
  Git:              { Icon: SiGit,             color: "#F05032" },
  Docker:           { Icon: SiDocker,          color: "#2496ED" },
  Postman:          { Icon: SiPostman,         color: "#FF6C37" },
  Vercel:           { Icon: SiVercel,          color: "#ffffff" },
  Figma:            { Icon: SiFigma,           color: "#F24E1E" },
};

const groups = [
  {
    label: "Frontend",
    count: 6,
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux"],
  },
  {
    label: "Backend & Data",
    count: 8,
    items: ["Node.js", "Express", "Socket.IO", "MongoDB", "Redis", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    label: "Toolchain",
    count: 5,
    items: ["Git", "Docker", "Postman", "Vercel", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full px-5 sm:px-8">
      <div className="max-w-3xl mx-auto border-t border-zinc-800/80 pt-8 sm:pt-9 pb-8 sm:pb-9">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-7 flex items-end justify-between"
        >
          <div>
            <h2 className="text-2xl font-normal text-white tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
              Technical Arsenal
            </h2>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
              Tools I build real products with
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-600">
            [{groups.reduce((a, g) => a + g.count, 0)}]
          </span>
        </motion.div>

        {/* 3-col glass grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/60"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
          }}
        >
          {groups.map((group, gi) => (
            <div key={group.label} className="p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/50">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                  {group.label}
                </span>
                <span className="text-[10px] font-mono text-zinc-700">[{group.count}]</span>
              </div>

              <div className="flex flex-col">
                {group.items.map((name, i) => {
                  const tech = iconMap[name];
                  if (!tech) return null;
                  const { Icon, color } = tech;
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -4 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.05 + i * 0.03, duration: 0.3 }}
                      className="group/t flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-white/[0.04] transition-colors duration-150 cursor-default"
                    >
                      <Icon
                        className="w-3.5 h-3.5 opacity-70 group-hover/t:opacity-100 transition-opacity shrink-0"
                        style={{ color }}
                      />
                      <span className="text-[13px] font-mono text-zinc-400 group-hover/t:text-zinc-100 transition-colors">
                        {name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
