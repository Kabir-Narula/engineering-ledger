export type VisualKind = "sm2" | "collab" | null;

export interface TechnicalProof {
  /** Real path of the key source file inside its repository — linked on GitHub */
  filePath: string;
}

export interface CaseStudy {
  problem: string;
  approach: string;
  engineering: string[];
  architecture: string[];
  outcome: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  /**
   * One tight synthesis — what it is, why it exists, how it works — that
   * replaces the old description/problem/approach trio on the page.
   * Composed from those same fields; no new claims.
   */
  brief: string;
  /** Short node labels for the animated architecture circuit */
  archLabels: string[];
  repositoryUrl: string;
  liveUrl?: string;
  license?: string;
  technologies: string[];
  /**
   * Real product screenshots pulled from the repository's own README
   * (served from /public). Empty when the repo ships none — in that case
   * `visual` names an honest animated schematic instead.
   */
  shots: string[];
  visual: VisualKind;
  caseStudy: CaseStudy;
  technicalProof: TechnicalProof;
}
