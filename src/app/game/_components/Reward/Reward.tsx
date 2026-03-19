import HexShape from "@/components/HexShape/HexShape";
import styles from "./Reward.module.css";

type RewardVariant = "default" | "passed" | "guaranteed";

interface RewardProps {
  variant?: RewardVariant;
  amount: string;
  className?: string;
}

export default function Reward({
  variant = "default",
  amount,
  className,
}: RewardProps) {
  const classes = [styles.reward, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <HexShape className={styles.hexSvg} pathClassName={styles.hexPath} />
      <span className={styles.content}>{amount}</span>
    </div>
  );
}
