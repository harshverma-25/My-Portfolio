"use client";

import { motion, Variants } from "framer-motion";
import { dsa } from "../data/dsa-leetcode";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DSA() {
  return (
    <section id="dsa" className="py-20 border-t border-white/[0.06]">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="section-heading mb-2">Problem Solving</h2>
          <p className="section-subtext">
            My competitive programming and DSA journey.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-white mb-0.5">
              {dsa.totalSolved}+
            </p>
            <p className="text-xs text-zinc-500">Problems Solved</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-lg font-bold text-blue-400 mb-0.5">Knight</p>
            <p className="text-xs text-zinc-500">LeetCode Rank</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-xs font-semibold text-white mb-0.5 leading-snug">
              {dsa.currentFocus}
            </p>
            <p className="text-xs text-zinc-500">Current Focus</p>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            <img
              src={dsa.githubStreak}
              alt="GitHub Streak"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 } as object}
            className="card overflow-hidden"
          >
            <img
              src={dsa.leetcode}
              alt="LeetCode Stats"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}