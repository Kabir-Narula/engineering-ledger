import { ContactForm } from "@/components/contact-form";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { ProjectLedger } from "@/components/project-ledger";
import { ProofPaneShell } from "@/components/proof-pane-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ProjectWithCode } from "@/components/technical-proof";
import { readProofExcerpt } from "@/lib/proof";
import { projects } from "@/lib/projects";
import { profile } from "@/lib/resume";

export default async function Page() {
  // Excerpts are read from disk at build/request time — verbatim slices
  // of the public repositories they are attributed to.
  const projectsWithCode: ProjectWithCode[] = await Promise.all(
    projects.map(async (project) => {
      const excerpt = await readProofExcerpt(
        project.technicalProof.excerptFile,
        project.technicalProof.language
      );
      return { ...project, code: excerpt.code };
    })
  );

  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[1720px]">
        <ProofPaneShell projects={projectsWithCode}>
          <Hero />
          <ProjectLedger projects={projectsWithCode} />
          <ExperienceTimeline />

          <section
            id="contact"
            aria-labelledby="contact-title"
            className="scroll-mt-16 px-5 py-14 sm:px-10 lg:px-14 xl:px-20"
          >
            <p className="font-mono text-[10px] uppercase tracking-ledger text-copper">
              § 4 — Correspondence
            </p>
            <h2
              id="contact-title"
              className="mt-3 font-display text-3xl font-medium tracking-tight text-ink"
            >
              Say something specific.
            </h2>
            <p className="mt-3 max-w-measure text-[14.5px] leading-relaxed text-ink-soft">
              A role, a system you are struggling with, a question about any
              repository above. Direct line:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-[13px] text-copper underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-sm bg-copper px-4 py-2 font-mono text-[11px] uppercase tracking-ledger text-paper transition-colors hover:bg-copper-soft"
              >
                Email directly
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-hairline-strong px-4 py-2 font-mono text-[11px] uppercase tracking-ledger text-ink-soft transition-colors hover:border-copper hover:text-copper"
              >
                LinkedIn ↗
              </a>
              <a
                href="/Kabir_Narula_Resume.pdf"
                download="Kabir_Narula_Resume.pdf"
                className="rounded-sm border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-ledger text-ink-faint transition-colors hover:border-copper/60 hover:text-copper"
              >
                Résumé ↓
              </a>
            </div>
            <ContactForm />
          </section>
        </ProofPaneShell>
      </main>
      <SiteFooter />
    </div>
  );
}
