import { buildOgImage, OG_SIZE } from "@/lib/og";
import { allProjectsCopy } from "@/lib/seo-copy";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = allProjectsCopy.title;
export const dynamic = "force-static";

export default function Image() {
  return buildOgImage({
    eyebrow: "start.fastorial.dev / all",
    title: allProjectsCopy.title,
    description: "13 project ideas, badge-tagged by level.",
  });
}
