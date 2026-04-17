import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionLabel from "../components/SectionLabel";

const PROJECTS = [
  {
    title: "OKE Full-Stack",
    description:
      "A production-ready full-stack application deployed on Oracle Kubernetes Engine with a Next.js frontend and Python backend.",
    tags: ["Next.js", "Python", "Kubernetes", "Oracle Cloud"],
    href: "https://github.com/briceashburn/oke-fullstack",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <SectionLabel>Projects</SectionLabel>
        <h1 className="mb-10 text-4xl font-extrabold text-white">
          Things I&apos;ve built
        </h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-indigo-500/50 hover:bg-slate-800"
            >
              <h2 className="mb-2 text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 group-hover:bg-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
