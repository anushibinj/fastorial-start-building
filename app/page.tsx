import type { Metadata } from "next";
import { LevelPersonaPicker } from "@/components/LevelPersonaPicker";
import { homeCopy } from "@/lib/seo-copy";
import { SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  // No `title` here — the root layout's `default` title is already this
  // page's exact title, and setting it again would double-apply the
  // "— start.fastorial.dev" template suffix.
  description: homeCopy.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: homeCopy.title,
    description: homeCopy.description,
  },
  twitter: {
    card: "summary_large_image",
    title: homeCopy.title,
    description: homeCopy.description,
  },
};

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <p className={styles.eyebrow}>start.fastorial.dev</p>
      <h1 className={styles.title}>Find a coding project worth finishing.</h1>
      <p className={styles.lede}>
        Two quick questions — your experience level and your background — and you&rsquo;ll
        get project ideas picked for exactly where you are, not a generic list.
      </p>
      <LevelPersonaPicker />
    </div>
  );
}
