"use client";

import { motion, Variants } from "framer-motion";
import { skills } from "../data/skills";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const categories: { key: keyof typeof skills; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 border-t border-white/[0.06]">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="section-heading mb-2">Skills</h2>
          <p className="section-subtext">Technologies I work with.</p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {categories.map(({ key, label }, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07 } as object}
              className="flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <span className="text-xs text-zinc-500 font-medium w-20 shrink-0 pt-1">
                {label}
              </span>
              <div className="flex flex-wrap gap-2">
                {skills[key].map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}