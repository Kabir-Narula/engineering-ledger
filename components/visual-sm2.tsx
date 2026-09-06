/**
 * Axom has no README screenshots, so instead of inventing fake UI this is
 * an honest animated schematic of its actual scheduling core: SM-2 review
 * intervals growing by easiness factor (1d → 6d → 15d → 38d at EF 2.5),
 * with recall probability decaying exponentially between reviews.
 * Pure CSS/SVG animation, no JS. Labeled as a schematic.
 */
export function VisualSm2() {
  // Forgetting curve r(t) = e^(-t/S); path precomputed for a 300x120 plot.
  const curve =
    "M 8 12 C 30 60, 55 84, 85 96 C 120 106, 170 110, 292 113";
  const intervals = [
    { label: "R1", days: "1d", width: 12 },
    { label: "R2", days: "6d", width: 24 },
    { label: "R3", days: "15d", width: 44 },
    { label: "R4", days: "38d", width: 76 },
  ];

  return (
    <figure
      aria-label="Schematic of SM-2 spaced repetition: review intervals grow while recall probability decays between reviews"
      className="overflow-hidden rounded-md border border-hairline bg-paper-raised"
    >
      <div className="border-b border-hairline bg-paper-sunken px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
          schematic — sm2 scheduling core
        </span>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[3fr_2fr]">
        {/* Forgetting curve */}
        <div className="border-b border-hairline p-4 sm:border-b-0 sm:border-r">
          <svg viewBox="0 0 300 120" className="h-auto w-full" role="img" aria-hidden="true">
            <line x1="8" y1="113" x2="292" y2="113" className="viz-axis" />
            <line x1="8" y1="8" x2="8" y2="113" className="viz-axis" />
            <path d={curve} className="viz-curve" />
            <path d={curve} className="viz-curve-ghost" />
            <circle r="3.5" className="viz-dot">
              <animateMotion dur="6s" repeatCount="indefinite" path={curve} />
            </circle>
            <text x="14" y="24" className="viz-label">recall</text>
            <text x="248" y="106" className="viz-label">days →</text>
          </svg>
          <p className="mt-1 font-mono text-[10px] text-ink-faint">
            r(t) = e^(−t/S) — retrievability between reviews
          </p>
        </div>

        {/* Interval growth */}
        <div className="flex flex-col justify-center gap-2.5 p-4">
          {intervals.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2.5">
              <span className="w-6 font-mono text-[10px] text-ink-faint">{step.label}</span>
              <span
                className="viz-bar"
                style={{ width: `${step.width}%`, animationDelay: `${i * 0.35}s` }}
              />
              <span className="font-mono text-[10px] text-copper">{step.days}</span>
            </div>
          ))}
          <p className="mt-1 font-mono text-[10px] text-ink-faint">
            interval ×= easiness on every pass
          </p>
        </div>
      </div>
    </figure>
  );
}
