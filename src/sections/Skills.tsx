"use client";

import { motion, Variants } from "framer-motion";
import { skills, skillCategories } from "../data/skills";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiPython, SiGo, SiExpress, SiFastapi,
  SiPostgresql, SiMongodb, SiPrisma, SiRedis, SiMysql,
  SiDocker, SiKubernetes, SiGit, SiGithubactions, SiVercel,
  SiFigma, SiFramer, SiJest, SiWebpack
} from "react-icons/si";
import { IconType } from "react-icons";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Icon mapping with COLORS
const iconMap: Record<string, { Icon: IconType; color: string }> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#ffffff" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Go: { Icon: SiGo, color: "#00ADD8" },
  Express: { Icon: SiExpress, color: "#ffffff" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Prisma: { Icon: SiPrisma, color: "#2D3748" },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Kubernetes: { Icon: SiKubernetes, color: "#326CE5" },
  Git: { Icon: SiGit, color: "#F05032" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
  Vercel: { Icon: SiVercel, color: "#ffffff" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
  "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  Jest: { Icon: SiJest, color: "#C21325" },
  Webpack: { Icon: SiWebpack, color: "#8DD6F9" },
};

const getIcon = (skillName: string) => {
  const skill = iconMap[skillName];
  if (skill) {
    return <skill.Icon className="w-4 h-4" style={{ color: skill.color }} />;
  }
  return null;
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-zinc-950 to-black">
      {/* EXACT NAVBAR WIDTH AND CENTERING */}
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div className="w-full max-w-[680px]">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-transparent" />
              <span className="text-xs font-mono text-purple-400">/skills</span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-3">
              Tech Stack
            </h2>
            
            <p className="text-gray-500 text-sm">
              Tools and technologies I specialize in.
            </p>
          </motion.div>

          {/* Skills - TWO COLUMN LAYOUT: Category Left | Skills Right */}
          <div className="flex flex-col gap-6">
            {skillCategories.map(({ key, label, description }, i) => (
              <motion.div
                key={key}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                {/* TWO COLUMN GRID: Left (Category) | Right (Skills) */}
                <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                  
                  {/* LEFT SIDE: Category Label */}
                  <div className="sticky top-24">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px bg-purple-500/50 group-hover:w-8 transition-all duration-300" />
                      <h3 className="text-sm font-semibold text-white tracking-wide">
                        {label}
                      </h3>
                    </div>
                    {description && (
                      <p className="text-[10px] text-gray-600 mt-1.5 ml-2">
                        {description}
                      </p>
                    )}
                  </div>
                  
                  {/* RIGHT SIDE: Skills Tags with COLORFUL ICONS */}
                  <div className="flex flex-wrap gap-2">
                    {(skills[key as keyof typeof skills] || []).map((skill: string, idx: number) => {
                      const Icon = getIcon(skill);
                      return (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + idx * 0.02 }}
                          className="group/tag inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                            bg-white/[0.03] border border-white/[0.06] text-gray-400
                            hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-105
                            transition-all duration-300 cursor-default"
                        >
                          {Icon && (
                            <span className="transition-all duration-300 group-hover/tag:scale-110">
                              {Icon}
                            </span>
                          )}
                          <span className="group-hover/tag:text-white transition-colors duration-300">
                            {skill}
                          </span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section - Clean and minimal */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-6 border-t border-white/[0.06]"
          >
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-xs text-gray-500">Technologies</div>
              </div>
              <div className="w-px h-6 bg-white/[0.06] my-auto" />
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-xs text-gray-500">Years Exp</div>
              </div>
              <div className="w-px h-6 bg-white/[0.06] my-auto" />
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-xs text-gray-500">Learning</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}