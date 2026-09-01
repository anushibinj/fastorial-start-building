import Link from "next/link";
import type { Project } from "@/lib/types";
import { Badge } from "./Badge";
import styles from "./ProjectList.module.css";

const LEVEL_LABELS: Record<Project["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function ProjectList({
  projects,
  showLevel = false,
}: {
  projects: Project[];
  showLevel?: boolean;
}) {
  if (projects.length === 0) {
    return <p className={styles.empty}>No projects match this combination yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.slug} className={styles.item}>
          <Link href={`/project/${project.slug}`} className={styles.link}>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.description}>{project.seoDescription}</p>
            <div className={styles.badgeRow}>
              {showLevel && <Badge variant="level">{LEVEL_LABELS[project.level]}</Badge>}
              <Badge variant="tag">{project.tag}</Badge>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
