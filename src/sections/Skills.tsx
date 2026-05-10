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

// Icon mapping (extend as needed)
const iconMap: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  Go: SiGo,
  Express: SiExpress,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Prisma: SiPrisma,
  Redis: SiRedis,
  MySQL: SiMysql,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Git: SiGit,
  "GitHub Actions": SiGithubactions,
  Vercel: SiVercel,
  Figma: SiFigma,
  "Framer Motion": SiFramer,
  Jest: SiJest,
  Webpack: SiWebpack,
};

const getIcon = (skillName: string) => {
  const Icon = iconMap[skillName];
  if (Icon) return <Icon className="w-3.5 h-3.5" />;
  return null;
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Decorative element */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-transparent" />
            <span className="text-xs font-mono text-purple-400">/skills</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-3">
            Tech Stack
          </h2>
          
          <p className="text-gray-500 max-w-md">
            Tools and technologies I specialize in.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-8">
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
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-white/10 group-hover:bg-purple-500/50 transition-colors duration-300" />
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    {label}
                  </h3>
                  {description && (
                    <p className="text-xs text-gray-600 mt-0.5">{description}</p>
                  )}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pl-0 md:pl-8">
                {(skills[key as keyof typeof skills] || []).map((skill: string, idx: number) => {
                  const Icon = getIcon(skill);
                  return (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + idx * 0.02 }}
                      className="group/tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                        bg-white/[0.03] border border-white/[0.06] text-gray-400
                        hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-300
                        transition-all duration-300 cursor-default"
                    >
                      {Icon && (
                        <span className="text-gray-500 group-hover/tag:text-purple-400 transition-colors duration-300">
                          {Icon}
                        </span>
                      )}
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/[0.04]"
        >
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white">20+</div>
              <div className="text-xs text-gray-600">Technologies</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06] my-auto" />
            <div>
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-xs text-gray-600">Years Experience</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06] my-auto" />
            <div>
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-xs text-gray-600">Learning</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}