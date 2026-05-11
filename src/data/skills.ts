export const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML/CSS",
    "Redux",
    "Framer Motion",
  ],
  backend: [
    "Node.js",
    "Python",
    "Go",
    "Express",
    "FastAPI",
    "GraphQL",
    "REST APIs",
    "WebSocket",
  ],
  database: [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "MySQL",
    "Prisma",
    "Drizzle ORM",
    "Firebase",
  ],
  tools: [
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub Actions",
    "AWS",
    "Vercel",
    "Figma",
    "Jest",
    "Webpack",
  ],
};

export const skillCategories = [
  {
    key: "frontend",
    label: "Frontend",
    description: "Crafting beautiful, responsive interfaces",
    icon: "🎨",
  },
  {
    key: "backend",
    label: "Backend",
    description: "Building scalable, performant systems",
    icon: "⚙️",
  },
  {
    key: "database",
    label: "Database",
    description: "Managing data with efficiency",
    icon: "🗄️",
  },
  {
    key: "tools",
    label: "Tools",
    description: "Streamlining development workflow",
    icon: "🛠️",
  },
];

// Alternative simpler export (if you prefer not to use categories)
export const categories: { key: keyof typeof skills; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
];

export const bottomStats = [
  { value: "20+", label: "Technologies" },
  { value: "3+",  label: "Years learning" },
  { value: "∞",   label: "Still learning" },
];