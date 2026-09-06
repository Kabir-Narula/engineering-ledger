"use client";

import { useEffect, useState } from "react";

interface ProjectViewportProps {
  shots: string[];
  projectName: string;
  displayUrl: string;
  href: string;
}

/**
 * A paper-toned browser frame showing the project's real screenshots
 * (from its own repository README). Crossfades between shots with a slow
 * Ken Burns drift so the frame feels alive; reduced-motion users get a
 * static first frame.
 */
export function ProjectViewport({
  shots,
  projectName,
  displayUrl,
  href,
}: ProjectViewportProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (shots.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % shots.length),
      4600
    );
    return () => window.clearInterval(timer);
  }, [shots.length]);

  return (
    <figure className="overflow-hidden rounded-md border border-hairline bg-paper-raised shadow-[0_1px_0_0_oklch(1_0_0/0.5)_inset,0_20px_40px_-24px_oklch(0.3_0.02_60/0.25)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-hairline bg-paper-sunken px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-hairline-strong" />
          <span className="h-2 w-2 rounded-full bg-hairline-strong" />
          <span className="h-2 w-2 rounded-full bg-copper/70" />
        </span>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 truncate rounded-sm bg-paper px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-ink-faint transition-colors hover:text-copper"
        >
          {displayUrl}
        </a>
        <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
          {projectName}
        </span>
      </div>

      {/* Shots */}
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-sunken">
        {shots.map((shot, i) => (
          // Real screenshot from the project's repository — decorative
          // framing, so alt text lives on the figure caption instead.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={shot}
            src={shot}
            alt={`${projectName} interface, screenshot ${i + 1} of ${shots.length}`}
            loading={i === 0 ? "eager" : "lazy"}
            data-active={i === active}
            className="viewport-shot absolute inset-0 h-full w-full object-cover object-top"
          />
        ))}

        {shots.length > 1 ? (
          <div className="absolute bottom-2.5 right-2.5 flex gap-1.5 rounded-full bg-paper/85 px-2 py-1 backdrop-blur-sm">
            {shots.map((shot, i) => (
              <button
                key={shot}
                type="button"
                aria-label={`Show screenshot ${i + 1}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ease-ledger ${
                  i === active ? "w-4 bg-copper" : "w-1.5 bg-hairline-strong hover:bg-ink-faint"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </figure>
  );
}
