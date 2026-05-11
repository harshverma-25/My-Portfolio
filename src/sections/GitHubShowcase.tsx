"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import Image from "next/image";
import { 
  FaGithub, 
  FaStar, 
  FaCodeFork, 
  FaBookBookmark, 
  FaArrowUpRightFromSquare,
  FaFire,
  FaCode
} from "react-icons/fa6";
import { siteConfig } from "../data/site";
import { GitHubStats } from "../lib/github";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GitHubShowcase() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch(`/api/github?username=${siteConfig.githubUsername}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (error) return null;

  const calendarTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section id="github" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-3">
            GitHub Activity
          </h2>
          <p className="text-zinc-500 text-sm text-center">
            My open source contributions and activity on GitHub.
          </p>
          
          {stats?.user.html_url && (
            <div className="flex justify-center mt-4">
              <a
                href={stats.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-400 transition-colors duration-300 group"
              >
                <FaGithub size={14} className="text-emerald-500" />
                <span className="font-mono">@{stats.user.login}</span>
                <FaArrowUpRightFromSquare size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          )}
        </motion.div>

        {/* Stats Grid - 4 column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants} className="group p-5 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <FaStar className="text-yellow-500/70 group-hover:text-yellow-500 transition-colors" size={16} />
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">{loading ? "..." : stats?.totalStars}</div>
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mt-1">Stars Received</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="group p-5 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <FaCodeFork className="text-emerald-500/70 group-hover:text-emerald-500 transition-colors" size={16} />
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">{loading ? "..." : stats?.totalForks}</div>
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mt-1">Repository Forks</div>
          </motion.div>

          <motion.div variants={itemVariants} className="group p-5 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <FaFire className="text-orange-500/70 group-hover:text-orange-500 transition-colors" size={16} />
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">365+</div>
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mt-1">Day Streak</div>
          </motion.div>

          <motion.div variants={itemVariants} className="group p-5 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <FaCode className="text-blue-500/70 group-hover:text-blue-500 transition-colors" size={16} />
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight truncate">{stats?.languages[0]?.name || "TS"}</div>
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mt-1">Primary Language</div>
          </motion.div>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-6 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm mb-8"
        >
          {loading ? (
            <div className="animate-pulse flex items-center gap-5">
              <div className="w-14 h-14 bg-white/10 rounded-xl" />
              <div className="flex-1">
                <div className="w-40 h-5 bg-white/10 rounded mb-2" />
                <div className="w-28 h-3 bg-white/10 rounded" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-14 h-14 rounded-xl border border-white/10 overflow-hidden flex-shrink-0">
                <Image 
                  src={stats?.user.avatar_url || ""} 
                  alt={stats?.user.name || "GitHub Profile"} 
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{stats?.user.name || "Harsh Verma"}</h3>
                    <p className="text-xs text-zinc-500 font-mono">@{stats?.user.login}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Repositories</div>
                      <div className="text-base font-bold text-white">{stats?.user.public_repos}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Followers</div>
                      <div className="text-base font-bold text-white">{stats?.user.followers}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Following</div>
                      <div className="text-base font-bold text-white">{stats?.user.following}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {stats?.user.bio || "Full-stack developer focused on building scalable backend systems and distributed architectures."}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Contribution Calendar */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-6 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent mb-8 overflow-x-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h4 className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Contribution Graph
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-zinc-600">Less</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#161b22]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
              </div>
              <span className="text-[8px] text-zinc-600">More</span>
            </div>
          </div>

          <div className="flex justify-center overflow-x-auto pb-3">
            <div className="min-w-[650px] flex justify-center">
              {mounted && (
                <GitHubCalendar 
                  username={siteConfig.githubUsername} 
                  theme={calendarTheme}
                  fontSize={10}
                  blockSize={11}
                  blockMargin={3}
                />
              )}
              {!mounted && (
                <div className="h-[112px] w-full animate-pulse rounded-lg bg-white/[0.02]" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Languages and Recent Repos - Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Languages distribution */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <h4 className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-5 flex items-center gap-2">
              <FaCode size={12} className="text-emerald-500" />
              Language Distribution
            </h4>
            <div className="space-y-4">
              {stats?.languages.slice(0, 5).map((lang) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-300">{lang.name}</span>
                    <span className="text-zinc-500">{Math.round((lang.count / stats.user.public_repos) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(lang.count / stats.user.public_repos) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Repos */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <h4 className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-5 flex items-center gap-2">
              <FaBookBookmark size={12} className="text-emerald-500" />
              Recent Activity
            </h4>
            <div className="space-y-2.5">
              {stats?.recentActivity.slice(0, 5).map((repo) => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <FaBookBookmark size={11} className="text-emerald-500/60 flex-shrink-0" />
                    <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1">
                      <FaStar size={9} className="text-yellow-500/60" />
                      {repo.stargazers_count}
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-500">{repo.language || "N/A"}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}