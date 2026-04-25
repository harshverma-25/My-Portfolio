export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="section-container flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Harsh Verma
        </p>
        <p className="text-xs text-zinc-700">
          Built with Next.js · Framer Motion · Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
