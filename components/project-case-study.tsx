import { ArchFlow } from "@/components/arch-flow";
import { ProjectViewport } from "@/components/project-viewport";
import type { ProjectWithCode } from "@/components/technical-proof";
import { VisualCollab } from "@/components/visual-collab";
import { VisualSm2 } from "@/components/visual-sm2";

interface ProjectCaseStudyProps {
  project: ProjectWithCode;
}

/**
 * One case study in the ledger, tuned for a recruiter's scan: a single
 * brief (what + why + how in one breath), three engineering highlights,
 * a one-line outcome — everything else is visual or behind disclosure.
 * On mobile/tablet the product viewport travels inline with the
 * narrative; on desktop the sticky pane carries it instead. The real
 * source artifact sits behind an accessible disclosure in both layouts.
 */
export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const { caseStudy } = project;

  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      className="scroll-mt-20 border-t border-hairline py-10 first:border-t-0 first:pt-0"
    >
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[11px] tracking-ledger text-copper">
          {project.index}
        </span>
        <h3
          id={`project-${project.id}-title`}
          className="font-display text-2xl font-medium tracking-tight text-ink"
        >
          {project.name}
        </h3>
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto font-mono text-[11px] text-ink-faint underline-offset-4 transition-colors hover:text-copper hover:underline"
        >
          {project.repositoryUrl.replace("https://github.com/", "github.com/")}
          {project.license ? ` · ${project.license}` : ""} ↗
        </a>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-sm border border-copper/40 bg-copper-faint px-2 py-0.5 font-mono text-[10px] uppercase tracking-ledger text-copper transition-colors hover:border-copper"
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-copper"
            />
            live ↗
          </a>
        ) : (
          <span className="rounded-sm border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
            source
          </span>
        )}
      </header>

      <p className="mt-2 max-w-measure text-[15px] leading-[1.75] text-ink-soft">
        {project.brief}
      </p>

      {/* Mobile / tablet: the viewport travels with the narrative */}
      <div className="mt-6 lg:hidden">
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
      </div>

      <div className="mt-6 space-y-5">
        <Section label="Engineering highlights">
          <ul className="space-y-2.5">
            {caseStudy.engineering.slice(0, 3).map((point, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-px w-4 shrink-0 bg-copper"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Section>

        <p className="flex gap-3 border-l-2 border-copper/50 pl-4 text-[13.5px] leading-relaxed text-ink">
          <span className="shrink-0 font-mono text-[10px] uppercase leading-[2] tracking-ledger text-copper">
            outcome
          </span>
          <span>{caseStudy.outcome}</span>
        </p>

        <details className="ledger group border-y border-hairline py-3">
          <summary className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-ledger text-ink-soft transition-colors hover:text-copper">
            <span aria-hidden="true" className="ledger-marker text-copper">
              ▸
            </span>
            Architecture — {project.archLabels.length} nodes · live circuit
          </summary>
          <div className="pl-6">
            <ArchFlow labels={project.archLabels} />
          </div>
        </details>
      </div>
    </article>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
        {label}
      </h4>
      <div className="mt-2 max-w-measure text-[15px] leading-[1.75] text-ink-soft">
        {children}
      </div>
    </section>
  );
}
