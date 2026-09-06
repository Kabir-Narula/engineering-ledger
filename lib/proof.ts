import { promises as fs } from "fs";
import path from "path";

import type { ProofLanguage } from "@/types/project";

const PROOF_DIR = path.join(process.cwd(), "content", "proof");

export interface ProofExcerpt {
  code: string;
  language: ProofLanguage;
}

/**
 * Reads a technical-proof excerpt from disk at request/build time.
 * Runs server-side only (called from server components).
 */
export async function readProofExcerpt(
  excerptFile: string,
  language: ProofLanguage
): Promise<ProofExcerpt> {
  const code = await fs.readFile(path.join(PROOF_DIR, excerptFile), "utf8");
  return { code: code.replace(/\r\n/g, "\n").trimEnd(), language };
}
