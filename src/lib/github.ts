/**
 * GitHub API Helper
 * Handles fetching user data, repositories, and aggregating stats.
 */

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  languages: { name: string; count: number; color: string }[];
  recentActivity: GitHubRepo[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  React: "#61dafb",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  Rust: "#dea584",
};

/**
 * Fetch comprehensive GitHub stats for a user
 */
export async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      // Add GITHUB_TOKEN to env if you hit rate limits
      ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
    };

    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) throw new Error("Failed to fetch GitHub user");
    const user: GitHubUser = await userRes.json();

    // 2. Fetch Repositories (Up to 100)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
    if (!reposRes.ok) throw new Error("Failed to fetch GitHub repos");
    const allRepos: GitHubRepo[] = await reposRes.json();

    // 3. Process Stats
    let totalStars = 0;
    let totalForks = 0;
    const langMap: Record<string, number> = {};

    allRepos.forEach((repo) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    // Sort languages by count
    const languages = Object.entries(langMap)
      .map(([name, count]) => ({
        name,
        count,
        color: LANGUAGE_COLORS[name] || "#888888",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recent repos (last 3 updated)
    const recentActivity = [...allRepos]
      .filter((r) => !r.forks_count) // only original repos
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 3);

    return {
      user,
      repos: allRepos,
      totalStars,
      totalForks,
      languages,
      recentActivity,
    };
  } catch (error) {
    console.error("GitHub Fetch Error:", error);
    return null;
  }
}

/**
 * Fallback Mock Data
 */
export const MOCK_GITHUB_STATS: GitHubStats = {
  user: {
    login: "harshverma-25",
    name: "Harsh Verma",
    avatar_url: "https://github.com/harshverma-25.png",
    html_url: "https://github.com/harshverma-25",
    bio: "Full Stack Developer | Building cool stuff",
    public_repos: 42,
    followers: 150,
    following: 120,
    created_at: "2021-01-01T00:00:00Z",
  },
  repos: [],
  totalStars: 124,
  totalForks: 32,
  languages: [
    { name: "TypeScript", count: 25, color: "#3178c6" },
    { name: "JavaScript", count: 15, color: "#f1e05a" },
    { name: "Python", count: 8, color: "#3572A5" },
    { name: "Go", count: 5, color: "#00ADD8" },
    { name: "CSS", count: 4, color: "#563d7c" },
  ],
  recentActivity: [
    {
      id: 1,
      name: "distributed-task-queue",
      full_name: "harshverma-25/distributed-task-queue",
      html_url: "#",
      description: "High-throughput task queue system with priority queues.",
      stargazers_count: 45,
      forks_count: 12,
      language: "TypeScript",
      updated_at: new Date().toISOString(),
    },
  ],
};
