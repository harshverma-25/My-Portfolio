export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">

        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Harsh Verma
        </h1>

        {/* Role */}
        <p className="text-lg md:text-xl text-gray-400 mb-3">
          Full Stack Developer | DSA Learner
        </p>

        {/* Intro */}
        <p className="text-gray-500 mb-8">
          Focused on building scalable web applications and improving problem-solving skills daily.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">

          <a
            href="https://github.com/"
            target="_blank"
            className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition"
          >
            GitHub
          </a>

          <a
            href="#"
            className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
          >
            Resume
          </a>

          <a
            href="#contact"
            className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
          >
            Contact
          </a>

        </div>

      </div>
    </section>
  );
}