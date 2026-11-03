"use client";

import { useRef } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../data/site";
import { contact } from "../data/contact";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUpRight } from "react-icons/fi";
import { HiArrowRight, HiDownload, HiSparkles } from "react-icons/hi";

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
  hidden: { opacity: 0, x: 40 },
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
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt for Hero Avatar Card
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-24"
    >
      {/* ── Ambient background blend ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 h-[450px] w-[450px] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      {/* ── Layout ── */}
      <div className="w-full max-w-5xl mx-auto py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Status chip */}
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono text-emerald-300 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                @{siteConfig.handle}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <HiSparkles className="text-emerald-400" size={13} />
                Available for New Projects
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} className="mb-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent hover:brightness-110 transition-all">
                  {siteConfig.name}
                </span>
              </h1>
            </motion.div>

            {/* Role Line — Full Stack Developer */}
            <motion.div variants={fadeUp} className="mb-6">
              <p className="text-base sm:text-lg font-mono text-zinc-400 tracking-wide flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">{siteConfig.role}</span>
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
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:from-emerald-300 hover:to-teal-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10">View Selected Work</span>
                <HiArrowRight className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] active:scale-[0.98]"
              >
                <HiDownload size={16} className="text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>View Resume</span>
                <FiArrowUpRight size={14} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </motion.div>

            {/* Socials & Connect line */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
              <div className="ml-2 h-px w-12 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-[11px] text-zinc-500 tracking-widest uppercase font-mono">
                Connect with me
              </span>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT COLUMN — 3D Interactive Card ════ */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate="show"
            className="relative flex justify-center lg:justify-start"
            style={{ perspective: 1200 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative transition-transform duration-200 ease-out"
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-1.5 rounded-[34px] bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-cyan-500/30 blur-xl opacity-75" />

              {/* Glass card container */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/85 backdrop-blur-2xl p-5 w-[310px] sm:w-[370px] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">

                {/* Photo area */}
                <div className="relative mb-5 group/avatar">
                  <div className="relative h-[290px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                    <Image
                      src="/HV.png"
                      alt="Harsh Verma - Full Stack Developer"
                      fill
                      sizes="(max-width: 768px) 310px, 370px"
                      className="object-cover object-center transition-transform duration-700 group-hover/avatar:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                  </div>

                  {/* Pulsing Status Pill */}
                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/80 backdrop-blur-md px-3.5 py-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-300 font-mono tracking-wide">
                      Open to Work
                    </span>
                  </div>
                </div>

                {/* Minimal stats row */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="group/stat flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-3 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
                    >
                      <span className="text-base font-bold text-white font-mono group-hover/stat:text-emerald-300 transition-colors">
                        {s.value}
                      </span>
                      <span className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating micro decorations */}
              <motion.div
                className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/40 flex items-center justify-center text-black font-bold text-[10px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 shadow-lg shadow-teal-500/40"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
