import { achievements, capabilities, education, experience } from "@/lib/resume";

/**
 * Resume-derived career timeline + education + capabilities.
 * Every entry comes from the resume PDF; no metrics are invented.
 */
export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-b border-hairline px-5 py-14 sm:px-10 lg:px-14 xl:px-20"
    >
      <p className="font-mono text-[10px] uppercase tracking-ledger text-copper">
        § 3 — Record
      </p>
      <h2
        id="experience-title"
        className="mt-3 font-display text-3xl font-medium tracking-tight text-ink"
      >
        Experience, in order.
      </h2>

      <ol className="mt-9 space-y-0 border-l border-hairline-strong">
        {experience.map((entry) => (
          <li key={`${entry.organization}-${entry.start}`} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-[0.45em] h-2.5 w-2.5 rounded-full border border-copper bg-paper"
            />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                {entry.role}
              </h3>
              <p className="ml-auto font-mono text-[11px] tracking-wide text-ink-faint">
                {entry.start} — {entry.end}
              </p>
            </div>
            <p className="mt-1 font-mono text-[12px] text-copper">
              {entry.organization}
              <span className="text-ink-faint"> · {entry.location}</span>
            </p>
            <ul className="mt-3 max-w-measure space-y-2 text-[14px] leading-[1.7] text-ink-soft">
              {entry.contributions.map((contribution, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-px w-3.5 shrink-0 bg-hairline-strong"
                  />
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Core focus">
              {entry.focus.map((item) => (
                <li
                  key={item}
                  className="rounded-sm bg-paper-sunken px-2 py-1 font-mono text-[10.5px] tracking-wide text-ink-faint"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* Education */}
      <div className="mt-12 border-t border-hairline pt-8">
        <h3 className="font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
          Education
        </h3>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-display text-xl font-medium tracking-tight text-ink">
            {education.institution}
          </p>
          <p className="ml-auto font-mono text-[11px] tracking-wide text-ink-faint">
            {education.expected}
          </p>
        </div>
        <p className="mt-1 text-[14.5px] text-ink-soft">
          {education.credential}
          <span className="text-ink-faint"> · {education.location}</span>
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Computer science coursework">
          {education.coursework.map((course) => (
            <li
              key={course}
              className="rounded-sm bg-paper-sunken px-2 py-1 font-mono text-[10.5px] tracking-wide text-ink-faint"
            >
              {course}
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements — metrics stated in the resume, surfaced as-is */}
      <div className="mt-12 border-t border-hairline pt-8">
        <h3 className="font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
          Achievements
        </h3>
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {achievements.map((achievement) => (
            <li
              key={achievement.headline}
              className="border-l-2 border-copper pl-4"
            >
              <p className="font-display text-[17px] font-medium leading-snug tracking-tight text-ink">
                {achievement.headline}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                {achievement.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Capabilities */}
      <div className="mt-12 border-t border-hairline pt-8">
        <h3 className="font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
          Technical capabilities
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {capabilities.map((group) => (
            <div key={group.label}>
              <h4 className="font-mono text-[11px] uppercase tracking-ledger text-copper">
                {group.label}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-hairline bg-paper-raised px-2 py-1 font-mono text-[10.5px] tracking-wide text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
