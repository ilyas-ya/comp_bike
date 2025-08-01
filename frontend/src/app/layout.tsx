import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://comp.bike"),
  title: "Comp.bike - Ultimate Bike Component Compatibility Checker",
  description:
    "Check bike component compatibility instantly with our AI-powered system. Avoid costly mistakes and build your perfect bike with confidence. Free compatibility checks, expert recommendations, and comprehensive database.",
  keywords: [
    "bike component compatibility",
    "bicycle parts compatibility",
    "bike building",
    "component checker",
    "bike compatibility tool",
    "cycling parts",
    "bike assembly",
    "component matching",
  ],
  authors: [{ name: "Comp.bike Team" }],
  creator: "Comp.bike",
  publisher: "Comp.bike",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://comp.bike",
    title: "Comp.bike - Ultimate Bike Component Compatibility Checker",
    description:
      "Check bike component compatibility instantly. Build your perfect bike with confidence using our AI-powered compatibility system.",
    siteName: "Comp.bike",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Comp.bike - Bike Component Compatibility Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comp.bike - Ultimate Bike Component Compatibility Checker",
    description:
      "Check bike component compatibility instantly. Build your perfect bike with confidence.",
    images: ["/twitter-image.jpg"],
    creator: "@compbike",
  },
  alternates: {
    canonical: "https://comp.bike",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="http://localhost:8000" />
        <link rel="dns-prefetch" href="http://localhost:8000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />

        {/* Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
