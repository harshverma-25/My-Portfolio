"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from "react-icons/fi";
import { siteConfig } from "../data/site";
import { contact } from "../data/contact";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const socialLinks = [
    { icon: FiGithub, href: contact.socials.github.url, label: "GitHub" },
    { icon: FiLinkedin, href: contact.socials.linkedin.url, label: "LinkedIn" },
    { icon: FiTwitter, href: contact.socials.twitter.url, label: "Twitter" },
    { icon: FiMail, href: `mailto:${contact.email}`, label: "Email" },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs text-gray-600 hover:text-gray-500 transition-colors duration-300"
          >
            © {currentYear ?? "——"} {siteConfig.name}
          </motion.p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Built with */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1 text-xs text-gray-700"
          >
            <span>Built with</span>
            <FiHeart className="w-3 h-3 text-red-500/70 animate-pulse" />
            <span>using</span>
            <span className="text-gray-500">Next.js · Framer · Tailwind</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}