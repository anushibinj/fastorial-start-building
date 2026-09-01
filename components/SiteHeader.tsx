import Link from "next/link";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          fast<span>orial</span> / start
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/all" className={styles.navLink}>
            All projects
          </Link>
        </nav>
      </div>
    </header>
  );
}
