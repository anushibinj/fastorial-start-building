import { buildOgImage, OG_SIZE } from "@/lib/og";
import { getLevelsInUse, getProjectsByLevel } from "@/lib/projects";
import { getLevelCopy } from "@/lib/seo-copy";
import type { Level } from "@/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return getLevelsInUse().map((level) => ({ level }));
}

export default async function Image({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const typedLevel = level as Level;
  const copy = getLevelCopy(typedLevel);
  const count = getProjectsByLevel(typedLevel).length;

  return buildOgImage({
    eyebrow: `start.fastorial.dev / ${typedLevel}`,
    title: copy.title,
    description: `${count} ${typedLevel} project ${count === 1 ? "idea" : "ideas"} for the fastorial community.`,
  });
}
