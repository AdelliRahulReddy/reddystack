import "../styles/globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CountrySuggestion from "@/components/country/CountrySuggestion";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  siteConfig,
  siteSeo,
  websiteSchema,
  organizationSchema,
} from "@/data/siteConfig";
import type { Metadata } from "next";
import localFont from "next/font/local";

import {
  Abril_Fatface,
  DM_Sans,
  EB_Garamond,
  Kufam,
  JetBrains_Mono,
  Poppins,
  Playfair_Display,
} from "next/font/google";

const sora = localFont({
  src: '../../public/assets/fonts/Sora-SemiBold.woff2',
  weight: '600',
  display: 'swap',
  variable: '--font-brand-sora',
});

// all font configure
const abril = Abril_Fatface({
  preload: false,
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abril",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const garamond = EB_Garamond({
  preload: false,
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-garamond",
});

const kufam = Kufam({
  preload: false,
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kufam",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const poppins = Poppins({
  preload: false,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  preload: false,
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
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
      tp-theme="tp-theme-dark"
      suppressHydrationWarning
      className={`
        ${sora.variable}
        ${abril.variable}
        ${dmSans.variable}
        ${jetbrainsMono.variable}
        ${garamond.variable}
        ${kufam.variable}
        ${poppins.variable}
        ${playfair.variable}
      `}
    >
      <head>
        {/* Site-level JSON-LD. Page/entity schemas are injected by their routes. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, organizationSchema]) }}
        />
      </head>
      <body suppressHydrationWarning className="scroll-smooth">
        <GoogleAnalytics />
        <TooltipProvider delayDuration={200}>
          {children}
          <CountrySuggestion />
        </TooltipProvider>
      </body>
    </html>
  );
}

