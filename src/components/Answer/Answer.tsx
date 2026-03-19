"use client";

import { type ButtonHTMLAttributes } from "react";
import HexShape from "@/components/HexShape/HexShape";
import styles from "./Answer.module.css";

type AnswerVariant = "inactive" | "selected" | "correct" | "wrong";

interface AnswerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AnswerVariant;
  label: string;
  text: string;
}

export default function Answer({
  variant = "inactive",
  label,
  text,
  className,
  ...props
}: AnswerProps) {
  const classes = [styles.answer, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type="button" {...props}>
      <HexShape className={styles.hexSvg} pathClassName={styles.hexPath} />
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.text}>{text}</span>
      </span>
    </button>
  );
}
