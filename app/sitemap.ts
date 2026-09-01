import type { MetadataRoute } from "next";
import { getAllProjects, getLevelsInUse, getPersonasForLevel } from "@/lib/projects";
import { CONTENT_PUBLISHED_DATE, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_PUBLISHED_DATE);
  const levels = getLevelsInUse();
  const projects = getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/all`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];

  const levelRoutes: MetadataRoute.Sitemap = levels.map((level) => ({
    url: `${SITE_URL}/filter/${level}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const comboRoutes: MetadataRoute.Sitemap = levels.flatMap((level) =>
    getPersonasForLevel(level).map((persona) => ({
      url: `${SITE_URL}/filter/${level}/${persona}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/project/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...levelRoutes, ...comboRoutes, ...projectRoutes];
}
