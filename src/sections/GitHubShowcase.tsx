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
    <section id="github" className="py-24 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* EXACT NAVBAR WIDTH AND CENTERING */}
      <div className="w-full flex justify-center px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-[680px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Engineering Activity</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <FaGithub className="text-emerald-500" />
                GitHub Showcase
              </h2>
              
              {stats?.user.html_url && (
                <a 
                  href={stats.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-500 hover:text-emerald-400 transition-colors duration-300 group"
                >
                  @{stats.user.login}
                  <FaArrowUpRightFromSquare size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Stats Grid - Compact 2x2 layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 mb-6"
          >
            <motion.div variants={itemVariants} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <FaStar className="text-yellow-500/80 mb-2" size={14} />
              <div className="text-xl font-bold text-white font-mono">{loading ? "..." : stats?.totalStars}</div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Stars</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <FaCodeFork className="text-emerald-500/80 mb-2" size={14} />
              <div className="text-xl font-bold text-white font-mono">{loading ? "..." : stats?.totalForks}</div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Forks</div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <FaFire className="text-orange-500/80 mb-2" size={14} />
              <div className="text-xl font-bold text-white font-mono">365+</div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Streak</div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <FaCode className="text-blue-500/80 mb-2" size={14} />
              <div className="text-xl font-bold text-white font-mono truncate">{stats?.languages[0]?.name || "TS"}</div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Top Language</div>
            </motion.div>
          </motion.div>

          {/* Profile Card - Simplified */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-5 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm mb-6"
          >
            {loading ? (
              <div className="animate-pulse flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full" />
                <div className="flex-1">
                  <div className="w-32 h-5 bg-white/10 rounded mb-2" />
                  <div className="w-24 h-3 bg-white/10 rounded" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={stats?.user.avatar_url} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-xl border border-white/10"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{stats?.user.name}</h3>
                      <p className="text-xs text-zinc-500">@{stats?.user.login}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Repos</div>
                        <div className="text-sm font-bold text-white">{stats?.user.public_repos}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Followers</div>
                        <div className="text-sm font-bold text-white">{stats?.user.followers}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2 line-clamp-1">
                    {stats?.user.bio || "Full-stack developer focused on building scalable backend systems."}
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
            className="p-4 rounded-xl border border-white/5 bg-white/[0.01] mb-6 overflow-x-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Contribution Graph
              </h4>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 text-[8px] text-zinc-500">
                  <span className="w-2 h-2 rounded-sm bg-zinc-900" />
                  <span className="w-2 h-2 rounded-sm bg-emerald-900" />
                  <span className="w-2 h-2 rounded-sm bg-emerald-700" />
                  <span className="w-2 h-2 rounded-sm bg-emerald-500" />
                  <span className="w-2 h-2 rounded-sm bg-emerald-400" />
                </div>
              </div>
            </div>

            <div className="flex justify-center overflow-x-auto pb-2">
              <div className="min-w-[600px] flex justify-center scale-90 origin-center">
                <GitHubCalendar 
                  username="harshverma-25" 
                  theme={calendarTheme}
                  fontSize={10}
                  blockSize={10}
                  blockMargin={3}
                />
              </div>
            </div>
          </motion.div>

          {/* Languages and Recent Repos - Two column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Languages distribution */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-4 rounded-xl border border-white/5 bg-white/[0.01]"
            >
              <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Language Mix</h4>
              <div className="space-y-3">
                {stats?.languages.slice(0, 4).map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono">
                      <span className="text-zinc-400">{lang.name}</span>
                      <span className="text-zinc-600">{Math.round((lang.count / stats.user.public_repos) * 100)}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(lang.count / stats.user.public_repos) * 100}%` }}
                        transition={{ duration: 0.8 }}
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
              className="p-4 rounded-xl border border-white/5 bg-white/[0.01]"
            >
              <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Latest Repos</h4>
              <div className="space-y-2">
                {stats?.recentActivity.slice(0, 4).map((repo) => (
                  <a 
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FaBookBookmark size={10} className="text-emerald-500/60 flex-shrink-0" />
                      <span className="text-[11px] font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                        {repo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-zinc-600 font-mono flex-shrink-0">
                      <span className="flex items-center gap-0.5">
                        <FaStar size={8} className="text-yellow-500/50" />
                        {repo.stargazers_count}
                      </span>
                      <span className="text-zinc-700">•</span>
                      <span>{repo.language}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}