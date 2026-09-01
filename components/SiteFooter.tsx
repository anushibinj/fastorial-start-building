import Link from "next/link";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>A project picker for the fastorial mentorship community.</span>
        <Link href="/all">Browse every project</Link>
      </div>
    </footer>
  );
}
