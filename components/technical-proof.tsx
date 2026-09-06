"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectViewport } from "@/components/project-viewport";
import { VisualCollab } from "@/components/visual-collab";
import { VisualSm2 } from "@/components/visual-sm2";
import type { Project } from "@/types/project";

export interface ProjectWithCode extends Project {
  code: string;
}

interface TechnicalProofProps {
  projects: ProjectWithCode[];
  activeId: string | null;
}

/**
 * Sticky right-hand case viewport (desktop). Light product frame showing
 * each project's real interface — or an honest animated schematic when
 * the repository ships no screenshots. Cross-fades as the reader scrolls.
 */
export function TechnicalProof({ projects, activeId }: TechnicalProofProps) {
  const active = projects.find((p) => p.id === activeId) ?? null;
  const [swapping, setSwapping] = useState(false);
  const previousId = useRef<string | null>(activeId);

  useEffect(() => {
    if (previousId.current === activeId) return;
    previousId.current = activeId;
    setSwapping(true);
    const timer = window.setTimeout(() => setSwapping(false), 180);
    return () => window.clearTimeout(timer);
  }, [activeId]);

  return (
    <div className="flex h-full min-w-0 flex-col">
      {/* Pane header — raised chrome bar against the sunken column */}
      <div className="flex items-center justify-between border-b border-hairline bg-paper-raised/80 px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
          Case viewport
        </p>
        <p className="font-mono text-[10px] tracking-wide text-ink-faint">
          {active ? `${active.index} / 05` : "index"}
        </p>
      </div>

      <div
        data-swapping={swapping}
        className="proof-swap flex min-h-0 flex-1 flex-col overflow-y-auto p-5"
      >
        {active ? (
          <ProjectPanel key={active.id} project={active} />
        ) : (
          <Manifest projects={projects} />
        )}
      </div>
    </div>
  );
}

function ProjectPanel({ project }: { project: ProjectWithCode }) {
  return (
    <div className="my-auto flex flex-col gap-4 py-1">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-ledger text-copper">
          {project.index} — case study
        </p>
        <h3 className="mt-1 font-display text-lg font-medium tracking-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
          {project.tagline}
        </p>
      </div>

      {project.shots.length > 0 ? (
        <ProjectViewport
          shots={project.shots}
          projectName={project.name}
          displayUrl={(project.liveUrl ?? project.repositoryUrl).replace("https://", "")}
          href={project.liveUrl ?? project.repositoryUrl}
        />
      ) : project.visual === "sm2" ? (
        <VisualSm2 />
      ) : (
        <VisualCollab />
      )}

      <p className="font-mono text-[10.5px] leading-relaxed text-ink-faint">
        {project.shots.length > 0
          ? "Real interface, from the repository's own README."
          : "No fabricated UI — a schematic of the system's actual mechanism."}
      </p>

      <div>
        <p className="font-mono text-[9.5px] uppercase tracking-ledger text-ink-faint">
          stack
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-hairline bg-paper-raised px-2 py-0.5 font-mono text-[10px] tracking-wide text-ink-soft"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`${project.repositoryUrl}/blob/HEAD/${project.technicalProof.filePath}`}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between gap-3 rounded-sm border border-hairline bg-paper-raised px-3.5 py-3 transition-colors hover:border-copper/50"
      >
        <span className="min-w-0">
          <span className="block font-mono text-[9.5px] uppercase tracking-ledger text-ink-faint">
            source artifact
          </span>
          <span className="block truncate font-mono text-[11.5px] text-ink-soft transition-colors group-hover:text-copper">
            {project.technicalProof.filePath}
          </span>
        </span>
        <span aria-hidden="true" className="text-copper transition-transform duration-200 ease-ledger group-hover:translate-x-0.5">
          →
        </span>
      </a>
    </div>
  );
}

/** Default pane content: the ledger's table of contents. */
function Manifest({ projects }: { projects: ProjectWithCode[] }) {
  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-[10px] uppercase tracking-ledger text-copper">
        ledger.index
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
        Five systems selected from 43 public repositories for engineering
        depth. Each entry opens a case study — this pane follows your
        scroll.
      </p>
      <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={`#project-${project.id}`}
              className="group flex items-baseline gap-4 py-3"
            >
              <span className="font-mono text-[11px] text-ink-faint">
                {project.index}
              </span>
              <span className="font-mono text-[13px] text-ink transition-colors group-hover:text-copper">
                {project.name}
              </span>
              <span className="ml-auto text-right font-mono text-[10px] text-ink-faint">
                {project.shots.length > 0 ? `${project.shots.length} shots` : "schematic"}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 font-mono text-[10px] leading-relaxed text-ink-faint">
        Screenshots are each project's real interface; schematics are
        labeled and never fabricated UI.
      </p>
    </div>
  );
}
