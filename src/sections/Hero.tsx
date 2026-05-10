"use client";

import { motion } from "framer-motion";
import { HiArrowRight, HiDownload } from "react-icons/hi";

/* ─── Animation Variants ─── */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Data ─── */
const techStack = [
  "TypeScript",
  "Node.js",
  "React",
  "PostgreSQL",
  "Redis",
  "Docker",
];

const stats = [
  { label: "LeetCode", value: "200+" },
  { label: "Projects", value: "10+" },
  { label: "Graduate", value: "2026" },
];

/* ─── Component ─── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-black -z-20" />

      {/* Fine grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Single soft glow — very subtle */}
      <div className="absolute -z-10 top-[20%] left-[10%] w-[520px] h-[520px] rounded-full bg-zinc-700/10 blur-[140px] pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-10 xl:px-0 pt-32 pb-20"
      >
        {/* Availability pill */}
        <motion.div variants={fadeUp} className="mb-10">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Open to internships &amp; full‑time roles
          </span>
        </motion.div>

        {/* ── Profile row ── */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-5 mb-8"
        >
          {/* Square card avatar — the visual anchor */}
          <div className="relative flex-shrink-0">
            <div className="w-[68px] h-[68px] rounded-xl bg-zinc-900 border border-yellow-500/50 flex items-center justify-center shadow-[0_0_24px_rgba(234,179,8,0.08)]">
              <span className="text-lg font-bold font-mono text-yellow-400 select-none tracking-tight">
                HV
              </span>
            </div>
            {/* Online dot */}
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
          </div>

          {/* Name + role stacked */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-none mb-1.5">
              Harsh Verma
            </h1>
            <p className="text-xs text-zinc-500 font-medium tracking-wide">
              Backend Engineer&nbsp;&nbsp;·&nbsp;&nbsp;B.Tech CSE&nbsp;&nbsp;·&nbsp;&nbsp;Class of 2026
            </p>
          </div>
        </motion.div>

        {/* ── Intro line ── */}
        <motion.p
          variants={fadeUp}
          className="text-xl sm:text-2xl font-medium text-zinc-300 leading-snug mb-5 max-w-xl"
        >
          Love to build cool stuff, content creator &amp; polymath.
        </motion.p>

        {/* ── Technical description ── */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-[15px] text-zinc-500 leading-relaxed max-w-md mb-9"
        >
          Specializing in backend systems and distributed architecture.
          I craft robust, scalable applications focused on{" "}
          <span className="text-zinc-300">performance</span>,{" "}
          <span className="text-zinc-300">clean architecture</span>, and
          great developer experience.
        </motion.p>

        {/* ── Tech stack ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-2 mb-9"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-[10px] font-mono text-zinc-500 bg-white/[0.03] border border-white/[0.06] tracking-wide"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* ── CTA buttons ── */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 mb-14"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-100 active:scale-[0.98] transition-all duration-150"
          >
            Projects
            <HiArrowRight size={14} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 text-zinc-400 text-sm font-medium hover:border-zinc-600 hover:text-zinc-200 transition-all duration-150"
          >
            <HiDownload size={14} />
            Resume
          </a>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-stretch divide-x divide-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02]"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-7 py-3.5">
              <span className="text-sm font-bold text-white font-mono tracking-tight">
                {s.value}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-600 mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}