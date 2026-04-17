export default function TerminalWindow({ title = "bash — brice@oke", children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-green-900/50 bg-black ${className}`}>
      <div className="flex items-center gap-2 border-b border-green-900/50 bg-zinc-950 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-auto text-xs text-green-800 font-mono">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
