"use client";

import { motion } from "framer-motion";
import { dsa } from "../data/dsa-leetcode";
import { Trophy, Target, Award } from "lucide-react";

export default function DSA() {
  return (
    <section id="dsa" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Problem <span className="text-gradient">Solving</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg text-pretty">
            Quantifying my journey through algorithms and data structures on platforms like LeetCode and GitHub.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl text-center group"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Trophy className="text-purple-500" size={24} />
            </div>
            <p className="text-4xl font-bold text-white mb-2">{dsa.totalSolved}+</p>
            <p className="text-zinc-400 font-medium">Problems Solved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl text-center group"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Target className="text-blue-500" size={24} />
            </div>
            <p className="text-xl font-bold text-white mb-2">{dsa.currentFocus}</p>
            <p className="text-zinc-400 font-medium">Current focus</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl text-center group"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Award className="text-emerald-500" size={24} />
            </div>
            <p className="text-xl font-bold text-white mb-2">Knight</p>
            <p className="text-zinc-400 font-medium">LeetCode Rank</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-4 rounded-3xl overflow-hidden"
          >
            <img
              src={dsa.githubStreak}
              alt="GitHub Streak"
              className="w-full h-auto rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-4 rounded-3xl overflow-hidden"
          >
            <img
              src={dsa.leetcode}
              alt="LeetCode Stats"
              className="w-full h-auto rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}