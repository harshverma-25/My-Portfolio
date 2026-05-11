import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import GitHubShowcase from "../sections/GitHubShowcase";
import Education from "../sections/Education";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main id="home">
      <Hero />
      <Projects projects={projects} />
      <Skills />
      <GitHubShowcase />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}