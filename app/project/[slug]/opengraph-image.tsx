import { buildOgImage, OG_SIZE } from "@/lib/og";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return buildOgImage({
    eyebrow: `start.fastorial.dev / project`,
    title: project?.name ?? "Project Not Found",
    description: project?.seoDescription,
  });
}
