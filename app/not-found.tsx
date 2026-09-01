import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>That project doesn&rsquo;t exist. Yet.</h1>
      <p className={styles.lede}>
        The page you&rsquo;re looking for isn&rsquo;t in the fastorial project list — it
        might have moved, or the link might be off.
      </p>
      <Link href="/all" className={styles.link}>
        Browse every project →
      </Link>
    </div>
  );
}
