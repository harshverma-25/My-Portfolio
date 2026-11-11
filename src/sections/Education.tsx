"use client";

import { motion, Variants } from "framer-motion";
import { education } from "../data/education";
import { 
  PiGraduationCapBold, 
  PiCalendarBold, 
  PiMapPinBold, 
  PiBookOpenBold 
} from "react-icons/pi";

/* ─── Variants ─── */
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
    <section id="education" className="relative py-16 px-5 sm:px-8 border-t border-zinc-800/80">
      <div className="max-w-3xl mx-auto">

        {/* Header - Clean Serif */}
        <div className="mb-8">
          <h2 className="text-2xl font-normal text-white font-serif tracking-wide">
            Academic Background
          </h2>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1 block">
            Foundational Engineering & Computer Science
          </span>
        </div>

        {/* Academic Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-2xl overflow-hidden hover:border-zinc-700/80 transition-all duration-300 shadow-2xs"
        >
          {/* Top accent bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-white/20 transition-all">
                  <PiGraduationCapBold size={26} className="text-white" />
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300 font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
                        Undergraduate Degree
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      {education.degree}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">{education.college}</p>
                  </div>

                  {/* Duration badge */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-mono flex-shrink-0">
                    <PiCalendarBold size={12} className="text-zinc-400" />
                    {education.duration}
                  </span>
                </div>

                {/* Location + CGPA row */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-zinc-400">
                  {education.location && (
                    <div className="flex items-center gap-1.5">
                      <PiMapPinBold size={13} className="text-zinc-400" />
                      <span>{education.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 font-mono">Current Cumulative CGPA</span>
                    <span className="text-white font-bold font-mono text-xs px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/15">
                      {education.cgpa}
                    </span>
                  </div>
                </div>

                {/* Relevant courses */}
                {education.courses && education.courses.length > 0 && (
                  <div className="pt-5 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <PiBookOpenBold size={14} className="text-zinc-400" />
                      <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
                        Core Computer Science Coursework
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {education.courses.map((course, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-300 hover:border-white/20 hover:text-white hover:bg-white/[0.06] transition-all duration-200 cursor-default"
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
        </motion.div>
      </div>
    </section>
  );
}
