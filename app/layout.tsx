import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";

import { detectLocale } from "@/lib/i18n/detect-locale";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evo-ai.example"),
  title: "EVO | Evolutionary Virtual Operations",
  description:
    "EVO builds premium AI assistants, conversational agents, and automation systems for modern businesses.",
  openGraph: {
    title: "EVO | Evolutionary Virtual Operations",
    description:
      "Premium AI assistants, conversational agents, and automation systems for modern businesses.",
    url: "https://evo-ai.example",
    siteName: "EVO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EVO | Evolutionary Virtual Operations",
    description:
      "Premium AI assistants, conversational agents, and automation systems for modern businesses.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const locale = detectLocale(headerStore.get("accept-language"));

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} bg-[var(--background)] font-[family-name:var(--font-body)] text-[var(--foreground)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
