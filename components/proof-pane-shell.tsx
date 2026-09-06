"use client";

import { useEffect, useRef, useState } from "react";

import {
  TechnicalProof,
  type ProjectWithCode,
} from "@/components/technical-proof";

interface ProofPaneShellProps {
  projects: ProjectWithCode[];
  children: React.ReactNode;
}

/**
 * Full-page 60/40 ledger layout (desktop). Every narrative section —
 * hero, case studies, record, contact — lives in the left column; the
 * sticky proof pane occupies the right for the entire scroll, so no
 * viewport real estate is ever dead.
 *
 * Sentinels are located by DOM query after mount (children are
 * server-rendered), and an IntersectionObserver — not scroll arithmetic —
 * decides which project is active. Below `lg` the pane is unmounted and
 * each case study carries its own inline artifact.
 */
export function ProofPaneShell({ projects, children }: ProofPaneShellProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sentinels = Array.from(
      container.querySelectorAll<HTMLElement>("[data-project-id]")
    );
    if (sentinels.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset["projectId"];
          if (!id) continue;
          visibility.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        // Leaving the case studies entirely clears back to the manifest.
        setActiveId(best);
      },
      {
        // A horizontal band through the middle of the viewport — a project
        // is "active" while its body crosses the reading zone.
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0, 0.05, 0.15, 0.3],
      }
    );

    for (const element of sentinels) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="lg:grid lg:grid-cols-[3fr_2fr]">
      {/* Narrative column */}
      <div className="min-w-0">{children}</div>

      {/* Sticky proof pane — full page height, always occupied.
          Sunken paper tint + strong border so the pane reads as its own
          surface, not a continuation of the narrative column.
          min-w-0 down the chain: long code lines would otherwise set a
          huge min-content floor and blow out the 2fr track. */}
      <aside className="relative hidden min-w-0 border-l border-hairline-strong bg-paper-sunken lg:block">
        <div className="sticky top-0 h-screen min-w-0">
          <TechnicalProof projects={projects} activeId={activeId} />
        </div>
      </aside>
    </div>
  );
}
