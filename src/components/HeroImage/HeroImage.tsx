import { getImageProps } from "next/image";

export default function HeroImage() {
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
    <picture>
      <source srcSet={mobileSrcSet} media="(max-width: 768px)" />
      <source srcSet={desktopSrcSet} media="(min-width: 769px)" />
      <img {...desktopProps} alt="Thumbs up hand" />
    </picture>
  );
}
