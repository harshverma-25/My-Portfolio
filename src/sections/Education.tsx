"use client";

import { motion } from "framer-motion";
import { education } from "../data/education";
import { GraduationCap, Calendar, Star } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Academic <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass p-10 rounded-[2.5rem] overflow-hidden group"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap size={120} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 text-purple-400 mb-6 font-semibold tracking-widest uppercase text-xs">
              <Star size={14} />
              Featured Degree
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {education.degree}
            </h3>

            <div className="space-y-4">
              <p className="text-xl text-zinc-300 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                {education.college}
              </p>

              <div className="flex flex-wrap gap-6 text-zinc-400">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{education.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-yellow-500/50" />
                  <span>CGPA: {education.cgpa}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-sm text-zinc-400 italic">
                Advanced coursework in Algorithms, Database Management Systems, and Web Engineering.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Trophy({ className, size }: { className?: string; size?: number }) {
  return <Star className={className} size={size} />;
}