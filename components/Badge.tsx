import styles from "./Badge.module.css";

type BadgeVariant = "level" | "tag" | "persona";

export function Badge({
  variant,
  children,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
}) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
