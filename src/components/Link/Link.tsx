import NextLink from "next/link";
import { type AnchorHTMLAttributes } from "react";
import styles from "./Link.module.css";

type LinkProps = {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export default function Link({
  href,
  className,
  children,
  ...props
}: LinkProps) {
  const classes = [styles.link, className].filter(Boolean).join(" ");

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}
