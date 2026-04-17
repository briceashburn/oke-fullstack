"use client";
import { useState, useEffect } from "react";

export default function TypewriterText({ lines, speed = 45 }) {
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const line = lines[currentLineIndex];

    if (line.type === "output" || line.type === "blank") {
      const t = setTimeout(() => {
        setCompletedLines((prev) => [...prev, line]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentChar(0);
      }, 150);
      return () => clearTimeout(t);
    }

    if (currentChar < line.text.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setCompletedLines((prev) => [...prev, line]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentChar(0);
    }, 400);
    return () => clearTimeout(t);
  }, [currentLineIndex, currentChar, lines, speed]);

  const isTyping =
    currentLineIndex < lines.length &&
    lines[currentLineIndex].type === "command";

  return (
    <div className="space-y-1 font-mono text-sm">
      {completedLines.map((line, i) => (
        <div key={i}>
          {line.type === "command" ? (
            <span>
              <span className="text-green-700">$ </span>
              <span className="text-green-300">{line.text}</span>
            </span>
          ) : line.type === "blank" ? (
            <div className="h-2" />
          ) : (
            <span className="text-green-600">{line.text}</span>
          )}
        </div>
      ))}
      {isTyping && (
        <div>
          <span className="text-green-700">$ </span>
          <span className="text-green-300">
            {lines[currentLineIndex].text.slice(0, currentChar)}
          </span>
          <span className="animate-pulse text-green-400">█</span>
        </div>
      )}
      {currentLineIndex >= lines.length && (
        <div>
          <span className="text-green-700">$ </span>
          <span className="animate-pulse text-green-400">█</span>
        </div>
      )}
    </div>
  );
}
