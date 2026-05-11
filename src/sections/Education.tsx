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
    <section id="education" className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-5xl mx-auto">

        {/* Header — same style as Skills / Projects / Contact */}
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
            Education
          </h2>
          <p className="text-zinc-500 text-sm text-center">
            My academic background and qualifications.
          </p>
        </motion.div>

        {/* Education card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-sm overflow-hidden hover:border-white/[0.14] transition-all duration-400">

            {/* Top accent bar */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            {/* Ambient glow */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />

            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/15 to-violet-500/10 border border-purple-500/20 flex items-center justify-center">
                    <PiGraduationCapBold size={24} className="text-purple-400" />
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  {/* Degree + Duration */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {education.degree}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-0.5">{education.college}</p>
                    </div>

                    {/* Duration badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-400 font-mono flex-shrink-0">
                      <PiCalendarBold size={11} className="text-purple-400" />
                      {education.duration}
                    </span>
                  </div>

                  {/* Location + CGPA row */}
                  <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-zinc-500">
                    {education.location && (
                      <div className="flex items-center gap-1.5">
                        <PiMapPinBold size={12} className="text-zinc-600" />
                        <span>{education.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-600">CGPA</span>
                      <span className="text-white font-semibold font-mono text-sm">{education.cgpa}</span>
                    </div>
                  </div>

                  {/* Relevant courses */}
                  {education.courses && education.courses.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <PiBookOpenBold size={12} className="text-zinc-600" />
                        <span className="text-[11px] uppercase tracking-widest text-zinc-600 font-medium">
                          Relevant Coursework
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {education.courses.map((course, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:border-purple-500/30 hover:text-zinc-200 transition-all duration-200 cursor-default"
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