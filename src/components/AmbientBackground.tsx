"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#080808]">
      {/* 1. Animated Radial Glow Orbs */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[140px]"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 h-[550px] w-[550px] rounded-full bg-teal-500/8 blur-[150px]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/4 h-[580px] w-[580px] rounded-full bg-cyan-500/8 blur-[160px]"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
          scale: [0.95, 1.15, 1, 0.95],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* 2. Delicate Animated Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0px 0px", "56px 56px"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* 3. Subtle Vignette & Depth Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_20%,rgba(8,8,8,0.7)_100%)]" />
    </div>
  );
}
