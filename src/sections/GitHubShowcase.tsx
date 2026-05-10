"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { 
  FaGithub, 
  FaStar, 
  FaCodeFork, 
  FaBookBookmark, 
  FaArrowUpRightFromSquare,
  FaFire,
  FaCode
} from "react-icons/fa6";
import { GitHubStats } from "../lib/github";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function GitHubShowcase() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch("/api/github?username=harshverma-25");
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
    <section id="github" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-emerald-500/50" />
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Engineering Activity</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <FaGithub className="text-emerald-500" />
              GitHub Showcase
            </h2>
          </div>
          
          {stats?.user.html_url && (
            <a 
              href={stats.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300 group"
            >
              Follow @{stats.user.login}
              <FaArrowUpRightFromSquare size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </motion.div>

        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* Profile Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm relative group overflow-hidden"
          >
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-full" />
                <div className="w-1/2 h-6 bg-white/10 rounded" />
                <div className="w-full h-20 bg-white/10 rounded" />
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={stats?.user.avatar_url} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-2xl border border-white/10"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{stats?.user.name}</h3>
                    <p className="text-sm text-zinc-500">@{stats?.user.login}</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {stats?.user.bio || "Full-stack developer focused on building scalable backend systems."}
                </p>
                <div className="flex gap-6">
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Repos</div>
                    <div className="text-xl font-bold text-white font-mono">{stats?.user.public_repos}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Followers</div>
                    <div className="text-xl font-bold text-white font-mono">{stats?.user.followers}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <FaStar className="text-yellow-500/80 mb-3" size={18} />
              <div className="text-2xl font-bold text-white font-mono">{loading ? "..." : stats?.totalStars}</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Total Stars</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <FaCodeFork className="text-emerald-500/80 mb-3" size={18} />
              <div className="text-2xl font-bold text-white font-mono">{loading ? "..." : stats?.totalForks}</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Total Forks</div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <FaFire className="text-orange-500/80 mb-3" size={18} />
              <div className="text-2xl font-bold text-white font-mono">365+</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Days Streak</div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <FaCode className="text-blue-500/80 mb-3" size={18} />
              <div className="text-2xl font-bold text-white font-mono">{stats?.languages[0]?.name || "TS"}</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Top Tech</div>
            </motion.div>
          </div>

          {/* Contribution Calendar Card - The "Green Thing" */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-4 p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h4 className="text-xs font-mono text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Contribution Graph
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  <span className="w-2 h-2 rounded-sm bg-zinc-900" /> Less
                  <span className="w-2 h-2 rounded-sm bg-emerald-900" />
                  <span className="w-2 h-2 rounded-sm bg-emerald-700" />
                  <span className="w-2 h-2 rounded-sm bg-emerald-500" />
                  <span className="w-2 h-2 rounded-sm bg-emerald-400" /> More
                </div>
              </div>
            </div>

            <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[800px] flex justify-center">
                <GitHubCalendar 
                  username="harshverma-25" 
                  theme={calendarTheme}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                />
              </div>
            </div>
          </motion.div>

          {/* Languages distribution */}
          <motion.div variants={itemVariants} className="md:col-span-2 p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Language Mix</h4>
            <div className="space-y-4">
              {stats?.languages.map((lang) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-zinc-400">{lang.name}</span>
                    <span className="text-zinc-600">{Math.round((lang.count / stats.user.public_repos) * 100)}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(lang.count / stats.user.public_repos) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Repos */}
          <motion.div variants={itemVariants} className="md:col-span-2 p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Latest Repos</h4>
            <div className="space-y-3">
              {stats?.recentActivity.map((repo) => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FaBookBookmark size={12} className="text-emerald-500/60" />
                    <span className="text-xs font-medium text-white group-hover:text-emerald-400 transition-colors truncate max-w-[120px]">
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-mono">
                    <span className="flex items-center gap-1">
                      <FaStar size={10} className="text-yellow-500/50" />
                      {repo.stargazers_count}
                    </span>
                    <span>{repo.language}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
