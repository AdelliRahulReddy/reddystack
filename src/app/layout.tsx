import "../styles/globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CountrySuggestion from "@/components/country/CountrySuggestion";
import {
  siteConfig,
  siteSeo,
  websiteSchema,
  organizationSchema,
} from "@/data/siteConfig";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { DM_Sans, JetBrains_Mono } from "next/font/google";

const sora = localFont({
  src: '../../public/assets/fonts/Sora-SemiBold.woff2',
  weight: '600',
  display: 'swap',
  variable: '--font-brand-sora',
});


const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});



const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});



export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteSeo.defaultTitle,
  description: siteSeo.defaultDescription,
  applicationName: siteSeo.siteName,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.ownerName, url: siteConfig.siteUrl }],
  creator: siteConfig.ownerName,
  publisher: siteSeo.siteName,
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
    url: siteConfig.siteUrl,
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    siteName: siteSeo.siteName,
    images: [
      {
        url: `${siteConfig.siteUrl}${siteSeo.ogImagePath}`,
        width: 1200,
        height: 630,
        alt: siteSeo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    creator: siteSeo.creatorHandle,
    images: [`${siteConfig.siteUrl}${siteSeo.ogImagePath}`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Site-level JSON-LD. Page/entity schemas are injected by their routes. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, organizationSchema]) }}
        />
      </head>
      <body suppressHydrationWarning>
        <GoogleAnalytics />
        {children}
        <CountrySuggestion />
      </body>
    </html>
  );
}

