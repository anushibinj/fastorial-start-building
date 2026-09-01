import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectList } from "@/components/ProjectList";
import { getLevelsInUse, getPersonasForLevel, getProjectsByLevel } from "@/lib/projects";
import { getLevelCopy, personaLabels } from "@/lib/seo-copy";
import { SITE_URL } from "@/lib/site";
import type { Level } from "@/lib/types";
import styles from "../filter.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLevelsInUse().map((level) => ({ level }));
}

function isLevel(value: string): value is Level {
  return getLevelsInUse().includes(value as Level);
}

type Props = { params: Promise<{ level: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;
  if (!isLevel(level)) return {};

  const copy = getLevelCopy(level);
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/filter/${level}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/filter/${level}`,
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

export default async function LevelFilterPage({ params }: Props) {
  const { level } = await params;
  if (!isLevel(level)) notFound();

  const copy = getLevelCopy(level);
  const projects = getProjectsByLevel(level);
  const personas = getPersonasForLevel(level);

  return (
    <div className={styles.wrap}>
      <p className={styles.breadcrumb}>
        <Link href="/">start.fastorial.dev</Link> / {level}
      </p>
      <h1 className={styles.title}>{copy.title}</h1>
      <p className={styles.lede}>{copy.description}</p>

      {personas.length > 0 && (
        <div className={styles.personaLinks}>
          <span className={styles.personaLinksLabel}>Narrow further by background:</span>
          {personas.map((persona) => (
            <Link
              key={persona}
              href={`/filter/${level}/${persona}`}
              className={styles.personaLink}
            >
              {personaLabels[persona]}
            </Link>
          ))}
        </div>
      )}

      <ProjectList projects={projects} />
    </div>
  );
}
