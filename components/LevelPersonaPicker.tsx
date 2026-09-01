"use client";

import { useState } from "react";
import Link from "next/link";
import type { Level, Persona } from "@/lib/types";
import styles from "./LevelPersonaPicker.module.css";

const LEVEL_OPTIONS: { value: Level; label: string; blurb: string }[] = [
  {
    value: "beginner",
    label: "Beginner",
    blurb: "Comfortable with basic syntax, ready for your first real build.",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    blurb: "Built a few things already, ready for real-time, auth, or infra.",
  },
  {
    value: "advanced",
    label: "Advanced",
    blurb: "Ready for systems-level complexity and production-grade concerns.",
  },
];

const PERSONA_OPTIONS: { value: Persona; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "fresher", label: "Fresher" },
  { value: "qa-to-dev", label: "QA-to-Dev" },
  { value: "other", label: "Self-Taught / Other" },
];

export function LevelPersonaPicker() {
  const [level, setLevel] = useState<Level | null>(null);

  return (
    <div className={styles.picker}>
      <section className={styles.step}>
        <h2 className={styles.stepTitle}>1. What&rsquo;s your experience level?</h2>
        <div className={styles.optionGrid} role="group" aria-label="Experience level">
          {LEVEL_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.optionButton} ${
                level === option.value ? styles.optionButtonActive : ""
              }`}
              aria-pressed={level === option.value}
              onClick={() => setLevel(option.value)}
            >
              <span className={styles.optionLabel}>{option.label}</span>
              <span className={styles.optionBlurb}>{option.blurb}</span>
            </button>
          ))}
        </div>
      </section>

      {level && (
        <section className={styles.step}>
          <h2 className={styles.stepTitle}>2. What&rsquo;s your background?</h2>
          <div className={styles.optionGrid} role="group" aria-label="Background">
            {PERSONA_OPTIONS.map((option) => (
              <Link
                key={option.value}
                href={`/filter/${level}/${option.value}`}
                className={styles.optionButton}
              >
                <span className={styles.optionLabel}>{option.label}</span>
              </Link>
            ))}
          </div>
          <Link href={`/filter/${level}`} className={styles.skipLevelLink}>
            Skip this — show me every {level} project →
          </Link>
        </section>
      )}

      <Link href="/all" className={styles.skipAllLink}>
        Skip, show me everything →
      </Link>
    </div>
  );
}
