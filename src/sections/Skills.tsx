"use client";

import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiDocker, SiGit, SiVercel, SiFigma, SiRedux, SiPostman, SiFirebase, SiSocketdotio,
} from "react-icons/si";
import { IconType } from "react-icons";

/* ─── Technology Brand Color Map (PRESERVED) ─── */
const iconMap: Record<string, { Icon: IconType; color: string }> = {
  React:            { Icon: SiReact,          color: "#61DAFB" },
  "Next.js":        { Icon: SiNextdotjs,       color: "#ffffff" },
  TypeScript:       { Icon: SiTypescript,      color: "#3178C6" },
  JavaScript:       { Icon: SiJavascript,      color: "#F7DF1E" },
  "Tailwind CSS":   { Icon: SiTailwindcss,     color: "#06B6D4" },
  Redux:            { Icon: SiRedux,           color: "#764ABC" },
  "Node.js":        { Icon: SiNodedotjs,       color: "#339933" },
  Express:          { Icon: SiExpress,         color: "#ffffff" },
  WebSocket:        { Icon: SiSocketdotio,     color: "#ffffff" },
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

const toolkitGroups = [
  {
    title: "Frontend Engine",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux"],
  },
  {
    title: "Backend & Systems",
    items: ["Node.js", "Express", "WebSocket", "MongoDB", "Redis", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    title: "DevOps & Tooling",
    items: ["Git", "Docker", "Postman", "Vercel", "Figma"],
  },
];

export default function Skills() {
  const totalCount = toolkitGroups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section id="skills" className="relative py-16 px-5 sm:px-8 border-t border-zinc-800/80">
      <div className="max-w-3xl mx-auto">

        {/* Header - Clean Serif & Monospace Count */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-normal text-white font-serif tracking-wide">
              The Engineering Toolkit
            </h2>
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1 block">
              Core Technologies & Architecture
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">[{totalCount}]</span>
        </div>

        {/* 3-Column Toolkit Box */}
        <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80 shadow-2xs">
          {toolkitGroups.map((group) => (
            <div key={group.title} className="p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/50">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                  {group.title}
                </span>
                <span className="text-[10px] font-mono text-zinc-600">
                  [{group.items.length}]
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {group.items.map((techName) => {
                  const tech = iconMap[techName];
                  if (!tech) return null;
                  const { Icon, color } = tech;

                  return (
                    <div
                      key={techName}
                      className="group/tech flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-zinc-800/40 transition-colors duration-200 cursor-default"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className="w-4 h-4 opacity-75 group-hover/tech:opacity-100 transition-opacity"
                          style={{ color }}
                        />
                        <span className="text-[13px] font-mono text-zinc-300 group-hover/tech:text-white transition-colors">
                          {techName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
