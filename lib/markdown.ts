import fs from "node:fs/promises";
import path from "node:path";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * Reads the raw markdown body for a project write-up.
 * Content is body-only (no frontmatter) — the manifest in projects.json
 * already carries the metadata, so the markdown file is pure prose.
 */
export async function getProjectMarkdown(slug: string): Promise<string> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  return fs.readFile(filePath, "utf-8");
}
