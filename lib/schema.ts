import { z } from "zod";
import { LEVELS, PERSONAS } from "./types";

export const levelSchema = z.enum(LEVELS);
export const personaSchema = z.enum(PERSONAS);

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1, "slug is required")
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "slug must be lowercase kebab-case (letters, numbers, hyphens only)",
    ),
  name: z.string().min(1, "name is required"),
  level: levelSchema,
  tag: z.string().min(1, "tag is required"),
  personas: z
    .array(personaSchema)
    .min(1, "a project must be relevant to at least one persona"),
  seoDescription: z
    .string()
    .min(20, "seoDescription should be a real sentence, not a stub")
    .max(200, "seoDescription should stay short enough for a meta description"),
});

export const projectsManifestSchema = z
  .array(projectSchema)
  .superRefine((projects, ctx) => {
    const seenSlugs = new Set<string>();
    for (const [index, project] of projects.entries()) {
      if (seenSlugs.has(project.slug)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate slug "${project.slug}" at index ${index} — slugs must be unique.`,
          path: [index, "slug"],
        });
      }
      seenSlugs.add(project.slug);
    }
  });

export type ProjectInput = z.infer<typeof projectSchema>;
