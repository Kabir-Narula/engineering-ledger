import { splitIntoLines, tokenize, type TokenType } from "@/lib/highlight";
import type { ProofLanguage } from "@/types/project";

const TOKEN_CLASS: Record<TokenType, string | undefined> = {
  comment: "tok-comment",
  string: "tok-string",
  keyword: "tok-keyword",
  number: "tok-number",
  fn: "tok-fn",
  type: "tok-type",
  operator: "tok-operator",
  plain: undefined,
};

interface CodePanelProps {
  code: string;
  language: ProofLanguage;
  filePath: string;
  repositoryUrl: string;
}

const LANGUAGE_LABEL: Record<ProofLanguage, string> = {
  typescript: "TypeScript",
  python: "Python",
};

/**
 * Light-theme source panel — the paper counterpart of the old dark
 * editor. Highlighting is computed at build time; the client receives
 * plain spans.
 */
export function CodePanel({
  code,
  language,
  filePath,
  repositoryUrl,
}: CodePanelProps) {
  const lines = splitIntoLines(tokenize(code, language));
  const fileUrl = `${repositoryUrl}/blob/HEAD/${filePath}`;

  return (
    <div
      role="group"
      aria-label={`Source excerpt from ${filePath}`}
      className="code-light overflow-hidden rounded-md border border-hairline bg-paper-raised"
    >
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-paper-sunken px-3.5 py-2">
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 truncate font-mono text-[11px] tracking-wide text-ink-soft underline-offset-4 transition-colors hover:text-copper hover:underline"
        >
          {filePath} ↗
        </a>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-ledger text-ink-faint">
          {LANGUAGE_LABEL[language]}
        </span>
      </div>
      <div className="max-h-80 overflow-auto">
        <pre className="min-w-max px-0 py-3 font-mono text-[12px] leading-[1.7]">
          <code>
            {lines.map((tokens, i) => (
              <span key={i} className="flex">
                <span
                  aria-hidden="true"
                  className="w-11 shrink-0 select-none pr-4 text-right text-ink-faint/60"
                >
                  {i + 1}
                </span>
                <span className="pr-6 text-ink">
                  {tokens.length === 0
                    ? " "
                    : tokens.map((token, j) => {
                        const cls = TOKEN_CLASS[token.type];
                        return cls ? (
                          <span key={j} className={cls}>
                            {token.value}
                          </span>
                        ) : (
                          token.value
                        );
                      })}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
