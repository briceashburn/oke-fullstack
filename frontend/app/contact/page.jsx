import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionLabel from "../components/SectionLabel";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <SectionLabel>Contact</SectionLabel>
        <h1 className="mb-4 text-4xl font-extrabold text-white">
          Let&apos;s connect
        </h1>
        <p className="mb-10 max-w-md text-lg text-slate-400">
          Have a project in mind or just want to say hi? I&apos;m always open
          to new conversations.
        </p>
        <a
          href="mailto:briceashburn@hotmail.com"
          className="inline-block rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
        >
          Say Hello
        </a>
      </main>
      <Footer />
    </div>
  );
}
