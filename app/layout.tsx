import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "CommercePrompt Atlas — E-commerce GPT Image 2 Prompts",
    description: "A multilingual, daily-updated library of production-ready GPT Image 2 prompts for every e-commerce industry and platform.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "CommercePrompt Atlas",
      description: "Building the world’s largest e-commerce prompt library.",
      images: [{ url: "/og.png", width: 1672, height: 942, alt: "CommercePrompt Atlas" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "CommercePrompt Atlas",
      description: "15,000+ prompt target · 16 languages · Updated daily",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
