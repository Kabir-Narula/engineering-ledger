import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur-sm">
      <ScrollProgress />
      <div className="flex items-center gap-6 px-5 py-3.5 sm:px-10 lg:px-14 xl:px-20">
        <a
          href="#top"
          className="font-mono text-[13px] font-medium tracking-wide text-ink"
        >
          kn<span className="text-copper">/</span>ledger
        </a>
        <nav aria-label="Sections" className="ml-auto">
          <ul className="flex items-center gap-5 font-mono text-[11px] tracking-wide text-ink-faint sm:gap-7">
            <li className="hidden sm:block">
              <a href="#ledger" className="transition-colors hover:text-copper">
                work
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="#experience" className="transition-colors hover:text-copper">
                record
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="#contact" className="transition-colors hover:text-copper">
                contact
              </a>
            </li>
            <li>
              <a
                href="/Kabir_Narula_Resume.pdf"
                download="Kabir_Narula_Resume.pdf"
                className="rounded-sm border border-hairline-strong px-2.5 py-1 text-ink-soft transition-colors hover:border-copper hover:text-copper"
              >
                résumé ↓
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
