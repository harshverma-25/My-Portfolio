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

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
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
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808] px-6 md:px-12 lg:px-24"
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* noise texture */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,backgroundRepeat:"repeat"}}
        />
        {/* grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* glow left */}
        <div className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-emerald-500/8 blur-[130px]" />
        {/* glow right */}
        <div className="absolute -right-40 bottom-1/4 h-[460px] w-[460px] rounded-full bg-violet-500/8 blur-[130px]" />
        {/* bottom fade to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Layout ── */}
      <div className="w-full max-w-5xl mx-auto py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Name - increased size slightly */}
            <motion.div variants={fadeUp} className="mb-4">
              <h1 className="text-[3.2rem] sm:text-[4rem] lg:text-[4.2rem] font-bold tracking-tight leading-[1.1]">
                <span className="block text-white">{siteConfig.name}</span>
              </h1>
            </motion.div>

            {/* Role line */}
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-base font-mono text-zinc-500 tracking-wide">
                <span className="text-zinc-400">{siteConfig.role}</span>
                <span className="mx-2 text-zinc-700">/</span>
                <span>{siteConfig.college}</span>
                <span className="mx-2 text-zinc-700">/</span>
                <span>{siteConfig.location}</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mb-10 max-w-md text-[16px] leading-relaxed text-zinc-400"
            >
              {siteConfig.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-zinc-100 active:scale-[0.98] shadow-lg shadow-white/5"
              >
                View My Work
                <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-600 hover:text-white hover:bg-white/[0.04]"
              >
                <HiDownload size={15} />
                Resume
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex items-center gap-5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-white/[0.02] text-zinc-500 transition-all duration-200 hover:border-zinc-600 hover:text-zinc-200 hover:bg-white/[0.04] hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </a>
              ))}
              <div className="ml-1 h-px w-10 bg-gradient-to-r from-zinc-800 to-transparent" />
              <span className="text-[10px] text-zinc-600 tracking-widest uppercase font-mono">
                Follow me
              </span>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT COLUMN — Simplified to just image with stats overlay ════ */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate="show"
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/25 via-transparent to-violet-500/25 blur-sm" />

              {/* Glass card with image and minimal stats */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl p-5 w-[320px] sm:w-[380px]">

                {/* Photo area */}
                <div className="relative mb-5">
                  <div className="relative h-[280px] w-full overflow-hidden rounded-xl">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
                    <Image
                      src="/avatar.png"
                      alt="Harsh Verma"
                      fill
                      className="object-cover object-center scale-105"
                      priority
                    />
                  </div>

                  {/* Status chip */}
                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-zinc-300">Available</span>
                  </div>
                </div>

                {/* Minimal stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] py-2.5 transition-all duration-200 hover:bg-white/[0.04]"
                    >
                      <span className="text-sm font-bold text-white font-mono">{s.value}</span>
                      <span className="mt-0.5 text-[9px] uppercase tracking-wider text-zinc-600">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating decorations */}
              <motion.div
                className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 h-4 w-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>
        </div>

    
      </div>
    </section>
  );
}