interface ArchFlowProps {
  layers: string[];
}

/**
 * Live architecture stack — replaces a static bullet list with the
 * system's actual request/data flow. The spine draws itself, each layer
 * reveals in order, and a packet travels the stack on a loop. Pure CSS;
 * the reduced-motion guard settles everything to its final state.
 */
export function ArchFlow({ layers }: ArchFlowProps) {
  const rows = layers.map(splitLayer);

  return (
    <figure className="arch-flow relative mt-4 rounded-sm border border-hairline bg-paper-raised py-4 pl-7 pr-4">
      {/* Spine + traveling packet */}
      <span aria-hidden="true" className="arch-spine" />
      <span aria-hidden="true" className="arch-packet" />

      <ol className="space-y-3.5">
        {rows.map((row, i) => (
          <li
            key={i}
            className="arch-row relative"
            style={{ animationDelay: `${0.25 + i * 0.22}s` }}
          >
            <span
              aria-hidden="true"
              className="arch-node"
              style={{ animationDelay: `${1.2 + i * 0.6}s` }}
            />
            <p className="font-mono text-[11.5px] leading-snug text-ink">
              <span className="mr-2 text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              {row.label}
            </p>
            {row.detail ? (
              <p className="mt-0.5 pl-7 text-[12.5px] leading-relaxed text-ink-soft">
                {row.detail}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <figcaption className="mt-4 border-t border-hairline pt-2.5 font-mono text-[9.5px] uppercase tracking-ledger text-ink-faint">
        live diagram — request / data flow, top to bottom
      </figcaption>
    </figure>
  );
}

/** Split "label — detail" (or "label; detail", "label, with detail") into diagram rows. */
function splitLayer(layer: string): { label: string; detail: string } {
  for (const sep of [" — ", "; ", ", with "]) {
    const at = layer.indexOf(sep);
    if (at > 0) {
      return {
        label: layer.slice(0, at),
        detail: layer.slice(at + sep.length),
      };
    }
  }
  const words = layer.split(" ");
  if (words.length <= 5) return { label: layer, detail: "" };
  return {
    label: words
      .slice(0, 4)
      .join(" ")
      .replace(/[,\s]+(with|for|on|and)?$/u, ""),
    detail: words.slice(4).join(" "),
  };
}
