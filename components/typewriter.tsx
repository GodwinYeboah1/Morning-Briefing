"use client";

import { useEffect, useState } from "react";

const MS_PER_CHAR = 18;

export function Typewriter({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    // Respect the OS "reduce motion" setting: reveal everything on the first tick.
    const step = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? text.length
      : 1;
    let i = 0;
    const id = setInterval(() => {
      i = Math.min(i + step, text.length);
      setShown(i);
      if (i === text.length) clearInterval(id);
    }, MS_PER_CHAR);
    return () => clearInterval(id);
  }, [text]);

  return (
    <div className={`relative ${className}`}>
      {/* The full text, invisible, reserves the final height so the card
          doesn't grow line by line while typing. */}
      <p aria-hidden className="invisible">
        {text}
        <Cursor />
      </p>
      <p aria-hidden className="absolute inset-0">
        {text.slice(0, shown)}
        <Cursor blinking={shown === text.length} />
      </p>
      <p className="sr-only">{text}</p>
    </div>
  );
}

function Cursor({ blinking = false }: { blinking?: boolean }) {
  return (
    <span
      className={`ml-1 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)] ${blinking ? "animate-pulse" : ""}`}
    />
  );
}
