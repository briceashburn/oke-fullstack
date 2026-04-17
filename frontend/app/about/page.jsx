import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionLabel from "../components/SectionLabel";

const SKILLS = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "FastAPI", "REST APIs"] },
  { label: "Infrastructure", items: ["Docker", "Kubernetes", "Oracle Cloud"] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <SectionLabel>About</SectionLabel>
        <h1 className="mb-6 text-4xl font-extrabold text-white">A bit about me</h1>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-slate-400">
          I&apos;m a full-stack engineer passionate about building reliable
          software and deploying it at scale. I enjoy working across the entire
          stack — crafting smooth UIs, designing clean APIs, and wiring
          everything together on cloud infrastructure.
        </p>

        <SectionLabel>Skills</SectionLabel>
        <h2 className="mb-8 text-2xl font-bold text-white">What I work with</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                {group.label}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
