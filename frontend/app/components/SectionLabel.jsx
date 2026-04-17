export default function SectionLabel({ children }) {
  return (
    <p className="mb-3 font-mono text-xs text-green-700">
      # {String(children).toLowerCase()}
    </p>
  );
}
