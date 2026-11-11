"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AmbientBackground() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#080808]">
      {/* 1. Dynamic Cursor Spotlight Follower (Monochrome) */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
        style={{
          x: smoothX,
          y: smoothY,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* 2. Animated Monochrome Ambient Radial Orbs */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full bg-white/[0.025] blur-[150px]"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[160px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* 2.5 Floating Rounded Shapes & Translucent Glass Rings */}
      <motion.div
        aria-hidden="true"
        className="hidden lg:block absolute top-[18%] left-[8%] w-[280px] h-[140px] rounded-[70px] border border-white/[0.04] bg-white/[0.01] backdrop-blur-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none"
        animate={{
          y: [0, -18, 0],
          rotate: [-4, 3, -4],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="hidden lg:block absolute top-[55%] right-[6%] w-[220px] h-[220px] rounded-[55px] border border-white/[0.035] bg-white/[0.008] backdrop-blur-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] pointer-events-none"
        animate={{
          y: [0, 22, 0],
          rotate: [12, 2, 12],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="hidden md:block absolute bottom-[15%] left-[12%] w-[180px] h-[90px] rounded-[45px] border border-white/[0.03] bg-white/[0.006] pointer-events-none"
        animate={{
          x: [0, 15, 0],
          y: [0, -12, 0],
          rotate: [6, -4, 6],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* 3. Delicate Animated Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0px 0px", "56px 56px"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* 4. Subtle Vignette & Depth Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_20%,rgba(8,8,8,0.85)_100%)]" />
    </div>
  );
}
