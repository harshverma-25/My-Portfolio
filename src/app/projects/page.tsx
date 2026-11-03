import type { Metadata } from "next";
import AllProjectsClient from "./AllProjectsClient";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "All Projects | Harsh Verma (harshverma25)",
  description:
    "Explore all projects by Harsh Verma (harshverma25) — including main full-stack applications, distributed background job processors, campus platforms, and developer tooling.",
  alternates: {
    canonical: "https://harshverma25.vercel.app/projects",
  },
  openGraph: {
    title: "All Projects | Harsh Verma (harshverma25)",
    description:
      "Explore all projects by Harsh Verma (harshverma25) — including main full-stack applications, distributed systems, and developer tools.",
    url: "https://harshverma25.vercel.app/projects",
  },
};

export default function AllProjectsPage() {
  return <AllProjectsClient projects={projects} />;
}

