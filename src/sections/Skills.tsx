"use client";

import { motion } from "framer-motion";
import { skills } from "../data/skills";
import { Layout, Server, Database, Wrench } from "lucide-react";

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Technical <span className="text-gradient">Proficiency</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            A comprehensive overview of the technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillBlock 
            title="Frontend" 
            items={skills.frontend} 
            icon={<Layout className="text-purple-500" size={24} />}
            delay={0}
          />
          <SkillBlock 
            title="Backend" 
            items={skills.backend} 
            icon={<Server className="text-blue-500" size={24} />}
            delay={0.1}
          />
          <SkillBlock 
            title="Database" 
            items={skills.database} 
            icon={<Database className="text-emerald-500" size={24} />}
            delay={0.2}
          />
          <SkillBlock 
            title="Tools" 
            items={skills.tools} 
            icon={<Wrench className="text-orange-500" size={24} />}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

function SkillBlock({ 
  title, 
  items, 
  icon, 
  delay 
}: { 
  title: string; 
  items: string[]; 
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass p-8 rounded-3xl flex flex-col h-full"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}