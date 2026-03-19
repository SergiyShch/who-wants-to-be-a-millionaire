"use client";

import { getImageProps } from "next/image";
import Link from "@/components/Link";
import { useGameContext } from "@/context/GameContext";
import styles from "./page.module.css";

export default function GameOverPage() {
  const { earned } = useGameContext();

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    src: "/images/hand_mobile.png",
    alt: "Thumbs up hand",
    width: 288,
    height: 192,
    unoptimized: true,
  });

  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({
    src: "/images/hand.png",
    alt: "Thumbs up hand",
    width: 624,
    height: 367,
    unoptimized: true,
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <picture>
            <source srcSet={mobileSrcSet} media="(max-width: 768px)" />
            <source srcSet={desktopSrcSet} media="(min-width: 769px)" />
            <img {...desktopProps} alt="Thumbs up hand" />
          </picture>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.subtitle}>Total score:</h2>
          <h1 className={styles.score}>{earned} earned</h1>
          <Link href="/game">Try again</Link>
        </div>
      </div>
    </main>
  );
}
