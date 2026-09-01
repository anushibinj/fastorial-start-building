import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { getAllProjects } from "@/lib/projects";
import { allProjectsCopy } from "@/lib/seo-copy";
import { SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: allProjectsCopy.title,
  description: allProjectsCopy.description,
  alternates: { canonical: "/all" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/all`,
    title: allProjectsCopy.title,
    description: allProjectsCopy.description,
  },
  twitter: {
    card: "summary_large_image",
    title: allProjectsCopy.title,
    description: allProjectsCopy.description,
  },
};

export default function AllProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{allProjectsCopy.title}</h1>
      <p className={styles.lede}>{allProjectsCopy.description}</p>
      <ProjectList projects={projects} showLevel />
    </div>
  );
}
