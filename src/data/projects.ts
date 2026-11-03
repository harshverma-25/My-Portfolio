export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image?: string;
  featured?: boolean;
  "main-project"?: boolean;
  mainProject?: boolean;
}

export const projects: Project[] = [
  // ============================
  // MAIN PROJECTS — FROM RESUME
  // ============================
  {
    title: "QUIZZY — Real-Time Multiplayer Quiz Platform",
    description:
      "A real-time multiplayer quiz platform supporting 1–4 players per room, server-authoritative timers, synchronized gameplay, dynamic speed-based scoring, live leaderboards, and solo practice. Features Redis-backed caching, JWT authentication, rate limiting, and AI-powered quiz generation.",
    tech: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Redis",
      "Google Gemini",
    ],
    github: "https://github.com/harshverma-25/QuizzyWorld",
    live: "https://quizzyworld.vercel.app/",
    image: "/projects/quizzy.png",
    featured: true,
    "main-project": true,
  },

  {
    title: "DevCircle — AI-Powered Developer Career Platform",
    description:
      "A full-stack technical recruitment platform featuring AI-powered mock interviews, ATS resume evaluation, and an interactive resume builder. Includes 20+ modular REST APIs, role-based access control, Zod validation, and browser-based multi-participant video interviews powered by LiveKit WebRTC.",
    tech: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "LiveKit",
      "OpenRouter",
      "Zod",
    ],
    github: "https://github.com/harshverma-25/dev-circle",
    live: "https://devcircle-dev.vercel.app",
    image: "/projects/devcircle.png",
    featured: true,
    "main-project": true,
  },

  {
    title: "Repo Analyzer — GitHub Repository Analyzer",
    description:
      "An AI-powered repository intelligence platform that analyzes GitHub codebases using TypeScript AST parsing. Automatically discovers API endpoints, middleware chains, database schemas, dependencies, and potential security vulnerabilities while generating interactive architecture diagrams and technical documentation using Google Gemini.",
    tech: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "AST Parser",
      "Google Gemini AI",
      "Tailwind CSS",
    ],
    github: "https://github.com/harshverma-25/repo-analyzer",
    live: "https://repo-analyzer-github.vercel.app",
    image: "/projects/repo.png",
    featured: true,
    "main-project": true,
  },

  // ============================
  // ADDITIONAL PROJECTS
  // ============================
  {
    title: "ITM Connect — Private Campus Social Platform",
    description:
      "A private campus-based social networking platform exclusively for ITM students. Implements roll-number-based authentication, image sharing, social feeds, likes, user profiles, and secure student access using JWT authentication and Cloudinary media storage.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Cloudinary",
      "JWT",
    ],
    github: "https://github.com/harshverma-25/ITM-Connect",
    live: "https://itmconnect.netlify.app",
    image: "/projects/itmconnect.png",
    featured: true,
    "main-project": false,
  },

  {
    title: "AnimeYT — Anime Discovery Platform",
    description:
      "A database-backed anime discovery platform combining AniList GraphQL metadata with verified, officially published anime episodes from authorized YouTube distributors. Features anime discovery, language filtering, episode management, an admin verification workflow, and official YouTube playback.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "MongoDB",
      "Mongoose",
      "AniList GraphQL API",
      "YouTube Data API",
      "Tailwind CSS",
    ],
    github: "https://github.com/harshverma-25/animeYt",
    live: "https://animeyt-world.vercel.app",
    image: "/projects/anime.png",
    featured: false,
    "main-project": false,
  },

  {
    title: "Habit Tracker — Personal Habit Management Platform",
    description:
      "A modern habit tracking application with Google OAuth authentication, dynamic monthly calendars, habit management, daily check-ins, streak calculations, and an analytics dashboard featuring completion rates and weekly activity trends.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
      "Google OAuth",
      "Tailwind CSS",
      "Framer Motion",
    ],
    github: "https://github.com/harshverma-25/habit-tracker",
    live: "https://the-habit-tracker-website.vercel.app",
    image: "/projects/habit.png",
    featured: false,
    "main-project": false,
  },
];