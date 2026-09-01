import type { Persona } from "@/lib/types";
import { personaLabels, personaNotes } from "@/lib/seo-copy";
import styles from "./PersonaNote.module.css";

export function PersonaNote({ persona }: { persona: Persona }) {
  return (
    <aside
      className={styles.note}
      aria-label={`Note for ${personaLabels[persona]} readers`}
    >
      <span className={styles.label}>For {personaLabels[persona]}s</span>
      <p>{personaNotes[persona]}</p>
    </aside>
  );
}
