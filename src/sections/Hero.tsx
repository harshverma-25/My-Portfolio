"use client";

import Image from "next/image";
import { siteConfig } from "../data/site";
import { contact } from "../data/contact";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight, FiFileText } from "react-icons/fi";

export default function Hero() {
  const socials = [
    { icon: FiGithub, href: contact.socials.github.url, label: "GitHub" },
    { icon: FiLinkedin, href: contact.socials.linkedin.url, label: "LinkedIn" },
    { icon: FiTwitter, href: contact.socials.twitter.url, label: "Twitter" },
    { icon: FiMail, href: `mailto:${contact.email}`, label: "Email" },
  ];

  return (
    <section id="home" className="w-full pt-28 sm:pt-36 pb-12 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-8 md:gap-10">
        
        {/* ── LEFT COLUMN: Portrait, Name, Location ── */}
        <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left">
          <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-zinc-900 shrink-0 mb-4 group">
            <Image
              src="/avatar.png"
              alt={siteConfig.name}
              fill
              priority
              sizes="(max-width: 640px) 112px, 128px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl tracking-wide text-white italic font-serif">
            {siteConfig.name}
          </h1>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mt-1">
            Based in India
          </span>
        </div>

        {/* ── RIGHT COLUMN: Role, Bio, Education Note, Socials & Resume ── */}
        <div className="flex flex-col justify-start min-w-0 w-full pt-1">
          <div className="flex items-center gap-3 mb-2.5">
            <h2 className="text-zinc-100 tracking-wider text-lg sm:text-xl font-light uppercase font-mono">
              {siteConfig.role} & Product Builder
            </h2>
          </div>

          <p className="text-[14px] leading-relaxed text-zinc-400 font-sans tracking-wide text-left mb-4">
            {siteConfig.bio}
          </p>

          {/* Education / Status Box */}
          <div className="text-[12px] font-mono text-zinc-400 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80 mb-6 flex items-center justify-between gap-2 shadow-2xs">
            <div>
              <span className="text-zinc-200 font-semibold">Education:</span> B.Tech in Information Technology | ITM Gwalior (2022 – 2026)
            </div>
            <span className="hidden sm:inline-flex text-[10px] font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap">
              • Active
            </span>
          </div>

          {/* Socials & CTAs Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all shadow-xs"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all font-mono text-xs"
              >
                <FiFileText size={13} className="text-zinc-400 group-hover:text-white" />
                <span>Resume</span>
                <FiArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all font-sans font-medium text-xs shadow-sm"
              >
                <span>Projects</span>
                <span>↓</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
