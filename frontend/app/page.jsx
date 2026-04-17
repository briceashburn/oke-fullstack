import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { fetchHelloWorld } from "@/lib/api";

const API_LINKS = [
  {
    label: "Hello World",
    href: "/api/",
    description: "GET /api/",
  },
  {
    label: "Health Check",
    href: "/api/health",
    description: "GET /api/health",
  },
  {
    label: "Readiness",
    href: "/api/readiness",
    description: "GET /api/readiness",
  },
  {
    label: "Swagger UI",
    href: "/api/docs",
    description: "Interactive API docs",
  },
  {
    label: "ReDoc",
    href: "/api/redoc",
    description: "API reference docs",
  },
];

export default async function HomePage() {
  let helloWorldData = null;
  let helloWorldError = null;
  try {
    helloWorldData = await fetchHelloWorld();
  } catch (e) {
    helloWorldError = "Could not reach backend.";
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="mx-auto max-w-5xl px-6">
        <section className="flex min-h-screen flex-col items-start justify-center pt-24">
          <p className="mb-4 text-sm font-medium tracking-widest text-indigo-400 uppercase">
            Full-Stack Software Engineer
          </p>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-7xl">
            Brice
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Ashburn
            </span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400">
            I build fast, scalable web applications — from pixel-perfect
            frontends to cloud-native backends on Kubernetes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              Get in Touch
            </Link>
          </div>
        </section>

        {/* Backend API */}
        <section className="py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Backend
          </p>
          <h2 className="mb-2 text-2xl font-bold text-white">API Endpoints</h2>
          <p className="mb-8 text-sm text-slate-400">
            FastAPI backend running on Kubernetes — click any endpoint to test it live.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {API_LINKS.map(({ label, href, description }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-indigo-500/50 hover:bg-slate-800"
              >
                <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {label}
                </span>
                <code className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  {description}
                </code>
              </a>
            ))}
          </div>

          {/* Live data from /hello-world */}
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Live Data
            </p>
            <h3 className="mb-4 text-lg font-semibold text-white">
              GET /api/hello-world
            </h3>
            {helloWorldError ? (
              <p className="text-sm text-red-400">{helloWorldError}</p>
            ) : (
              <>
                <p className="mb-3 text-sm text-slate-400">
                  {helloWorldData?.count ?? 0} row{helloWorldData?.count !== 1 ? "s" : ""} returned
                </p>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-300">
                  {JSON.stringify(helloWorldData?.data ?? [], null, 2)}
                </pre>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
