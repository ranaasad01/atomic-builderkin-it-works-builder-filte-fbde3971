import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "builderkin — equity swaps for independent AI builders",
    template: "%s | builderkin",
  },
  description:
    "builderkin is where independent builders swap equity slices, cash, or promotion deals in their projects via real legal paperwork. Delaware LLC and UK Ltd supported.",
  keywords: [
    "equity swap",
    "indie builders",
    "project swap",
    "Delaware LLC",
    "UK Ltd",
    "builder deals",
    "AI builders",
  ],
  authors: [{ name: "builderkin" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://builderkin.com",
    siteName: "builderkin",
    title: "builderkin — equity swaps for independent AI builders",
    description:
      "Swap equity slices, cash, or promotion deals in your projects. Real legal paperwork. No tokens, no smart contracts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "builderkin — equity swaps for independent AI builders",
    description:
      "Swap equity slices, cash, or promotion deals in your projects. Real legal paperwork. No tokens, no smart contracts.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#F5F1EA" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="bg-[#F5F1EA] text-[#16130F] antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}