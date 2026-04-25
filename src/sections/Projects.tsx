"use client";

import { motion, Variants } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 border-t border-white/[0.06]">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="section-heading mb-2">Projects</h2>
          <p className="section-subtext">
            A selection of things I&apos;ve built recently.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.07 } as object}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}