import type {
  Achievement,
  CapabilityGroup,
  EducationEntry,
  ExperienceEntry,
  Profile,
} from "@/types/resume";

/**
 * Resume data layer.
 *
 * Source: Kabir_Narula_Resume_TD_Database_Platform_Engineer.pdf, supplied
 * directly by the owner. Metrics ($2,000 scholarship ×2, 30+ classrooms,
 * 13-table schema, 4-service platform, 10+ projects) come straight from
 * that document — nothing is embellished.
 */
export const profile: Profile = {
  name: "Kabir Narula",
  location: "Toronto, ON",
  email: "Kabirnar10@gmail.com",
  phone: "(647) 410-6699",
  links: {
    github: "https://github.com/Kabir-Narula",
    linkedin: "https://www.linkedin.com/in/kabir-narula-19b129260/",
  },
  positioning:
    "Backend-leaning full-stack engineer. I build systems that survive real traffic — FastAPI and Next.js services, Redis-backed queues, PostgreSQL schemas with real constraints, and ML inference pipelines — with CI, tests, and a deploy target on everything.",
  availability: "Open to new-grad software engineering roles — backend, full-stack, data/ML — Toronto & remote.",
};

export const experience: ExperienceEntry[] = [
  {
    role: "Backend Software Developer Intern (Academic WIL)",
    organization: "Seneca Polytechnic — INNWIL Lab · VYBE Platform",
    location: "Toronto, ON",
    start: "Feb 2026",
    end: "Apr 2026",
    contributions: [
      "Built Python FastAPI REST services for the VYBE platform, moving heavy extraction off client paths.",
      "Automated GitHub Actions CI/CD with tests and review gates, standardizing service releases through the production pipeline.",
      "Documented deployment tradeoffs in Confluence and coordinated Agile sprints with technical and non-technical partners.",
    ],
    focus: ["FastAPI", "CI/CD", "GitHub Actions", "Agile Delivery"],
  },
  {
    role: "ITS Student HyFlex Ambassador + Lab Monitor",
    organization: "Seneca Polytechnic — ITS",
    location: "Toronto, ON",
    start: "Aug 2025",
    end: "Nov 2025",
    contributions: [
      "Supported 30+ HyFlex classrooms with Windows and Linux troubleshooting, projectors, and audio peripherals across lab spaces.",
      "Installed operating systems and classroom devices, then logged incidents and escalations through ITIL support procedures.",
      "Documented HyFlex steps and trained faculty on classroom setup, reducing repeat support tickets.",
    ],
    focus: ["Windows / Linux", "ITIL", "Incident Management", "Training"],
  },
  {
    role: "Backend Software Developer (Freelance)",
    organization: "Project Human City",
    location: "Toronto, ON",
    start: "May 2025",
    end: "Jul 2025",
    contributions: [
      "Integrated third-party REST APIs into production services, translating external payloads into stable contracts for mobile and web clients.",
      "Built TypeScript React features against shared backends.",
      "Fixed backend defects during release cycles and restored reliability for community-facing endpoints under live traffic.",
    ],
    focus: ["REST Integration", "TypeScript / React", "Production Reliability"],
  },
  {
    role: "Software Engineer (Freelance)",
    organization: "Three of Cups",
    location: "Toronto, ON",
    start: "Feb 2024",
    end: "Apr 2024",
    contributions: [
      "Designed normalized PostgreSQL schemas and reviewed execution plans to remove slow SQL paths on shared request workloads.",
      "Refactored synchronous backend work into asynchronous background jobs, moving timeouts out of the request path.",
      "Applied query optimization and database design across 2 freelance client engagements, validating changes with repeatable checks.",
    ],
    focus: ["PostgreSQL", "Query Optimization", "Background Jobs"],
  },
];

export const education: EducationEntry = {
  institution: "Seneca Polytechnic",
  credential: "Honours Bachelor of Technology — Software Development",
  location: "Toronto, ON",
  expected: "Aug 2026",
  coursework: [
    "Machine Learning (AI for Software Developers)",
    "High Performance Computing",
    "Parallel Algorithms",
    "Computer Vision",
    "Linux/Unix Systems Programming",
    "Operating Systems",
    "Data Structures & Algorithms",
    "Cloud Web Programming",
  ],
};

export const achievements: Achievement[] = [
  {
    headline: "$2,000 scholarship — awarded twice",
    detail: "For academic excellence, Seneca Polytechnic.",
  },
  {
    headline: "Seneca Hackathon finalist",
    detail: "Reached the finals with a working software prototype.",
  },
  {
    headline: "10+ projects for real clients",
    detail: "Freelance and personal software delivered end-to-end — web platforms to mobile apps.",
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    label: "Languages",
    items: ["SQL", "Python", "TypeScript"],
  },
  {
    label: "Frameworks",
    items: ["FastAPI", "React", "Next.js", "Prisma", "tRPC"],
  },
  {
    label: "Infra & Tools",
    items: ["GitHub Actions", "Linux/Unix", "Git", "Docker", "Redis"],
  },
  {
    label: "Cloud & Data",
    items: ["PostgreSQL", "REST APIs", "CI/CD", "Database Design", "Query Optimization"],
  },
];
