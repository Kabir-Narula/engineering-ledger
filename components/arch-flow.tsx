interface ArchFlowProps {
  labels: string[];
}

/**
 * Live architecture circuit — one scaled SVG rail, so the diagram keeps
 * its geometry at every width (no wrapping, no dead space). Current runs
 * along the rail as animated dashes; each node lights in sequence as the
 * wavefront reaches it, the same order a request travels. Pure CSS;
 * the reduced-motion guard settles everything to its final state.
 */
export function ArchFlow({ labels }: ArchFlowProps) {
  const W = 660;
  const H = 92;
  const RAIL_Y = 34;
  const PAD = 52;
  const step = (W - PAD * 2) / (labels.length - 1);

  return (
    <figure className="mt-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label={`Architecture flow: ${labels.join(" → ")}`}
      >
        {/* Rail bed + the current running along it */}
        <line
          x1={PAD}
          y1={RAIL_Y}
          x2={W - PAD}
          y2={RAIL_Y}
          className="arch-rail"
        />
        <line
          x1={PAD}
          y1={RAIL_Y}
          x2={W - PAD}
          y2={RAIL_Y}
          className="arch-rail-flow"
        />
        {/* Arrowhead — direction of travel */}
        <path
          d={`M ${W - PAD + 2} ${RAIL_Y} l -8 -4 v 8 z`}
          className="arch-arrow"
        />

        {labels.map((label, i) => {
          const x = PAD + i * step;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={RAIL_Y}
                r={11}
                className="arch-ring"
                style={{ animationDelay: `${0.4 + i * 0.84}s` }}
              />
              <text x={x} y={RAIL_Y + 3.5} className="arch-num">
                {String(i + 1).padStart(2, "0")}
              </text>
              <text x={x} y={RAIL_Y + 34} className="arch-cap">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-1 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-ledger text-ink-faint">
        <span aria-hidden="true" className="arch-live-dot" />
        signal path — live
      </figcaption>
    </figure>
  );
}
