"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-green-900/40 bg-black/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 font-mono">
        <Link href="/" className="font-bold tracking-tight text-green-400 hover:text-green-300 transition-colors">
          <span className="text-green-700">&gt; </span>BA<span className="animate-pulse text-green-700">_</span>
        </Link>
        <ul className="flex gap-6 text-sm">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors hover:text-green-400 ${
                  pathname === href ? "text-green-400" : "text-green-700"
                }`}
              >
                <span className="text-green-900">./</span>{label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
