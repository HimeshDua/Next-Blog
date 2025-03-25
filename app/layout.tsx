import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import React from "react";

const workSans = Work_Sans({
  subsets: ["latin-ext"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hems Directory",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        {" "}
        {/* Use the font's className */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
