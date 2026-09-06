import { profile } from "@/lib/resume";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="border-b border-hairline px-5 pb-12 pt-16 sm:px-10 lg:px-14 lg:pb-14 lg:pt-20 xl:px-20"
    >
      <p className="font-mono text-[10px] uppercase tracking-ledger text-copper">
        § 1 — Register
      </p>

      <h1
        id="hero-title"
        className="mt-5 font-display text-[clamp(2.3rem,4.2vw,3.3rem)] font-medium leading-[1.08] tracking-tight text-ink"
      >
        {profile.name}
        <span className="text-ink-faint"> builds systems that hold up.</span>
      </h1>

      <p className="mt-5 max-w-measure text-[15.5px] leading-[1.8] text-ink-soft">
        {profile.positioning}
      </p>

      <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-3 border-t border-hairline pt-5 font-mono text-[12px] sm:grid-cols-2">
        <MetaRow term="Base" value={profile.location} />
        <MetaRow
          term="Education"
          value="Honours B.Tech Software Development, Seneca Polytechnic — Aug 2026"
        />
        <MetaRow
          term="Contact"
          value={profile.email}
          href={`mailto:${profile.email}`}
        />
        <MetaRow
          term="Source"
          value="github.com/Kabir-Narula"
          href={profile.links.github}
        />
        <MetaRow
          term="LinkedIn"
          value="linkedin.com/in/kabir-narula"
          href={profile.links.linkedin}
        />
      </dl>

      <p className="mt-6 flex items-center gap-2.5 font-mono text-[11px] text-mineral">
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-mineral"
        />
        {profile.availability}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="/Kabir_Narula_Resume.pdf"
          download="Kabir_Narula_Resume.pdf"
          className="rounded-sm bg-copper px-4 py-2 font-mono text-[11px] uppercase tracking-ledger text-paper transition-colors hover:bg-copper-soft"
        >
          Download résumé ↓
        </a>
        <a
          href="#ledger"
          className="rounded-sm border border-hairline-strong px-4 py-2 font-mono text-[11px] uppercase tracking-ledger text-ink-soft transition-colors hover:border-copper hover:text-copper"
        >
          Selected work
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-ledger text-ink-faint transition-colors hover:border-copper/60 hover:text-copper"
        >
          github ↗
        </a>
      </div>
    </section>
  );
}

function MetaRow({
  term,
  value,
  href,
}: {
  term: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-4">
      <dt className="w-20 shrink-0 uppercase tracking-ledger text-ink-faint">
        {term}
      </dt>
      <dd className="text-ink-soft">
        {href ? (
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="underline-offset-4 transition-colors hover:text-copper hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
