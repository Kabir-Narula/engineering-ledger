import { profile } from "@/lib/resume";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline px-5 py-10 sm:px-10 lg:px-14 xl:px-20">
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[11px] tracking-wide text-ink-faint">
        <p>
          © {new Date().getFullYear()} {profile.name} — Toronto, ON
        </p>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 transition-colors hover:text-copper hover:underline"
        >
          GitHub
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 transition-colors hover:text-copper hover:underline"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="underline-offset-4 transition-colors hover:text-copper hover:underline"
        >
          {profile.email}
        </a>
        <p className="ml-auto">
          Built with Next.js · Typeset in Fraunces, Inter & JetBrains Mono
        </p>
      </div>
    </footer>
  );
}
