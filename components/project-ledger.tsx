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
          pane on the right shows a real artifact from each repository as
          you read — the same file, linked, on GitHub.
        </p>
      </header>

      {projects.map((project) => (
        <div key={project.id} data-project-id={project.id}>
          <ProjectCaseStudy project={project} />
        </div>
      ))}
    </section>
  );
}
