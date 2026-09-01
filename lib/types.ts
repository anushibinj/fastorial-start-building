export const LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type Level = (typeof LEVELS)[number];

export const PERSONAS = ["student", "fresher", "qa-to-dev", "other"] as const;
export type Persona = (typeof PERSONAS)[number];

export interface Project {
  slug: string;
  name: string;
  level: Level;
  tag: string;
  personas: Persona[];
  seoDescription: string;
}
