import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import "../globals.css";

// Types
type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
    // alternates: {
    //   canonical:
    //   },
    // },
    keywords: t.raw("keywords"),
    authors: [
      { name: "Markéta Grácová", url: "https://mywildiary.netlify.app/" },
    ],
    metadataBase: new URL("https://mywildiary.netlify.app/"),

    openGraph: {
      title: t("openGraph-title"),
      description: t("openGraph-description"),
      url: "https://mywildiary.netlify.app/",
      siteName: "Markéta Grácová",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("openGraph-alt"),
        },
      ],
      locale: "cs_CZ",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("twitter-title"),
      description: t("twitter-description"),
      images: ["/og-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      noarchive: false,
      nosnippet: false,
      notranslate: false,
    },

    icons: {
      icon: "/favicon.ico",
    },
  };
}

/**
 * ROOT LAYOUT
 */
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
