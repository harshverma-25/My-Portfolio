"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from "react-icons/fi";
import { siteConfig } from "../data/site";
import { contact } from "../data/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FiGithub, href: contact.socials.github.url, label: "GitHub" },
    { icon: FiLinkedin, href: contact.socials.linkedin.url, label: "LinkedIn" },
    { icon: FiTwitter, href: contact.socials.twitter.url, label: "Twitter" },
    { icon: FiMail, href: `mailto:${contact.email}`, label: "Email" },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-black/40 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs text-zinc-500 font-light"
          >
            © {currentYear} <span className="text-zinc-300 font-medium">{siteConfig.name}</span> ({siteConfig.handle}). All rights reserved.
          </motion.p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300"
                aria-label={social.label}
                title={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Built with */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono"
          >
            <span>Crafted with</span>
            <FiHeart className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>by</span>
            <span className="text-white font-semibold">{siteConfig.handle}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}