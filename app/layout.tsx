import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhare Foundation — Creating Green, Living, Biodiverse Karnataka",
  description:
    "Dhare Foundation is working to plant 5 crore native saplings across Karnataka through Miyawaki forests, tank rejuvenation, and community-led ecological restoration.",
  keywords: [
    "Dhare Foundation",
    "Green Ring Bengaluru",
    "Miyawaki forest",
    "native plantation Karnataka",
    "ecological restoration",
    "KSLSA MoU",
    "biodiversity conservation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
