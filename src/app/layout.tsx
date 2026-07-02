import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Learn to Code - Interactive Rust Learning Platform",
    template: "%s | Learn to Code"
  },
  description: "Interactive Rust learning platform with real browser-based compiler, instant feedback, and guided curriculum. Build coding muscle memory without local setup.",
  keywords: ["rust programming", "learn rust", "interactive coding", "rust tutorial", "programming education", "online compiler"],
  authors: [{ name: "Learn to Code" }],
  creator: "Learn to Code",
  publisher: "Learn to Code",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learntocode.notcodesid.com",
    title: "Learn to Code - Interactive Rust Learning Platform",
    description: "Interactive Rust learning platform with real browser-based compiler, instant feedback, and guided curriculum.",
    siteName: "Learn to Code",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn to Code - Interactive Rust Learning Platform",
    description: "Interactive Rust learning platform with real browser-based compiler, instant feedback, and guided curriculum.",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">
        <SessionProvider>{children}</SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
