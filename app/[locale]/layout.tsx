import type { Metadata } from "next";
import { Inter, Noto_Sans_Kannada } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansKannada = Noto_Sans_Kannada({
  variable: "--font-noto-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/logos/dhare-logo-new.png",
    shortcut: "/images/logos/dhare-logo-new.png",
    apple: "/images/logos/dhare-logo-new.png",
  },
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "kn")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansKannada.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
