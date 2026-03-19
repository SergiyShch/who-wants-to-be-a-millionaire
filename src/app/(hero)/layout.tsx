"use client";

import { usePathname } from "next/navigation";
import HeroImage from "@/components/HeroImage/HeroImage";
import layout from "@/styles/heroLayout.module.css";

export default function HeroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={`${layout.main} ${isHome ? layout.gradient : ""}`}>
      <div className={layout.container}>
        <div className={layout.imageSection}>
          <HeroImage />
        </div>

        <div className={layout.contentSection}>{children}</div>
      </div>
    </main>
  );
}
