"use client";

import { useEffect, useState } from "react";

/**
 * Rotating engineering note — the pane cycles the project's real
 * engineering highlights so it carries proof, not just pictures.
 * Two-phase fade (out, swap, in); reduced-motion users get a static
 * first note. Min-height reserves three lines so the pane never jumps.
 */
export function PaneNotes({ notes }: { notes: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (notes.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swap = 0;
    const cycle = window.setInterval(() => {
      setVisible(false);
      swap = window.setTimeout(() => {
        setIndex((v) => (v + 1) % notes.length);
        setVisible(true);
      }, 200);
    }, 5200);

    return () => {
      window.clearInterval(cycle);
      window.clearTimeout(swap);
    };
  }, [notes.length]);

  return (
    <div className="rounded-sm border border-hairline bg-paper px-3.5 py-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9.5px] uppercase tracking-ledger text-copper">
          engineering note
        </p>
        <p className="font-mono text-[9.5px] tracking-wide text-ink-faint">
          {index + 1} / {notes.length}
        </p>
      </div>
      <p
        className="mt-1.5 min-h-[4.2em] text-[12px] leading-[1.55] text-ink-soft transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {notes[index]}
      </p>
      <div className="mt-1 flex gap-1">
        {notes.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
              i === index ? "bg-copper" : "bg-hairline"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
