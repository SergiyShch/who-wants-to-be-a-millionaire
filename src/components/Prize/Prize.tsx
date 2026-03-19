import HexShape from "@/components/HexShape/HexShape";
import styles from "./Prize.module.css";

type PrizeVariant = "default" | "passed" | "guaranteed";

interface PrizeProps {
  variant?: PrizeVariant;
  amount: string;
  className?: string;
}

export default function Prize({
  variant = "default",
  amount,
  className,
}: PrizeProps) {
  const classes = [styles.prize, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <HexShape className={styles.hexSvg} pathClassName={styles.hexPath} />
      <span className={styles.content}>{amount}</span>
    </div>
  );
}
