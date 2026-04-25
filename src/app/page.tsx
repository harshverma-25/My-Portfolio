import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import DSA from "./sections/DSA-leetcode";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <DSA />
      <Education />
      <Contact />
    </main>
  );
}