import type { Level, Persona } from "./types";

interface Copy {
  title: string;
  description: string;
}

export const personaLabels: Record<Persona, string> = {
  student: "Student",
  fresher: "Fresher",
  "qa-to-dev": "QA-to-Dev",
  other: "Self-Taught",
};

export const homeCopy: Copy = {
  title: "start.fastorial.dev — Find Your Next Coding Project",
  description:
    "Answer two quick questions about your experience and background, and get a hand-picked coding project — built for the fastorial mentorship community.",
};

export const allProjectsCopy: Copy = {
  title: "Every Project Idea, One List",
  description:
    "All 13 fastorial project ideas in one place, badge-tagged by level — the full menu for people who already know roughly what they want to build.",
};

export const levelCopy: Record<Level, Copy> = {
  beginner: {
    title: "Beginner Coding Projects That Aren't Another Todo App",
    description:
      "Real beginner project ideas from a working software engineer — the kind of constraint-driven builds that actually teach you something, picked for people just past the basics.",
  },
  intermediate: {
    title: "Intermediate Projects to Get You Job-Ready",
    description:
      "Past tutorials, not yet production — these are the intermediate builds (real-time systems, rate limits, OAuth) that close the gap between 'I can code' and 'I can ship'.",
  },
  advanced: {
    title: "Advanced Projects for People Who Want to Build Like It's Their Job",
    description:
      "Multi-tenancy, event pipelines, CI/CD, real open-source PRs — advanced project ideas for developers ready to work at the level companies actually hire for.",
  },
};

type ComboKey = `${Level}-${Persona}`;

export const comboCopy: Record<ComboKey, Copy> = {
  "beginner-student": {
    title: "Beginner Projects for Students Building Their First Real Thing",
    description:
      "You've done the classroom assignments — these beginner picks are built around one real constraint each, so your first portfolio pieces look like engineering, not homework.",
  },
  "beginner-fresher": {
    title: "Beginner Projects for New Grads Building a Portfolio",
    description:
      "Skip the fifth todo app. These beginner builds are small enough to finish solo and specific enough to actually talk about in an interview.",
  },
  "beginner-qa-to-dev": {
    title: "Beginner Projects for QA Engineers Moving Into Dev",
    description:
      "You already think in edge cases and failure modes — that's a head start most beginners don't have. These picks put that instinct to work building, not just testing.",
  },
  "beginner-other": {
    title: "Beginner Projects for Self-Taught Developers",
    description:
      "No CS degree required and none assumed. These beginner builds come with a real constraint baked in, so you pick up engineering judgment alongside the syntax.",
  },
  "intermediate-student": {
    title: "Intermediate Projects for Students Ready to Go Past the Curriculum",
    description:
      "These are the systems your coursework skips — live presence, rate limiting, OAuth — picked for students who want a project that outgrows the classroom.",
  },
  "intermediate-fresher": {
    title: "Intermediate Projects for Job-Hunting New Grads",
    description:
      "The gap between 'I finished a bootcamp' and 'I got hired' usually gets closed by a project like one of these — real infra concerns, not another CRUD app.",
  },
  "intermediate-qa-to-dev": {
    title: "Intermediate Projects for QA Engineers Leveling Up",
    description:
      "You've spent your career finding what breaks systems — now build the systems. These intermediate picks, including a test framework from scratch, turn that QA instinct into shipped code.",
  },
  "intermediate-other": {
    title: "Intermediate Projects for Career Changers",
    description:
      "You've got the fundamentals down — these intermediate builds add the real-world complexity (auth, rate limits, live data) that most self-taught paths skip over.",
  },
  "advanced-student": {
    title: "Advanced Projects for Students Who Want to Build Like a Pro",
    description:
      "Multi-tenancy, event pipelines, real CI/CD — advanced picks for students who've outgrown class projects and want something that looks like production.",
  },
  "advanced-fresher": {
    title: "Advanced Projects for New Grads Aiming Above Entry-Level",
    description:
      "These advanced builds — event-driven pipelines, real multi-tenant architecture, a real open-source PR — are how you apply for the role above the one you're 'qualified' for.",
  },
  "advanced-qa-to-dev": {
    title: "Advanced Projects for QA Engineers Going Deep",
    description:
      "You already understand systems under stress — these advanced picks let you architect them instead of just testing them.",
  },
  "advanced-other": {
    title: "Advanced Projects for Self-Taught Developers Going Pro",
    description:
      "No bootcamp or degree gatekeeps this list. These advanced builds are judged purely on whether the system holds up — multi-tenancy, event pipelines, a real open-source contribution.",
  },
};

export const personaNotes: Record<Persona, string> = {
  student:
    "You're picking these while you've still got classmates, office hours, and a syllabus around you — use that. These projects are deliberately open-ended where your coursework isn't, so treat the ambiguity as the assignment.",
  fresher:
    "You're building a portfolio, not finishing a degree requirement — every project here is scoped to be finishable solo and specific enough to carry a real conversation in an interview.",
  "qa-to-dev":
    "Your QA background isn't a gap you're filling — it's an advantage most beginners don't have. You already know what breaks systems; these picks put that instinct to work on the building side.",
  other:
    "No bootcamp or CS degree assumed here. These projects come with a real constraint built in, so the engineering judgment you'd otherwise pick up in a classroom gets built alongside the syntax.",
};

export function getLevelCopy(level: Level): Copy {
  return levelCopy[level];
}

export function getComboCopy(level: Level, persona: Persona): Copy {
  return comboCopy[`${level}-${persona}`];
}
