import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectList } from "@/components/ProjectList";
import { PersonaNote } from "@/components/PersonaNote";
import {
  getLevelsInUse,
  getPersonasForLevel,
  getProjectsByLevelAndPersona,
} from "@/lib/projects";
import { getComboCopy, personaLabels } from "@/lib/seo-copy";
import { SITE_URL } from "@/lib/site";
import type { Level, Persona } from "@/lib/types";
import styles from "../../filter.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLevelsInUse().flatMap((level) =>
    getPersonasForLevel(level).map((persona) => ({ level, persona })),
  );
}

function isValidCombo(level: string, persona: string): level is Level {
  return (
    getLevelsInUse().includes(level as Level) &&
    getPersonasForLevel(level as Level).includes(persona as Persona)
  );
}

type Props = { params: Promise<{ level: string; persona: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level, persona } = await params;
  if (!isValidCombo(level, persona)) return {};

  const copy = getComboCopy(level as Level, persona as Persona);
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/filter/${level}/${persona}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/filter/${level}/${persona}`,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function ComboFilterPage({ params }: Props) {
  const { level, persona } = await params;
  if (!isValidCombo(level, persona)) notFound();

  const typedLevel = level as Level;
  const typedPersona = persona as Persona;
  const copy = getComboCopy(typedLevel, typedPersona);
  const projects = getProjectsByLevelAndPersona(typedLevel, typedPersona);

  return (
    <div className={styles.wrap}>
      <p className={styles.breadcrumb}>
        <Link href="/">start.fastorial.dev</Link> /{" "}
        <Link href={`/filter/${typedLevel}`}>{typedLevel}</Link> /{" "}
        {personaLabels[typedPersona]}
      </p>
      <h1 className={styles.title}>{copy.title}</h1>
      <p className={styles.lede}>{copy.description}</p>

      <PersonaNote persona={typedPersona} />

      <ProjectList projects={projects} />
    </div>
  );
}
