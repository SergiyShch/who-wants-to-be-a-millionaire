import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GameProvider } from "@/context/GameContext";
import "../styles/globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who Wants to Be a Millionaire",
  description: "Who Wants to Be a Millionaire game",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
