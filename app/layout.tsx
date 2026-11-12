import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { siteDescription, siteName } from "@/data/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <Navbar />
        <main id="top">{children}</main>
      </body>
    </html>
  );
}
