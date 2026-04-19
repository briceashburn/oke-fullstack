import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TerminalWindow from "../components/TerminalWindow";

export const metadata = {
  title: "About",
  description: "Learn about Brice Ashburn — software engineer at General Motors specializing in Python, Java Spring Boot, Azure, and cloud-native architecture.",
  alternates: { canonical: "https://briceashburn.com/about" },
  openGraph: {
    title: "About | Brice Ashburn",
    description: "Learn about Brice Ashburn — software engineer at General Motors specializing in Python, Java Spring Boot, Azure, and cloud-native architecture.",
    url: "https://briceashburn.com/about",
  },
};

const SKILLS = [
  { label: "languages", items: ["python", "java spring boot", "react", "sql", "c++", "shell"] },
  { label: "cloud & devops", items: ["microsoft azure", "terraform", "arm templates", "azure devops", "github actions"] },
  { label: "tools", items: ["rest apis", "readyapi", "ci/cd", "git", "azure monitor", "app insights"] },
  { label: "practices", items: ["event-driven arch", "high availability", "failover design", "secure coding"] },
];

const EXPERIENCE = [
  {
    title: "software engineer",
    company: "general motors",
    period: "06/2022 – present",
    location: "austin, tx",
    highlights: [
      "built and maintained bff layer (python & java spring boot) for gm's home energy management system, serving millions of users across all brands",
      "designed scalable, event-driven apis hosted in azure providing real-time energy data to mobile and web apps",
      "improved api performance by 30%+ via code optimization and caching strategies",
      "automated infra deployment using terraform and arm templates for consistent azure provisioning",
      "led ci/cd pipeline setup with azure devops and github actions, cutting deployment time",
      "architected multi-region failover and high-availability configs for zero downtime",
      "drove 40%+ cost savings in azure through usage analysis and resource optimization",
      "maintained 5-star internal security rating via vulnerability remediation and static/dynamic scanning",
    ],
  },
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
              <span className="text-green-500">software engineer @ general motors</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-700 w-20 shrink-0">location</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">austin, tx</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-700 w-20 shrink-0">cert</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">microsoft certified: azure fundamentals (az-900)</span>
            </div>
            <div className="flex gap-4 pt-2">
              <span className="text-green-700 w-20 shrink-0">bio</span>
              <span className="text-green-800">→</span>
              <span className="text-green-600 max-w-sm">
                software engineer with experience building scalable, event-driven systems in azure.
                focused on backend apis, cloud infrastructure, and developer productivity — from
                secure ci/cd pipelines to high-availability architectures serving millions of users.
              </span>
            </div>
          </div>
        </TerminalWindow>

        <p className="mb-2 text-xs text-green-700"># experience</p>
        <h2 className="mb-6 text-lg font-bold text-green-300">cat experience.txt</h2>
        <div className="mb-12 space-y-6">
          {EXPERIENCE.map((job) => (
            <TerminalWindow key={job.company} title={`${job.company} — ${job.title}`}>
              <div className="text-xs text-green-800 mb-3">
                <span className="text-green-700">{job.period}</span>
                <span className="mx-2">|</span>
                <span>{job.location}</span>
              </div>
              <ul className="space-y-1.5">
                {job.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-green-600 flex gap-2">
                    <span className="text-green-800 shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          ))}
        </div>

        <p className="mb-2 text-xs text-green-700"># skills</p>
        <h2 className="mb-6 text-lg font-bold text-green-300">cat skills.txt</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
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

        <p className="mb-2 text-xs text-green-700"># education</p>
        <h2 className="mb-6 text-lg font-bold text-green-300">cat education.txt</h2>
        <TerminalWindow title="texas state university" className="max-w-lg">
          <div className="space-y-2 text-sm">
            <div className="flex gap-4">
              <span className="text-green-700 w-24 shrink-0">degree</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">b.s. computer science</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-700 w-24 shrink-0">minor</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">business administration</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-700 w-24 shrink-0">graduated</span>
              <span className="text-green-800">→</span>
              <span className="text-green-500">december 2021</span>
            </div>
          </div>
        </TerminalWindow>
      </main>
      <Footer />
    </div>
  );
}
