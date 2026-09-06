import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kabir Narula — Engineering Ledger",
  description:
    "Backend-leaning full-stack engineer in Toronto. Five systems — job aggregation pipelines, spatial version control for 3D assets, spaced-repetition scheduling, privacy-conscious ML inference, realtime collaboration — argued from their source code.",
  keywords: [
    "Kabir Narula",
    "software engineer",
    "backend",
    "full-stack",
    "Toronto",
    "Next.js",
    "PostgreSQL",
    "data pipelines",
  ],
  authors: [{ name: "Kabir Narula", url: "https://github.com/Kabir-Narula" }],
  openGraph: {
    title: "Kabir Narula — Engineering Ledger",
    description:
      "Five systems, argued from their source code. Pipelines, queues, schemas with real constraints, and the products around them.",
    type: "website",
    locale: "en_CA",
    siteName: "Kabir Narula — Engineering Ledger",
  },
  twitter: {
    card: "summary",
    title: "Kabir Narula — Engineering Ledger",
    description:
      "Five systems, argued from their source code. Pipelines, queues, schemas with real constraints, and the products around them.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#292420" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-body">
        {/* Blocking theme init — sets data-theme before first paint so
            a saved/dark preference never flashes the light register. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=window.localStorage.getItem("kn-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`}
        </Script>
        <a
          href="#ledger"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-[12px] focus:text-paper"
        >
          Skip to selected work
        </a>
        {children}
      </body>
    </html>
  );
}
