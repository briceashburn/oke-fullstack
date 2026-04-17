import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function HomePage() {
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
      </main>
      <Footer />
    </div>
  );
}
