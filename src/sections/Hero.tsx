"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../data/site";
import { contact } from "../data/contact";
import { education } from "../data/education";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight, FiDownload } from "react-icons/fi";

const roles = [
  "Full Stack Developer",
  "Backend & Systems Engineer",
  "Distributed Architectures",
  "Product Builder",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer: NodeJS.Timeout;
    if (!isDeleting) {
      if (displayText.length < current.length) {
        timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 65);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 32);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 280);
      }
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const socials = [
    { icon: FiGithub,   href: contact.socials.github.url,   label: "GitHub" },
    { icon: FiLinkedin, href: contact.socials.linkedin.url, label: "LinkedIn" },
    { icon: FiTwitter,  href: contact.socials.twitter.url,  label: "Twitter" },
    { icon: FiMail,     href: `mailto:${contact.email}`,    label: "Email" },
  ];

  return (
    <section id="home" className="w-full pt-28 sm:pt-36 pb-10 sm:pb-12 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-11"
        >
          {/* ── LEFT: Avatar Card + Name + Location ── */}
          <div className="flex flex-col items-center sm:items-start shrink-0 text-center sm:text-left">
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.03 }}
              className="group relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden mb-3 border border-white/15 bg-zinc-900/60 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
            >
              {/* Subtle ambient pulse border on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <Image
                src="/avatar.png"
                alt={siteConfig.name}
                fill
                priority
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover object-top grayscale contrast-115 brightness-95 transition-all duration-700 ease-out group-hover:contrast-125 group-hover:scale-105"
              />

              {/* Subtle dark bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

              {/* Smooth light-sweep shimmer animation */}
              <motion.div
                initial={{ x: "-120%", opacity: 0 }}
                animate={{
                  x: ["120%", "-120%"],
                  opacity: [0, 0.35, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  repeatDelay: 2.5,
                }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20 -skew-x-12"
              />

              {/* Sleek inner ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none z-20" />
            </motion.div>

            {/* Name in Instrument Serif italic */}
            <h1
              className="text-2xl sm:text-[28px] text-white tracking-wide leading-tight font-serif"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}
            >
              {siteConfig.name}
            </h1>

            {/* Location pill */}
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Based in India</span>
            </div>
          </div>

          {/* ── RIGHT: Role, Headline, Bio, Education, Actions ── */}
          <div className="flex flex-col justify-start min-w-0 w-full pt-0.5">

            {/* Role typewriter pill */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono text-zinc-300 tracking-wider uppercase">
                  {displayText}
                  <span className="inline-block w-1.5 h-3 bg-white/70 ml-1 align-middle animate-pulse" />
                </span>
              </div>
            </div>

            {/* Headline in Instrument Serif */}
            <h2
              className="text-2xl sm:text-3xl text-zinc-100 font-light tracking-wide mb-3 leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Full-Stack Developer
              
            </h2>

            {/* Bio description */}
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-zinc-400 font-sans tracking-normal mb-5 max-w-xl">
              I build scalable backend systems, robust distributed architectures, and intuitive web products. 
              Passionate about clean code, high-throughput systems, and engineering software that performs reliably at scale.
            </p>

            {/* Education minimal bar */}
            <div className="text-[12px] font-mono text-zinc-400 bg-zinc-900/30 p-2.5 sm:p-3 rounded-xl border border-zinc-800/70 mb-5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="text-zinc-200 font-medium">Education:</span>
                <span className="text-zinc-300">{education.degree}</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">ITM Gwalior ({education.duration.replace("—", "–")})</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            {/* Socials & CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.label !== "Email" ? "_blank" : undefined}
                    rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    title={social.label}
                    whileHover={{ y: -2 }}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/25 hover:bg-white/[0.07] transition-all shadow-xs"
                  >
                    <social.icon size={15} />
                  </motion.a>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-2.5">
                <motion.a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 text-zinc-200 hover:text-white text-[12px] font-medium transition-all shadow-xs"
                >
                  <FiDownload size={13} className="text-zinc-400" />
                  <span>Resume</span>
                  <FiArrowUpRight size={12} className="text-zinc-500" />
                </motion.a>

                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-[12px] font-semibold transition-all shadow-xs"
                >
                  <span>View Projects</span>
                  <span className="text-[11px]">↓</span>
                </motion.a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
