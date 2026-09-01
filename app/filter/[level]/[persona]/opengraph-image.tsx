import { buildOgImage, OG_SIZE } from "@/lib/og";
import {
  getLevelsInUse,
  getPersonasForLevel,
  getProjectsByLevelAndPersona,
} from "@/lib/projects";
import { getComboCopy, personaLabels } from "@/lib/seo-copy";
import type { Level, Persona } from "@/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return getLevelsInUse().flatMap((level) =>
    getPersonasForLevel(level).map((persona) => ({ level, persona })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ level: string; persona: string }>;
}) {
  const { level, persona } = await params;
  const typedLevel = level as Level;
  const typedPersona = persona as Persona;
  const copy = getComboCopy(typedLevel, typedPersona);
  const count = getProjectsByLevelAndPersona(typedLevel, typedPersona).length;

  return buildOgImage({
    eyebrow: `start.fastorial.dev / ${typedLevel} / ${personaLabels[typedPersona]}`,
    title: copy.title,
    description: `${count} ${typedLevel} project ${count === 1 ? "idea" : "ideas"} picked for ${personaLabels[typedPersona]}s.`,
  });
}
