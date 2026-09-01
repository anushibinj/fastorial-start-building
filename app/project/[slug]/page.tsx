import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getProjectMarkdown } from "@/lib/markdown";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { personaLabels } from "@/lib/seo-copy";
import { CONTENT_PUBLISHED_DATE, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

const LEVEL_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.name} — ${SITE_TITLE}`;
  return {
    title: { absolute: title },
    description: project.seoDescription,
    alternates: { canonical: `/project/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/project/${project.slug}`,
      title,
      description: project.seoDescription,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.seoDescription,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const markdown = await getProjectMarkdown(project.slug);
  const canonicalUrl = `${SITE_URL}/project/${project.slug}`;

  return (
    <div className={styles.wrap}>
      <p className={styles.breadcrumb}>
        <Link href="/">start.fastorial.dev</Link> /{" "}
        <Link href={`/filter/${project.level}`}>{project.level}</Link> / {project.name}
      </p>
      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.summary}>{project.seoDescription}</p>

      <div className={styles.badgeRow}>
        <Badge variant="level">{LEVEL_LABELS[project.level]}</Badge>
        <Badge variant="tag">{project.tag}</Badge>
        {project.personas.map((persona) => (
          <Badge key={persona} variant="persona">
            {personaLabels[persona]}
          </Badge>
        ))}
      </div>

      <MarkdownContent markdown={markdown} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.name,
          description: project.seoDescription,
          url: canonicalUrl,
          datePublished: CONTENT_PUBLISHED_DATE,
          author: {
            "@type": "Organization",
            name: SITE_NAME,
          },
          educationalLevel: project.level,
          keywords: [project.tag, ...project.personas].join(", "),
        }}
      />
    </div>
  );
}
