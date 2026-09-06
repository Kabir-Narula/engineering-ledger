/**
 * Treminy has no README screenshots, so instead of inventing fake UI this
 * is an honest animated schematic of its realtime edge: two clients in one
 * document room — one types, deltas fan out, the peer's cursor answers.
 * Pure CSS animation, no JS. Labeled as a schematic.
 */
export function VisualCollab() {
  const lines = [0, 1, 2, 3];

  return (
    <figure
      aria-label="Schematic of realtime collaboration: two cursors in one document room, deltas fan out between clients"
      className="overflow-hidden rounded-md border border-hairline bg-paper-raised"
    >
      <div className="flex items-center justify-between border-b border-hairline bg-paper-sunken px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-ledger text-ink-faint">
          schematic — realtime room
        </span>
        <span className="font-mono text-[10px] text-mineral">room: file-42 · 2 online</span>
      </div>

      <div className="relative grid grid-cols-2 gap-3 p-4">
        {/* Flying delta packet */}
        <span aria-hidden="true" className="viz-packet">Δ</span>

        {(["K", "R"] as const).map((who, pane) => (
          <div
            key={who}
            className="rounded-sm border border-hairline bg-paper-sunken p-3"
          >
            <p className="mb-2.5 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-ledger text-ink-faint">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${pane === 0 ? "bg-copper" : "bg-mineral"}`}
              />
              client {who}
            </p>
            <div className="space-y-2">
              {lines.map((line) => (
                <div key={line} className="flex items-center gap-1.5">
                  <span
                    className="viz-type-line"
                    style={{
                      animationDelay: `${line * 0.7 + pane * 0.35}s`,
                      width: `${62 + ((line * 17 + pane * 23) % 30)}%`,
                    }}
                  />
                  {line === 1 ? (
                    <span
                      aria-hidden="true"
                      className={`viz-caret ${pane === 0 ? "viz-caret-copper" : "viz-caret-mineral"}`}
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <p
              className={`mt-2.5 font-mono text-[9px] ${pane === 0 ? "text-copper" : "text-mineral"}`}
            >
              {pane === 0 ? "send-changes →" : "← receive-changes"}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
