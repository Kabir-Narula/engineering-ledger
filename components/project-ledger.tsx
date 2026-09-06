import { ProjectCaseStudy } from "@/components/project-case-study";
import type { ProjectWithCode } from "@/components/technical-proof";

interface ProjectLedgerProps {
  projects: ProjectWithCode[];
}

/**
 * The case-study column. Server component — scroll tracking lives in
 * ProofPaneShell, which observes the [data-project-id] sentinels
 * rendered here.
 */
export function ProjectLedger({ projects }: ProjectLedgerProps) {
  return (
    <section
      id="ledger"
      aria-label="Selected engineering case studies"
      className="border-b border-hairline px-5 py-14 sm:px-10 lg:px-14 xl:px-20"
    >
      <header className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-ledger text-copper">
          § 2 — Selected work
        </p>
        <h2 className="mt-3 max-w-measure font-display text-3xl font-medium tracking-tight text-ink">
          Five systems, argued from their source code.
        </h2>
        <p className="mt-3 max-w-measure text-[14.5px] leading-relaxed text-ink-soft">
          Chosen from 43 public repositories for architectural depth. The
          pane on the right follows your scroll with the real interface,
          rotating engineering notes, and the source file on GitHub.
        </p>
        {/* Jump straight to a system — the ledger's table of contents */}
        <nav aria-label="Case studies" className="mt-5">
          <ul className="flex flex-wrap gap-x-1 gap-y-1.5 font-mono text-[11px] tracking-wide">
            {projects.map((project, i) => (
              <li key={project.id} className="flex items-center">
                {i > 0 ? (
                  <span aria-hidden="true" className="mx-2 text-ink-faint">
                    ·
                  </span>
                ) : null}
                <a
                  href={`#project-${project.id}`}
                  className="text-ink-faint underline-offset-4 transition-colors hover:text-copper hover:underline"
                >
                  <span className="text-copper">{project.index}</span>{" "}
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {projects.map((project) => (
        <div key={project.id} data-project-id={project.id}>
          <ProjectCaseStudy project={project} />
        </div>
      ))}
    </section>
  );
}
