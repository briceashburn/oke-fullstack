"use client";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TerminalWindow from "../components/TerminalWindow";

const PROJECTS = [
  {
    title: "oke-fullstack",
    description:
      "production-ready full-stack app on oracle kubernetes engine. next.js frontend, python fastapi backend, ci/cd via github actions.",
    tags: ["next.js", "python", "kubernetes", "oracle cloud"],
    href: "https://github.com/briceashburn/oke-fullstack",
    size: "4.2K",
    date: "apr 17 2026",
    stack: [
      { label: "frontend", value: "next.js 15 + tailwind css" },
      { label: "backend", value: "python fastapi + uvicorn" },
      { label: "database", value: "oracle nosql cloud" },
      { label: "runtime", value: "kubernetes (oke)" },
      { label: "ci/cd", value: "github actions" },
    ],
  },
];

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    setApiData(null);
    setApiError(null);

    // Always call the same-origin proxy route — avoids CORS in all environments.
    // In production the ingress routes /api/* to the backend before it reaches Next.js.
    // In local dev the Next.js route handler at app/api/hello-world/route.js proxies server-side.
    fetch("/api/hello-world")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => setApiData(d))
      .catch((e) => setApiError(`error: ${e}`))
      .finally(() => setLoading(false));
  }, [selected]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <p className="mb-2 text-xs text-green-700"># projects</p>
        <h1 className="mb-8 text-2xl font-bold text-green-300">ls -la ~/projects/</h1>

        <div className={`flex gap-6 ${selected ? "items-start" : ""}`}>
          {/* Project list */}
          <div className={selected ? "w-full lg:w-1/2 shrink-0" : "w-full"}>
            <TerminalWindow title="bash — ~/projects">
              <div className="text-xs text-green-800 mb-4">total {PROJECTS.length}</div>
              <div className="space-y-3">
                {PROJECTS.map((project) => (
                  <button
                    key={project.title}
                    onClick={() =>
                      setSelected((s) =>
                        s?.title === project.title ? null : project
                      )
                    }
                    className={`group w-full text-left flex items-start gap-4 rounded p-2 -mx-2 transition-colors ${
                      selected?.title === project.title
                        ? "bg-green-950/50 border-l-2 border-green-600 pl-3"
                        : "hover:bg-green-950/30"
                    }`}
                  >
                    <span className="text-green-900 text-xs shrink-0 mt-0.5 hidden sm:block">drwxr-xr-x</span>
                    <span className="text-green-800 text-xs shrink-0 mt-0.5 w-10 text-right">{project.size}</span>
                    <span className="text-green-800 text-xs shrink-0 mt-0.5">{project.date}</span>
                    <div className="min-w-0">
                      <span className="text-green-300 group-hover:text-green-200 transition-colors font-bold">
                        {project.title}/
                      </span>
                      <p className="mt-1 text-xs text-green-700 leading-relaxed">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-green-800 border border-green-900 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </TerminalWindow>
          </div>

          {/* Side card */}
          {selected && (
            <div className="w-full lg:w-1/2 space-y-4">
              {/* Project info */}
              <TerminalWindow title={`${selected.title}/README`}>
                <div className="space-y-2 text-xs">
                  {selected.stack.map(({ label, value }) => (
                    <div key={label} className="flex gap-3">
                      <span className="text-green-700 w-16 shrink-0">{label}</span>
                      <span className="text-green-800">→</span>
                      <span className="text-green-500">{value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-green-900/40">
                    <a
                      href={selected.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-400 transition-colors underline underline-offset-2"
                    >
                      {selected.href.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </TerminalWindow>

              {/* Live API data */}
              <TerminalWindow title="curl — GET /api/hello-world">
                {loading ? (
                  <div className="text-xs text-green-700 animate-pulse">fetching data...</div>
                ) : apiError ? (
                  <div className="text-xs text-red-500">error: {apiError}</div>
                ) : (
                  <div className="text-xs space-y-2">
                    <div className="text-green-800">
                      HTTP/1.1 200 OK · {apiData?.count ?? 0} row{apiData?.count !== 1 ? "s" : ""}
                    </div>
                    <pre className="overflow-x-auto text-green-600 leading-relaxed">
                      {JSON.stringify(apiData?.data ?? [], null, 2)}
                    </pre>
                  </div>
                )}
              </TerminalWindow>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
