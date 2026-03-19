import { getImageProps } from "next/image";
import Link from "@/components/Link";
import styles from "./page.module.css";

export default function Home() {
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
          <h1 className={styles.heading}>Who wants to be a millionaire?</h1>
          <Link href="/game">Start</Link>
        </div>
      </div>
    </main>
  );
}
