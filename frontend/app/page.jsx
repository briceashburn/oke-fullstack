import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TerminalWindow from "./components/TerminalWindow";
import TypewriterText from "./components/TypewriterText";

const TERMINAL_LINES = [
  { type: "command", text: "whoami" },
  { type: "output", text: "brice ashburn — full-stack software engineer" },
  { type: "blank" },
  { type: "command", text: "cat skills.txt" },
  { type: "output", text: "languages  →  javascript, python, sql" },
  { type: "output", text: "cloud      →  kubernetes, oracle cloud, docker" },
  { type: "output", text: "frontend   →  react, next.js, tailwind css" },
  { type: "output", text: "backend    →  fastapi, node.js, rest apis" },
  { type: "blank" },
  { type: "command", text: "uptime" },
  { type: "output", text: "available for new projects" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Nav />
      <main className="mx-auto max-w-5xl px-6">

        {/* Hero */}
        <section className="flex min-h-screen flex-col justify-center pt-24 pb-16">
          <p className="mb-6 text-xs text-green-700">
            <span className="text-green-600">root@briceashburn.com</span>:~$
          </p>
          <TerminalWindow title="bash — brice@oke-cluster" className="w-full max-w-2xl">
            <TypewriterText lines={TERMINAL_LINES} speed={45} />
          </TerminalWindow>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded border border-green-700 px-6 py-2 text-sm text-green-400 transition-colors hover:bg-green-950 hover:border-green-500"
            >
              ./projects
            </Link>
            <Link
              href="/contact"
              className="rounded border border-green-900 px-6 py-2 text-sm text-green-700 transition-colors hover:text-green-400 hover:border-green-700"
            >
              ./contact
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
