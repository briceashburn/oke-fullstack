export default function Footer() {
  return (
    <footer className="border-t border-green-900/40 py-6 font-mono">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-xs text-green-800">
        <span>© {new Date().getFullYear()} brice ashburn</span>
        <span className="flex items-center gap-2">
          <span className="text-green-700">status:</span> online
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </span>
      </div>
    </footer>
  );
}
