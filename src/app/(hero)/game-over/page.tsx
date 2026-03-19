"use client";

import Link from "@/components/Link";
import { useGameContext } from "@/context/GameContext";
import layout from "@/styles/heroLayout.module.css";
import styles from "./page.module.css";

export default function GameOverPage() {
  const { earned } = useGameContext();

  return (
    <>
      <h1 className={layout.heading}>
        <span className={styles.subtitle}>Total score:</span>
        {earned} earned
      </h1>
      <Link href="/game">Try again</Link>
    </>
  );
}
