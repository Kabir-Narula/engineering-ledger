import type { ProofLanguage } from "@/types/project";

/**
 * Dependency-free syntax highlighting.
 *
 * A small ordered-regex scanner for TypeScript and Python. It is not a
 * parser — it is a careful tokenizer that covers the constructs present in
 * the excerpts on this site (comments, strings, numbers, keywords,
 * declarations, calls, decorators, operators). Tokens are split into lines
 * by the code viewer for line-numbered rendering.
 */

export type TokenType =
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "fn"
  | "type"
  | "operator"
  | "plain";

export interface Token {
  type: TokenType;
  value: string;
}

const KEYWORDS: Record<ProofLanguage, ReadonlySet<string>> = {
  typescript: new Set([
    "abstract", "as", "async", "await", "boolean", "break", "case", "catch",
    "class", "const", "continue", "default", "delete", "do", "else", "enum",
    "export", "extends", "false", "finally", "for", "from", "function", "if",
    "implements", "import", "in", "instanceof", "interface", "keyof", "let",
    "never", "new", "null", "number", "of", "private", "protected", "public",
    "readonly", "return", "satisfies", "static", "string", "super", "switch",
    "this", "throw", "true", "try", "type", "typeof", "undefined", "unknown",
    "var", "void", "while",
  ]),
  python: new Set([
    "and", "as", "assert", "async", "await", "break", "class", "continue",
    "def", "del", "elif", "else", "except", "False", "finally", "for",
    "from", "global", "if", "import", "in", "is", "lambda", "None",
    "nonlocal", "not", "or", "pass", "raise", "return", "True", "try",
    "while", "with", "yield",
  ]),
};

const SCANNERS: Record<ProofLanguage, RegExp> = {
  typescript:
    /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(?<string>'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(?<number>\b(?:0x[\da-fA-F]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?)\b)|(?<ident>[A-Za-z_$][\w$]*)|(?<operator>[+\-*/%=<>!&|^~?]=?|=>|\.{3})/g,
  python:
    /(?<comment>#[^\n]*)|(?<string>[rfb]{0,2}(?:'''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"))|(?<number>\b(?:0x[\da-fA-F]+|\d[\d_]*(?:\.\d+)?)\b)|(?<decorator>@[\w.]+)|(?<ident>[A-Za-z_]\w*)|(?<operator>[+\-*/%=<>!&|^~:]=?)/g,
};

function isCallSite(source: string, from: number): boolean {
  for (let i = from; i < source.length; i++) {
    const ch = source[i];
    if (ch === " " || ch === "\t") continue;
    return ch === "(";
  }
  return false;
}

export function tokenize(code: string, language: ProofLanguage): Token[] {
  const scanner = new RegExp(SCANNERS[language].source, "g");
  const keywords = KEYWORDS[language];
  const tokens: Token[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  const push = (type: TokenType, value: string) => {
    const last = tokens[tokens.length - 1];
    if (type === "plain" && last && last.type === "plain") {
      last.value += value;
    } else if (value.length > 0) {
      tokens.push({ type, value });
    }
  };

  while ((match = scanner.exec(code)) !== null) {
    if (match.index > cursor) {
      push("plain", code.slice(cursor, match.index));
    }
    const groups = match.groups ?? {};
    const text = match[0];

    if (groups["comment"] !== undefined) push("comment", text);
    else if (groups["string"] !== undefined) push("string", text);
    else if (groups["number"] !== undefined) push("number", text);
    else if (groups["decorator"] !== undefined) push("type", text);
    else if (groups["operator"] !== undefined) push("operator", text);
    else if (groups["ident"] !== undefined) {
      if (keywords.has(text)) push("keyword", text);
      else if (/^[A-Z]/.test(text)) push("type", text);
      else if (isCallSite(code, scanner.lastIndex)) push("fn", text);
      else push("plain", text);
    } else {
      push("plain", text);
    }
    cursor = scanner.lastIndex;
  }
  if (cursor < code.length) {
    push("plain", code.slice(cursor));
  }
  return tokens;
}

/** Splits a token stream into lines, breaking multi-line tokens safely. */
export function splitIntoLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    const parts = token.value.split("\n");
    parts.forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part.length > 0) {
        lines[lines.length - 1]?.push({ type: token.type, value: part });
      }
    });
  }
  return lines;
}
