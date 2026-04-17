import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TerminalWindow from "./components/TerminalWindow";

export const metadata = {
  title: "404 — Not Found",
  description: "Page not found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <TerminalWindow title="bash — ~/404">
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-green-600">root@briceashburn.com</span>
              <span className="text-green-800">:~$ </span>
              <span className="text-green-300">cd /this/page</span>
            </div>
            <div className="text-red-500">
              bash: cd: /this/page: No such file or directory
            </div>
            <div className="pt-2">
              <span className="text-green-600">root@briceashburn.com</span>
              <span className="text-green-800">:~$ </span>
              <span className="text-green-300">echo $?</span>
            </div>
            <div className="text-green-500">404</div>
            <div className="pt-4 border-t border-green-900/40 space-y-1 text-xs text-green-700">
              <p>available routes:</p>
              <div className="pl-4 space-y-1">
                <p>
                  <Link href="/" className="text-green-500 hover:text-green-300 transition-colors">
                    ~/
                  </Link>
                  <span className="ml-2 text-green-900">— home</span>
                </p>
                <p>
                  <Link href="/about" className="text-green-500 hover:text-green-300 transition-colors">
                    ~/about
                  </Link>
                  <span className="ml-2 text-green-900">— about me</span>
                </p>
                <p>
                  <Link href="/projects" className="text-green-500 hover:text-green-300 transition-colors">
                    ~/projects
                  </Link>
                  <span className="ml-2 text-green-900">— projects</span>
                </p>
                <p>
                  <Link href="/contact" className="text-green-500 hover:text-green-300 transition-colors">
                    ~/contact
                  </Link>
                  <span className="ml-2 text-green-900">— contact</span>
                </p>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-green-600">root@briceashburn.com</span>
              <span className="text-green-800">:~$ </span>
              <span className="inline-block w-2 h-4 bg-green-400 align-middle animate-pulse" />
            </div>
          </div>
        </TerminalWindow>
      </main>
      <Footer />
    </div>
  );
}
