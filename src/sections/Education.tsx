"use client";

import { motion, Variants } from "framer-motion";
import { education } from "../data/education";
import { PiGraduationCapBold, PiCalendarBold, PiMapPinBold, PiBookOpenBold } from "react-icons/pi";

/* ─── Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
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
            <PiGraduationCapBold className="text-emerald-400" size={14} />
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Academic Background
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Education &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Qualifications
            </span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-light">
            Formal degrees, foundational computer science training, and coursework.
          </p>
        </motion.div>

        {/* Education card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="group relative rounded-[28px] border border-white/[0.08] bg-zinc-950/60 backdrop-blur-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 shadow-xl">

            {/* Top accent bar */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            {/* Ambient glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border border-emerald-500/25 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <PiGraduationCapBold size={26} className="text-emerald-400" />
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  {/* Degree + Duration */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                        {education.degree}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1">{education.college}</p>
                    </div>

                    {/* Duration badge */}
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-mono flex-shrink-0">
                      <PiCalendarBold size={12} className="text-emerald-400" />
                      {education.duration}
                    </span>
                  </div>

                  {/* Location + CGPA row */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-zinc-400">
                    {education.location && (
                      <div className="flex items-center gap-1.5">
                        <PiMapPinBold size={13} className="text-emerald-400/80" />
                        <span>{education.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-500 font-mono">CGPA</span>
                      <span className="text-emerald-400 font-bold font-mono text-sm px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                        {education.cgpa}
                      </span>
                    </div>
                  </div>

                  {/* Relevant courses */}
                  {education.courses && education.courses.length > 0 && (
                    <div className="pt-5 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <PiBookOpenBold size={13} className="text-emerald-400/80" />
                        <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
                          Relevant Coursework
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {education.courses.map((course, i) => (
                          <span
                            key={i}
                            className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-300 hover:border-emerald-500/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200 cursor-default"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}