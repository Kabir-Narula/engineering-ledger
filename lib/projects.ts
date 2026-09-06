import type { Project } from "@/types/project";

/**
 * Project data layer.
 *
 * Every fact below is taken from the corresponding public repository
 * (README, topics, directory layout, and source files) under
 * github.com/Kabir-Narula, read directly from GitHub on 2026-09-05.
 * The technical-proof excerpts are verbatim slices of repository source,
 * abridged only with clearly marked elisions.
 */
export const projects: Project[] = [
  {
    id: "jobhub",
    shots: ["/shots/jobhub/jobs.png", "/shots/jobhub/tailor.png", "/shots/jobhub/tracker.png", "/shots/jobhub/filters.png"],
    visual: null,
    index: "01",
    name: "jobhub",
    tagline: "A personal job-search operating system for the Toronto tech market",
    description:
      "Aggregates postings from 40+ sources, tracks every application to outcome, and compiles design-locked one-page LaTeX résumés per job — with verified recruiter contacts and outreach drafts.",
    repositoryUrl: "https://github.com/Kabir-Narula/jobhub",
    license: "MIT",
    technologies: [
      "Next.js 16",
      "TypeScript 5",
      "Prisma 6",
      "Supabase Postgres",
      "Tectonic (LaTeX)",
      "OpenAI-compatible LLM",
      "Vercel Cron / Inngest",
    ],
    caseStudy: {
      problem:
        "New-grad job hunting in one city is fragmented across dozens of ATS boards and career pages. Tracking, tailoring, and finding a human to contact is manual — and easy to drop.",
      approach:
        "Four cooperating pipelines: scheduled multi-source aggregation under an explicit location policy, an application tracker that notices when you click through to apply, a LaTeX résumé tailor with hard layout guarantees, and verified-contact discovery with outreach drafting.",
      engineering: [
        "Multi-layer fuzzy dedupe — fingerprint → source-ID → normalized title+company, plus an end-of-poll sweep. Merged postings can never resurface.",
        "Per-source failure isolation with a poll-run health log: one dead source never takes the pipeline down.",
        "The LLM returns JSON only; a deterministic assembler re-injects it into a frozen LaTeX skeleton — fonts, margins, and section order cannot change, by construction.",
        "A fabrication tripwire regenerates on any unsourced number; output must compile to exactly one full page, measured from the PDF's text geometry.",
      ],
      architecture: [
        "Next.js 16 App Router UI (Jobs · Tracker · Digest · Tailor) behind a single-password HMAC-cookie gate",
        "Supabase Postgres via Prisma 6; generated PDFs in Supabase Storage",
        "Tectonic static binary for true LaTeX output — never HTML-to-PDF",
        "Vercel Cron scheduling, with Inngest for polls that exceed serverless function caps",
        "Hunter.io verified contacts, with a labeled pattern-matched fallback",
      ],
      outcome:
        "Pipeline engineering with real guarantees: failure isolation, idempotent merging, deterministic documents, and honest third-party ToS boundaries.",
    },
    technicalProof: {
      excerptFile: "jobhub-dedupe-sweep.ts.txt",
      filePath: "lib/dedupe-sweep.ts",
      language: "typescript",
      annotation:
        "Two-phase duplicate sweep — union-find over fuzzy company matches, then a same-source-ID pass. Losers are deactivated with a merge pointer so polls never resurrect them.",
    },
  },
  {
    id: "vertexflow",
    shots: ["/shots/vertexflow/S1.png", "/shots/vertexflow/S2.png", "/shots/vertexflow/s3.png"],
    visual: null,
    index: "02",
    name: "VertexFlow",
    tagline: "Spatial version control for 3D teams",
    description:
      "Upload GLB assets, inspect them in a Three.js viewer, pin reviews to mesh surfaces, and track versions — with worker-derived polycounts and bounding boxes on every version.",
    repositoryUrl: "https://github.com/Kabir-Narula/Vertex_flow",
    technologies: [
      "Turborepo / pnpm",
      "Next.js 14",
      "React Three Fiber",
      "Fastify + tRPC",
      "Python FastAPI + Blender (bpy)",
      "Drizzle ORM + Postgres",
      "BullMQ / Redis",
      "Cloudflare R2",
      "Clerk",
    ],
    caseStudy: {
      problem:
        "3D teams have no lightweight code-review equivalent: versions live in folders, feedback in chat screenshots, and nobody can point at a mesh and say \"here\".",
      approach:
        "A Turborepo monorepo with four deployables — Next.js web with an R3F viewer, Fastify + tRPC API, a Python FastAPI worker running headless Blender, and a shared Drizzle/Postgres package. Assets upload directly to R2; the API only orchestrates.",
      engineering: [
        "The worker keeps bpy as a long-lived module — but Blender's global state is shared across requests, so every job is bracketed by factory resets and an explicit orphan purge.",
        "Deliberately synchronous: bpy holds the GIL, so FastAPI dispatches to a worker thread instead of paying async overhead for zero parallelism.",
        "Downloads stream to disk under an incremental 256 MB hard cap, bounding worker RAM on hostile inputs.",
        "BullMQ/Redis is optional — without REDIS_URL the API processes synchronously, keeping local development honest.",
      ],
      architecture: [
        "apps/web — Next.js 14, Clerk auth, R3F viewer with solid/wire/x-ray modes and Shift+click spatial pins",
        "apps/api — Fastify + tRPC; an asset becomes ready only after the worker processes it",
        "apps/worker — Python 3.11 FastAPI + Blender; POST /process-mesh returns polycount and world-space bounding box",
        "packages/db — Drizzle schema with multi-version asset history",
        "CI: typecheck plus API and worker unit tests on every push",
      ],
      outcome:
        "Genuine systems range: polyglot services, queue-optional orchestration, object-storage uploads, and careful resource management around a native engine.",
    },
    technicalProof: {
      excerptFile: "vertexflow-mesh-processing.py.txt",
      filePath: "apps/worker/app/mesh_processing.py",
      language: "python",
      annotation:
        "Headless-Blender mesh pipeline — streamed, size-capped download; scene isolation around shared bpy state; synchronous by design because of the GIL.",
    },
  },
  {
    id: "axom",
    shots: [],
    visual: "sm2",
    index: "03",
    name: "Axom",
    tagline: "Exam-prep platform built around how students actually fail",
    description:
      "Upload notes and Axom builds a concept knowledge graph, ranks what's likely to be tested, runs adaptive practice, and schedules spaced repetition. Wrong answers get a micro-lesson, not a red X.",
    repositoryUrl: "https://github.com/Kabir-Narula/Axom",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma (SQLite dev, Postgres-ready)",
      "Zod",
      "Tailwind v4",
      "bcrypt",
    ],
    caseStudy: {
      problem:
        "Study tools quiz you and move on. They don't model what you're about to forget, and most stop working the moment an API key is missing.",
      approach:
        "Documents → concept knowledge graph → adaptive tests across seven question types → SM-2 scheduling. A built-in heuristic engine works fully offline; OpenAI is optional depth, not a dependency.",
      engineering: [
        "A faithful SM-2 — easiness updates on every grade, lapse handling, 1/6-day early intervals — extended with a forgetting-curve retrievability estimate that drives mastery scoring.",
        "Layered internals: services / repositories / ai / learning, each replaceable on its own.",
        "Security as default posture: httpOnly sessions, CSRF on mutations, bcrypt, rate limits, ownership-scoped queries.",
      ],
      architecture: [
        "Next.js 16 App Router with React 19; Tailwind v4 + shadcn/ui",
        "Prisma data layer — SQLite in development, Postgres-ready in production",
        "Resource search across Reddit, Stack Overflow, HN, Wikipedia, and arXiv from any concept",
        "Day-by-day study plan generated against the exam date",
      ],
      outcome:
        "Algorithmic literacy applied to a real product: the scheduling core is small, correct, and fully owned — and the product degrades gracefully without an LLM.",
    },
    technicalProof: {
      excerptFile: "axom-sm2.ts.txt",
      filePath: "src/lib/learning/sm2.ts",
      language: "typescript",
      annotation:
        "Complete SM-2 scheduler (Wozniak, 1987) with lapse handling — plus a retrievability estimate from the exponential forgetting curve, used for mastery scoring.",
    },
  },
  {
    id: "bettermind",
    shots: ["/shots/bettermind/s1.png", "/shots/bettermind/s2.png", "/shots/bettermind/s3.png"],
    visual: null,
    index: "04",
    name: "BetterMind",
    tagline: "Mental-wellness platform with privacy-conscious ML inference",
    description:
      "A daily-ritual journaling platform — intentions, pulse checks, CBT exercises, evening synthesis — with sentiment scoring and confidence-scored pattern detection over a 13-table PostgreSQL schema.",
    repositoryUrl: "https://github.com/Kabir-Narula/BetterMind",
    liveUrl: "https://mindful-ai-dps.vercel.app/",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL (Neon)",
      "OpenAI",
      "JWT auth",
    ],
    caseStudy: {
      problem:
        "Journaling apps collect deeply personal data and return almost nothing — and the obvious move, shipping raw journal text to an LLM, is a privacy failure.",
      approach:
        "A daily ritual loop produces structured signals; a pattern service aggregates four weeks of entries, moods, goals, and day logs into anonymized statistics, then asks the LLM for a few confidence-scored patterns with concrete suggestions.",
      engineering: [
        "Content is anonymized and truncated before inference — the LLM sees day-of-week averages and activity correlations, not diary entries.",
        "JSON-mode completions with parse-with-fallback: a malformed response degrades to zero patterns, never a 500.",
        "Date boundaries computed in the user's timezone, so \"today\" and \"the last 28 days\" mean the same thing to the database and the user.",
        "Lifecycle hygiene: new detections archive the old set, and inactive patterns purge after 60 days — no zombie data per user.",
      ],
      architecture: [
        "Next.js 14 App Router on Vercel; CI runs lint + build on every push",
        "Prisma over a 13-table PostgreSQL schema on Neon, JSONB evidence records",
        "JWT auth with a middleware gate; ownership-scoped mutations throughout",
        "Service-layer decomposition: analysis, CBT, personalization, streaks, weekly reflection, timezone",
      ],
      outcome:
        "ML features shipped with adult supervision: data minimization before inference, structured outputs, lifecycle hygiene, and access control on every mutation.",
    },
    technicalProof: {
      excerptFile: "bettermind-pattern-detection.ts.txt",
      filePath: "lib/pattern-detection.ts",
      language: "typescript",
      annotation:
        "Pattern-detection service — parallel 28-day data gathering, anonymized summarization before inference, and archive-then-purge lifecycle for detected patterns.",
    },
  },
  {
    id: "treminy",
    shots: [],
    visual: "collab",
    index: "05",
    name: "Treminy",
    tagline: "Realtime collaborative workspace in the Notion mold",
    description:
      "Documents with realtime cursors and co-editing, workspaces with folders and trash recovery, Stripe subscriptions, and Supabase auth with row-level security — deployed on Railway.",
    repositoryUrl: "https://github.com/Kabir-Narula/Treminy",
    liveUrl: "https://treminy-production.up.railway.app/",
    license: "MIT",
    technologies: [
      "Next.js",
      "TypeScript",
      "Socket.IO",
      "Supabase (auth + RLS)",
      "Drizzle ORM",
      "Stripe",
      "Radix UI",
    ],
    caseStudy: {
      problem:
        "A document workspace only works if two people can edit at once without destroying each other's work — and only sells if access and billing enforce the model.",
      approach:
        "Socket.IO attached directly to Next's HTTP server: one room per document, Quill deltas and cursor ranges fanned out to peers. Workspaces, folders, and trash recovery on Drizzle + Supabase; Stripe handles subscriptions.",
      engineering: [
        "The socket server attaches lazily to the raw HTTP server with body parsing disabled — the fragile part of Socket.IO-in-Next — and guards against double-initialization on hot reload.",
        "Deliberately minimal events: join-room, send-changes, send-cursor-move. Conflict semantics live in the delta format, not bespoke server logic.",
        "Access control enforced twice: Supabase row-level security at the database, Stripe entitlement at the product.",
      ],
      architecture: [
        "Next.js pages + app hybrid with a /api/socket/io upgrade endpoint",
        "Supabase auth with row-level security; Drizzle for workspace/folder/document modeling",
        "Socket.IO rooms keyed by document ID for change and cursor fan-out",
        "Stripe subscription billing with webhook-driven entitlement updates",
      ],
      outcome:
        "Full-stack breadth: realtime transport, relational modeling, billing, and authz — the unglamorous pieces that decide whether a product survives users.",
    },
    technicalProof: {
      excerptFile: "treminy-socket-io.ts.txt",
      filePath: "src/pages/api/socket/io.ts",
      language: "typescript",
      annotation:
        "The entire realtime edge: Socket.IO attached to Next's HTTP server, room-per-document, delta and cursor fan-out — small surface, correct by being boring.",
    },
  },
];
