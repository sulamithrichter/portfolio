import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sulamithrichter.ch"),
  title: {
    default: "Sulamith Richter — Web-Apps · KI-Integration · Automatisierung",
    template: "%s · Sulamith Richter",
  },
  description:
    "Freelance-Entwicklerin aus Basel/Muttenz. Massgeschneiderte Web-Applikationen und KI-Lösungen für Schweizer KMUs – schnell, sauber und wartbar.",
  applicationName: "Sulamith Richter — Portfolio",
  authors: [{ name: "Sulamith Richter" }],
  creator: "Sulamith Richter",
  keywords: [
    "Webentwicklung",
    "KMU Schweiz",
    "Freelancer Basel",
    "Next.js",
    "KI-Integration",
    "Automatisierung",
    "Web-App",
  ],
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://sulamithrichter.ch",
    siteName: "Sulamith Richter",
    title: "Sulamith Richter — Software, die Prozesse vereinfacht.",
    description:
      "Web-Apps, KI-Integration und Automatisierung für Schweizer KMUs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sulamith Richter — Software, die Prozesse vereinfacht.",
    description:
      "Web-Apps, KI-Integration und Automatisierung für Schweizer KMUs.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
