import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section className="bg-black text-white py-20 px-6">
      
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Frontend */}
          <SkillBlock title="Frontend" items={skills.frontend} />

          {/* Backend */}
          <SkillBlock title="Backend" items={skills.backend} />

          {/* Database */}
          <SkillBlock title="Database" items={skills.database} />

          {/* Tools */}
          <SkillBlock title="Tools" items={skills.tools} />

        </div>

      </div>
    </section>
  );
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-gray-800 rounded-xl p-6">
      
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="border border-gray-700 px-3 py-1 rounded text-sm"
          >
            {item}
          </span>
        ))}
      </div>

    </div>
  );
}