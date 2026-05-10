"use client";

import { motion, Variants } from "framer-motion";
import { education } from "../data/education";
import { PiGraduationCapBold, PiCalendarBold, PiMapPinBold } from "react-icons/pi";

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
          className="space-y-4"
        >
          {/* Single education entry - or map if you have multiple */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-300">
            
            {/* Subtle hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex items-start gap-4 relative z-10">
              {/* Icon with subtle hover effect */}
              <div className="mt-0.5 shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                <PiGraduationCapBold size={18} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Header row */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-white">
                    {education.degree}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <PiCalendarBold size={12} />
                    <span>{education.duration}</span>
                  </div>
                </div>
                
                {/* College with location */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                  <p className="text-sm text-gray-400">{education.college}</p>
                  {education.location && (
                    <>
                      <span className="text-gray-700">•</span>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <PiMapPinBold size={11} />
                        <span>{education.location}</span>
                      </div>
                    </>
                  )}
                </div>
                
                {/* GPA and Courses row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <span className="text-gray-500">
                    CGPA: <span className="text-gray-300 font-medium">{education.cgpa}</span>
                  </span>
                  {education.courses && education.courses.length > 0 && (
                    <>
                      <span className="text-gray-700 hidden sm:inline">•</span>
                      <div className="flex flex-wrap gap-2">
                        {education.courses.slice(0, 3).map((course, i) => (
                          <span key={i} className="text-gray-500">
                            {course}{i < Math.min(education.courses.length, 3) - 1 ? "," : ""}
                          </span>
                        ))}
                        {education.courses.length > 3 && (
                          <span className="text-gray-600">+{education.courses.length - 3}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}