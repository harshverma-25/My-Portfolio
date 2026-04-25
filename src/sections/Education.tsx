"use client";

import { motion, Variants } from "framer-motion";
import { education } from "../data/education";
import { PiGraduationCapBold } from "react-icons/pi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Education() {
  return (
    <section id="education" className="py-20 border-t border-white/[0.06]">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="section-heading mb-2">Education</h2>
          <p className="section-subtext">Academic background.</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="card card-hover p-6 flex items-start gap-4"
        >
          <div className="mt-0.5 shrink-0 w-9 h-9 rounded-lg bg-zinc-800 border border-white/[0.06] flex items-center justify-center">
            <PiGraduationCapBold size={16} className="text-zinc-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-white">
                {education.degree}
              </h3>
              <span className="text-xs text-zinc-600 shrink-0">
                {education.duration}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-3">{education.college}</p>
            <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
              <span>CGPA: <span className="text-zinc-300">{education.cgpa}</span></span>
              <span>·</span>
              <span>Algorithms · DBMS · Web Engineering</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}