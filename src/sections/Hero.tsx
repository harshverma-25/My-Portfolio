"use client";

import { motion, Variants } from "framer-motion";
import { FileText, Send, Code, Terminal } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] as any 
      } 
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-block">
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-purple-400 uppercase">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter"
        >
          Building Digital <br />
          <span className="text-gradient">Experiences.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          I&apos;m <span className="text-white font-semibold">Harsh Verma</span>, a Full Stack Developer dedicated to crafting high-performance applications and solving complex problems through elegant code.
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://github.com/harshverma-25"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-neutral-200 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <Terminal size={20} />
            GitHub
          </a>

          <a
            href="/resume.pdf"
            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <FileText size={20} />
            Resume
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <Send size={20} />
            Contact
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent" />
      </motion.div>
    </section>
  );
}