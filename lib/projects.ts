import fs from "node:fs";
import path from "node:path";
import { projectsManifestSchema } from "./schema";
import type { Level, Persona, Project } from "./types";

const MANIFEST_PATH = path.join(process.cwd(), "content", "projects.json");

let cachedProjects: Project[] | null = null;

/**
 * Loads and validates content/projects.json against the zod schema.
 * A malformed manifest entry throws immediately with a specific, actionable
 * error instead of letting a broken page ship — this runs at build time.
 */
function loadProjects(): Project[] {
  if (cachedProjects) return cachedProjects;

  const raw = fs.readFileSync(MANIFEST_PATH, "utf-8");
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `content/projects.json is not valid JSON: ${(error as Error).message}`,
    );
  }

  const result = projectsManifestSchema.safeParse(parsed);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - [${issue.path.join(".")}] ${issue.message}`)
      .join("\n");
    throw new Error(
      `content/projects.json failed validation. Fix these entries before building:\n${issues}`,
    );
  }

  for (const project of result.data) {
    const markdownPath = path.join(
      process.cwd(),
      "content",
      "projects",
      `${project.slug}.md`,
    );
    if (!fs.existsSync(markdownPath)) {
      throw new Error(
        `content/projects.json references slug "${project.slug}" but content/projects/${project.slug}.md does not exist.`,
      );
    }
  }

  cachedProjects = result.data;
  return cachedProjects;
}

export function getAllProjects(): Project[] {
  return loadProjects();
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadProjects().find((project) => project.slug === slug);
}

export function getProjectsByLevel(level: Level): Project[] {
  return loadProjects().filter((project) => project.level === level);
}

export function getProjectsByLevelAndPersona(level: Level, persona: Persona): Project[] {
  return loadProjects().filter(
    (project) => project.level === level && project.personas.includes(persona),
  );
}

/** Distinct levels actually present in the manifest, in canonical order. */
export function getLevelsInUse(): Level[] {
  const present = new Set(loadProjects().map((project) => project.level));
  return (["beginner", "intermediate", "advanced"] as Level[]).filter((level) =>
    present.has(level),
  );
}

/** Distinct personas represented by at least one project at the given level. */
export function getPersonasForLevel(level: Level): Persona[] {
  const present = new Set(
    loadProjects()
      .filter((project) => project.level === level)
      .flatMap((project) => project.personas),
  );
  return (["student", "fresher", "qa-to-dev", "other"] as Persona[]).filter((persona) =>
    present.has(persona),
  );
}
