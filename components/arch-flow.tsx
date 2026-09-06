interface ArchFlowProps {
  labels: string[];
}

/**
 * Live architecture circuit — the system's request/data flow rendered as
 * a signal trace, not a document. Current runs continuously through the
 * connectors; a glow passes node to node in sequence, so the eye follows
 * the same path a request does. Chips carry names only — the paragraphs
 * live in the repository, where they belong. Pure CSS; the reduced-motion
 * guard settles everything to its final state.
 */
export function ArchFlow({ labels }: ArchFlowProps) {
  return (
    <figure className="arch-box mt-4 rounded-sm border border-hairline bg-paper-raised px-5 py-5">
      <ol className="arch-chain" aria-label="Architecture flow">
        {labels.map((label, i) => (
          <li
            key={i}
            className="arch-stage"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="arch-chip">
              <span className="arch-idx">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 flex items-center justify-between border-t border-hairline pt-2.5 font-mono text-[9.5px] uppercase tracking-ledger text-ink-faint">
        <span>signal path — live</span>
        <span aria-hidden="true" className="arch-live-dot" />
      </figcaption>
    </figure>
  );
}
