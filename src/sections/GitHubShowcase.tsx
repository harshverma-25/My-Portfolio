"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
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
import { GitHubStats, MOCK_GITHUB_STATS } from "../lib/github";

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

const emptySubscribe = () => () => {};

export default function GitHubShowcase() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch(`/api/github?username=${siteConfig.githubUsername}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("GitHub fetch error:", err);
        setStats(MOCK_GITHUB_STATS);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const calendarTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section id="github" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Background Glow (Monochrome) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.015] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.04)] backdrop-blur-md">
            <FaGithub className="text-white" size={13} />
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-medium">
              Open Source
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            GitHub{" "}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Activity & Metrics
            </span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-light">
            Live contributions, repository metrics, and code activity on GitHub.
          </p>
          
          {stats?.user.html_url && (
            <div className="flex justify-center mt-5">
              <a
                href={stats.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-400 hover:border-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <FaGithub size={14} className="text-white" />
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
          <motion.div variants={itemVariants} className="group p-5 rounded-[24px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl hover:border-white/25 hover:bg-zinc-900/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-105 transition-transform">
                <FaStar size={15} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">{loading ? "..." : stats?.totalStars}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1 font-mono">Stars Received</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="group p-5 rounded-[24px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl hover:border-white/25 hover:bg-zinc-900/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-105 transition-transform">
                <FaCodeFork size={15} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">{loading ? "..." : stats?.totalForks}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1 font-mono">Repository Forks</div>
          </motion.div>

          <motion.div variants={itemVariants} className="group p-5 rounded-[24px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl hover:border-white/25 hover:bg-zinc-900/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-105 transition-transform">
                <FaFire size={15} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">365+</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1 font-mono">Day Streak</div>
          </motion.div>

          <motion.div variants={itemVariants} className="group p-5 rounded-[24px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl hover:border-white/25 hover:bg-zinc-900/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-105 transition-transform">
                <FaCode size={15} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight truncate">{stats?.languages[0]?.name || "TypeScript"}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1 font-mono">Top Language</div>
          </motion.div>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-6 rounded-[28px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]"
        >
          {loading ? (
            <div className="animate-pulse flex items-center gap-5">
              <div className="w-14 h-14 bg-white/10 rounded-2xl" />
              <div className="flex-1">
                <div className="w-40 h-5 bg-white/10 rounded-lg mb-2" />
                <div className="w-28 h-3 bg-white/10 rounded-lg" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-14 h-14 rounded-2xl border border-white/15 overflow-hidden flex-shrink-0 shadow-md">
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
                    <p className="text-xs text-zinc-400 font-mono">@{stats?.user.login}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">Repositories</div>
                      <div className="text-base font-bold text-white font-mono">{stats?.user.public_repos}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">Followers</div>
                      <div className="text-base font-bold text-white font-mono">{stats?.user.followers}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">Following</div>
                      <div className="text-base font-bold text-white font-mono">{stats?.user.following}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 font-light line-clamp-2">
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
          className="p-5 sm:p-6 rounded-[28px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse" />
              Contribution Graph
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-zinc-500 font-mono">Less</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#161b22]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">More</span>
            </div>
          </div>

          {/* Smooth touch container: touch-pan-y prevents vertical scroll trap on mobile */}
          <div 
            className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-white/10 [touch-action:pan-y] [-webkit-overflow-scrolling:touch]"
          >
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
                <div className="h-[112px] w-full animate-pulse rounded-2xl bg-white/[0.02]" />
              )}
            </div>
          </div>

          {/* Mobile swipe hint */}
          <div className="sm:hidden flex items-center justify-center gap-1.5 pt-2 text-[10px] font-mono text-zinc-500">
            <span>⇄ Swipe horizontally to view 12-month timeline</span>
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
            className="p-6 rounded-[28px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]"
          >
            <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <FaCode size={12} className="text-white" />
              Language Distribution
            </h4>
            <div className="space-y-4">
              {(() => {
                const totalLang = stats?.languages.reduce((acc, l) => acc + l.count, 0) || (stats?.user.public_repos || 1);
                return stats?.languages.slice(0, 5).map((lang, i) => {
                  const pct = Math.min(100, Math.round((lang.count / totalLang) * 100));
                  const barOpacities = ["bg-white", "bg-zinc-300", "bg-zinc-400", "bg-zinc-500", "bg-zinc-600"];
                  return (
                    <div key={lang.name} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-zinc-300">{lang.name}</span>
                        <span className="text-zinc-500">{pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${barOpacities[i % barOpacities.length]}`}
                        />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </motion.div>

          {/* Recent Repos */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-[28px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]"
          >
            <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <FaBookBookmark size={12} className="text-white" />
              Recent Activity
            </h4>
            <div className="space-y-2.5">
              {stats?.recentActivity.slice(0, 5).map((repo) => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <FaBookBookmark size={11} className="text-zinc-400 group-hover:text-white flex-shrink-0 transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-zinc-200 transition-colors truncate">
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1">
                      <FaStar size={9} className="text-zinc-400 group-hover:text-white transition-colors" />
                      {repo.stargazers_count}
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-400">{repo.language || "N/A"}</span>
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