"use client";

import { motion, Variants } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCode,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlineBriefcase, HiOutlineAcademicCap } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";
import { contact } from "../data/contact";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const infoItems = [
  {
    icon: <HiOutlineBriefcase size={15} />,
    label: "Backend-focused Full-Stack Developer",
  },
  {
    icon: <HiOutlineAcademicCap size={15} />,
    label: "B.Tech CSE · 2022–2026",
  },
  {
    icon: <FaMapMarkerAlt size={13} />,
    label: "India",
  },
  {
    icon: <FaCode size={13} />,
    label: "200+ DSA problems solved",
  },
  {
    icon: <FaEnvelope size={13} />,
    label: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: <FaGithub size={14} />,
    label: "github.com/harshverma-25",
    href: contact.github,
  },
];

const socials = [
  { icon: <FaGithub size={17} />, href: contact.github, label: "GitHub" },
  { icon: <FaLinkedin size={17} />, href: contact.linkedin, label: "LinkedIn" },
  { icon: <FaTwitter size={17} />, href: contact.twitter, label: "Twitter" },
  {
    icon: <SiLeetcode size={17} />,
    href: "https://leetcode.com/harshverma-25",
    label: "LeetCode",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center section-container pt-20 pb-24"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        {/* ── Card ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          className="hero-card rounded-2xl border border-white/[0.07] bg-zinc-900/60 backdrop-blur-md overflow-hidden"
        >
          {/* Top strip */}
          <div className="hero-top-strip h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />

          {/* Header block */}
          <div className="px-7 pt-8 pb-6 flex items-start gap-5 border-b border-white/[0.06]">
            {/* Avatar */}
            <motion.div
              custom={0.05}
              variants={fadeUp}
              className="hero-avatar flex-shrink-0 relative"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white select-none shadow-lg shadow-blue-500/20">
                HV
              </div>
              {/* Online dot */}
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-zinc-900 shadow shadow-emerald-400/50" />
            </motion.div>

            {/* Name + tagline */}
            <div className="flex-1 min-w-0">
              <motion.div
                custom={0.08}
                variants={fadeUp}
                className="flex items-center flex-wrap gap-2 mb-1"
              >
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Harsh Verma
                </h1>
                {/* Open-to-work badge */}
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to work
                </span>
              </motion.div>

              <motion.p
                custom={0.12}
                variants={fadeUp}
                className="text-sm text-zinc-400 mb-3 font-mono"
              >
                Building systems that scale · he/him
              </motion.p>

              {/* Role chips */}
              <motion.div
                custom={0.16}
                variants={fadeUp}
                className="flex flex-wrap gap-2"
              >
                {["Node.js", "React", "TypeScript", "MongoDB", "DSA"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300"
                    >
                      {tag}
                    </span>
                  )
                )}
              </motion.div>
            </div>
          </div>

          {/* Bio */}
          <motion.p
            custom={0.2}
            variants={fadeUp}
            className="px-7 pt-5 pb-4 text-sm text-zinc-400 leading-relaxed border-b border-white/[0.06]"
          >
            I build full-stack web applications with a focus on backend
            architecture and real-world problem solving. Passionate about clean
            APIs, performant systems, and continuous improvement through DSA
            practice.
          </motion.p>

          {/* Info grid */}
          <motion.div
            custom={0.26}
            variants={fadeUp}
            className="px-7 py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-white/[0.06]"
          >
            {infoItems.map((item, i) =>
              item.href ? (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white group transition-colors"
                >
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </a>
              ) : (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-zinc-400"
                >
                  <span className="text-blue-400 flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              )
            )}
          </motion.div>

          {/* Footer: socials + CTAs */}
          <motion.div
            custom={0.34}
            variants={fadeUp}
            className="px-7 py-5 flex flex-wrap items-center justify-between gap-4"
          >
            {/* Social icons */}
            <div className="flex items-center gap-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-white/[0.1] bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700/80 transition-all"
              >
                <FaFileAlt size={12} />
                Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow shadow-blue-500/20 transition-all"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 transition-all"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Subtle stat pills below card */}
        <motion.div
          custom={0.42}
          variants={fadeUp}
          className="mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { val: "200+", desc: "DSA Problems" },
            { val: "5+", desc: "Projects Built" },
            { val: "2026", desc: "Graduating" },
            { val: "Active", desc: "Learner" },
          ].map((stat) => (
            <div
              key={stat.desc}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-sm"
            >
              <span className="font-semibold text-white">{stat.val}</span>
              <span className="text-zinc-500">{stat.desc}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}