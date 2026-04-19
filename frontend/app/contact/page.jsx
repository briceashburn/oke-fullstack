import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TerminalWindow from "../components/TerminalWindow";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Brice Ashburn via email or GitHub.",
  alternates: { canonical: "https://briceashburn.com/contact" },
  openGraph: {
    title: "Contact | Brice Ashburn",
    description: "Get in touch with Brice Ashburn via email or GitHub.",
    url: "https://briceashburn.com/contact",
  },
};

const LINKS = [
  {
    label: "email",
    value: "briceashburn@hotmail.com",
    href: "mailto:briceashburn@hotmail.com",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/brice-ashburn",
    href: "https://linkedin.com/in/brice-ashburn",
  },
  {
    label: "github",
    value: "github.com/briceashburn",
    href: "https://github.com/briceashburn",
  },
  {
    label: "phone",
    value: "(832) 696-1902",
    href: "tel:+18326961902",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <p className="mb-2 text-xs text-green-700"># contact</p>
        <h1 className="mb-8 text-2xl font-bold text-green-300">./connect.sh</h1>

        <TerminalWindow title="bash — connect.sh" className="max-w-lg">
          <div className="space-y-4 text-sm">
            <div className="text-green-700">
              <span className="text-green-600">$ </span>
              <span className="text-green-300">cat contact.json</span>
            </div>
            <div className="space-y-3 pl-2">
              {LINKS.map(({ label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-green-700 w-12 shrink-0">{label}</span>
                  <span className="text-green-800">→</span>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-300 transition-colors underline underline-offset-2"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
            <div className="pt-2 text-green-700">
              <span className="text-green-600">$ </span>
              <span className="animate-pulse text-green-500">█</span>
            </div>
          </div>
        </TerminalWindow>
      </main>
      <Footer />
    </div>
  );
}
