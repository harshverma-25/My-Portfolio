type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
}: Project) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition">
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-gray-400 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, index) => (
          <span
            key={index}
            className="text-sm border border-gray-700 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <a href={github} target="_blank" className="text-white underline">
          GitHub
        </a>
        <a href={live} target="_blank" className="text-gray-400 underline">
          Live
        </a>
      </div>

    </div>
  );
}