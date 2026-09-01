import { buildOgImage, OG_SIZE } from "@/lib/og";
import { homeCopy } from "@/lib/seo-copy";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = homeCopy.title;
export const dynamic = "force-static";

export default function Image() {
  return buildOgImage({
    eyebrow: "start.fastorial.dev",
    title: "Find a Coding Project Worth Finishing",
    description: "Picked for your experience level and your background.",
  });
}
