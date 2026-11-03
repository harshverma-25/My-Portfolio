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
  {
    title: "DevCircle — AI Powered Developer Career Platform",
    description:
      "DevCircle is a full-stack AI-powered developer platform that helps users prepare for technical careers through mock interviews, AI resume building, ATS score analysis, and personalized career tools using OpenRouter APIs.",
    tech: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS", "OpenRouter API", "Socket.io"],
    github: "https://github.com/harshverma-25/dev-circle",
    live: "https://devcircle-dev.vercel.app",
    image: "/projects/Project1.png",
    featured: true,
    "main-project": true,
  },
  {
    title: "DSA Tracker — Coding Sheet Progress Platform",
    description:
      "A full-stack DSA progress tracking platform that helps users solve and manage popular coding sheets like Striver SDE Sheet, Blind 75, LeetCode 75, and SQL 50. Features include problem tracking, progress analytics, completion status, and personalized coding workflows using React, Express, and MongoDB.",
    tech: ["React.js", "Express.js", "MongoDB", "Node.js", "Tailwind CSS"],
    github: "https://github.com/harshverma-25/DSA-Tracker",
    live: "https://dsa-tracker-hv.netlify.app/",
    image: "/projects/Project2.png",
    featured: false,
    "main-project": true,
  },
  {
    title: "ITM Connect — Private Campus Social Platform",
    description:
      "ITM Connect is a private campus-based social media platform exclusively for ITM students, where users can register using verified college roll numbers, share image posts, interact through likes, and connect within the college community in a secure environment.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT Authentication"],
    github: "https://github.com/harshverma-25/ITM-Connect",
    live: "https://itmconnect.netlify.app",
    image: "/projects/Project3.png",
    featured: true,
    "main-project": true,
  },
  {
    title: "Repo Analyzer — Codebase Insights & Architecture Audit",
    description:
      "An automated repository intelligence platform that scans GitHub repositories to evaluate code quality, calculate tech debt, audit documentation completeness, and generate architectural summaries using AI models.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub REST API", "OpenAI API"],
    github: "https://github.com/harshverma-25/Repo-Analyzer",
    live: "https://github.com/harshverma-25/Repo-Analyzer",
    image: "/projects/Project4.png",
    featured: false,
    "main-project": false,
  },
  {
    title: "Distributed Task Queue — High-Throughput Job Processing",
    description:
      "A distributed, fault-tolerant background job execution engine featuring priority queues, exponential backoff retries, dead letter queues, and real-time worker metrics dashboard.",
    tech: ["TypeScript", "Node.js", "Redis", "BullMQ", "Docker", "Express.js"],
    github: "https://github.com/harshverma-25/distributed-task-queue",
    live: "https://github.com/harshverma-25/distributed-task-queue",
    image: "/projects/Project5.png",
    featured: false,
    "main-project": false,
  },
  {
    title: "AlgoVisualizer — Interactive Algorithm Visualizer",
    description:
      "Interactive data structures and algorithms visualization platform demonstrating sorting algorithms, graph pathfinding (Dijkstra, A*), and tree traversals with step-by-step playback.",
    tech: ["React.js", "TypeScript", "HTML5 Canvas", "Tailwind CSS"],
    github: "https://github.com/harshverma-25/AlgoVisualizer",
    live: "https://github.com/harshverma-25/AlgoVisualizer",
    image: "/projects/Project6.png",
    featured: false,
    "main-project": false,
  },
];