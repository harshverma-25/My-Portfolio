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
        <div className="absolute top-1/4 -left-32 h-[450px] w-[450px] rounded-full bg-white/[0.02] blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 h-[450px] w-[450px] rounded-full bg-white/[0.015] blur-[140px]" />
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
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                @{siteConfig.handle}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <HiSparkles className="text-zinc-300" size={13} />
                Available for New Projects
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} className="mb-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {siteConfig.name}
                </span>
              </h1>
            </motion.div>

            {/* Role Line — Full Stack Developer */}
            <motion.div variants={fadeUp} className="mb-6">
              <p className="text-base sm:text-lg font-mono text-zinc-400 tracking-wide flex items-center gap-2">
                <span className="text-white font-semibold">{siteConfig.role}</span>
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
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10">View Selected Work</span>
                <HiArrowRight className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98]"
              >
                <HiDownload size={16} />
                <span>Resume</span>
                <FiArrowUpRight size={13} className="text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ════ RIGHT COLUMN (3D Avatar & Glass Bento) ════ */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate="show"
            className="flex justify-center"
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
              {/* Outer glow ring (Monochrome) */}
              <div className="absolute -inset-2 rounded-[42px] bg-gradient-to-b from-white/15 via-white/5 to-transparent blur-2xl opacity-70" />

              {/* Glass card container with rounded border frame & transparent glass backdrop */}
              <div className="relative rounded-[36px] p-[1.5px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-zinc-950/40 backdrop-blur-3xl p-5 w-full max-w-[340px] sm:max-w-[370px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">

                  {/* Photo area with rounded shape */}
                  <div className="relative mb-5 group/avatar">
                    <div className="relative h-[290px] w-full overflow-hidden rounded-[24px] border border-white/15 bg-zinc-900 shadow-inner ring-1 ring-white/10">
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
                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 backdrop-blur-xl px-3.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      <span className="text-[11px] font-semibold text-white font-mono tracking-wide">
                        Open to Work
                      </span>
                    </div>
                  </div>

                  {/* Minimal stats row with rounded glass capsules */}
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="group/stat flex flex-col items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.03] backdrop-blur-md py-3 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      >
                        <span className="text-base font-bold text-white font-mono group-hover/stat:text-white transition-colors">
                          {s.value}
                        </span>
                        <span className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating micro decorations */}
              <motion.div
                className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-white text-black shadow-lg shadow-white/20 flex items-center justify-center font-bold text-[10px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-zinc-800 border border-white/20 shadow-lg"
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
