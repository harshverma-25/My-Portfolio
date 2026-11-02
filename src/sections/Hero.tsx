"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../data/site";
import { contact } from "../data/contact";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { HiArrowRight, HiDownload } from "react-icons/hi";

/* ─── Variants ─── */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Data ─── */
const socials = [
  { icon: FiGithub,   label: "GitHub",   href: contact.socials.github.url },
  { icon: FiLinkedin, label: "LinkedIn",  href: contact.socials.linkedin.url },
  { icon: FiTwitter,  label: "Twitter",   href: contact.socials.twitter.url },
];

const stats = siteConfig.stats;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-24"
    >
      {/* ── Ambient background blend ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 h-[450px] w-[450px] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Layout ── */}
      <div className="w-full max-w-5xl mx-auto py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Handle badge */}
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono text-emerald-300 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                @{siteConfig.handle}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} className="mb-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                Hi, I&apos;m <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">{siteConfig.name}</span>
              </h1>
            </motion.div>

            {/* Role line */}
            <motion.div variants={fadeUp} className="mb-6">
              <p className="text-base sm:text-lg font-mono text-zinc-400 tracking-wide">
                <span>{siteConfig.role}</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mb-8 max-w-lg text-[15px] sm:text-base leading-relaxed text-zinc-400 font-light"
            >
              {siteConfig.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:from-emerald-300 hover:to-teal-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] active:scale-[0.98]"
              >
                View Selected Work
                <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <HiDownload size={16} />
                Download Resume
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-white/[0.06] hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </a>
              ))}
              <div className="ml-2 h-px w-12 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-[11px] text-zinc-500 tracking-widest uppercase font-mono">
                Connect with me
              </span>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT COLUMN — Rounded Card ════ */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate="show"
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-emerald-500/30 via-teal-500/10 to-cyan-500/30 blur-md opacity-75" />

              {/* Glass card with image and stats */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/80 backdrop-blur-2xl p-5 w-[310px] sm:w-[360px] shadow-2xl">

                {/* Photo area */}
                <div className="relative mb-5">
                  <div className="relative h-[270px] w-full overflow-hidden rounded-2xl border border-white/10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                    <Image
                      src="/HV.png"
                      alt="Harsh Verma - Full Stack Developer"
                      fill
                      className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
                      priority
                    />
                  </div>

                  {/* Status chip */}
                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-black/70 backdrop-blur-md px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-300">Open to Opportunities</span>
                  </div>
                </div>

                {/* Minimal stats row */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-2.5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04]"
                    >
                      <span className="text-sm font-bold text-white font-mono">{s.value}</span>
                      <span className="mt-0.5 text-[9px] uppercase tracking-wider text-zinc-500">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating micro decorations */}
              <motion.div
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 shadow-lg shadow-teal-500/40"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}