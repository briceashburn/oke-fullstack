import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TerminalWindow from "../components/TerminalWindow";

export const metadata = {
  title: "About",
  description: "Learn about Brice Ashburn — full-stack software engineer specializing in Next.js, Python, Kubernetes, and Oracle Cloud.",
  alternates: { canonical: "https://briceashburn.com/about" },
  openGraph: {
    title: "About | Brice Ashburn",
    description: "Learn about Brice Ashburn — full-stack software engineer specializing in Next.js, Python, Kubernetes, and Oracle Cloud.",
    url: "https://briceashburn.com/about",
  },
};

const SKILLS = [
  { label: "languages", items: ["javascript", "typescript", "python", "sql"] },
  { label: "frontend", items: ["react", "next.js", "tailwind css"] },
  { label: "backend", items: ["node.js", "fastapi", "rest apis"] },
  { label: "infra", items: ["docker", "kubernetes", "oracle cloud"] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <p className="mb-2 text-xs text-green-700"># about</p>
        <h1 className="mb-8 text-2xl font-bold text-green-300">cat about.txt</h1>

        <TerminalWindow title="about.txt" className="mb-12 max-w-2xl">
          <div className="space-y-3 text-sm leading-relaxed">
            <div className="flex gap-4">
              <span className="text-green-700 w-20 shrink-0">name</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">brice ashburn</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-700 w-20 shrink-0">role</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">full-stack software engineer</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-700 w-20 shrink-0">location</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">united states</span>
            </div>
            <div className="flex gap-4 pt-2">
              <span className="text-green-700 w-20 shrink-0">bio</span>
              <span className="text-green-800">→</span>
              <span className="text-green-600 max-w-sm">
                passionate about building reliable software and deploying it at
                scale. i enjoy working across the entire stack — from smooth UIs
                to cloud-native backends on kubernetes.
              </span>
            </div>
          </div>
        </TerminalWindow>

        <p className="mb-2 text-xs text-green-700"># skills</p>
        <h2 className="mb-6 text-lg font-bold text-green-300">cat skills.txt</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group) => (
            <TerminalWindow key={group.label} title={group.label}>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-green-600">
                    <span className="text-green-800">- </span>
                    {item}
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
