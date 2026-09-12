import "../styles/index.scss";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ThemeProvider from "@/components/provider/ThemeProvider";
import { VideoProvider } from "@/provider/VideoProvider";
import {
  siteConfig,
  siteSeo,
  websiteSchema,
} from "@/data/siteConfig";
import type { Metadata } from "next";

import {
  Abril_Fatface,
  DM_Sans,
  EB_Garamond,
  Kufam,
  Poppins,
  Playfair_Display,
} from "next/font/google";

// all font configure
const abril = Abril_Fatface({
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
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-garamond",
});

const kufam = Kufam({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kufam",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
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
        ${abril.variable}
        ${dmSans.variable}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="scroll-smooth">
        <GoogleAnalytics />
        <ThemeProvider>
          <VideoProvider>{children}</VideoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

