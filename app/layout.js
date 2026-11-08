import { Urbanist, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { organization } from "@/lib/schema";
import { SITE } from "@/lib/content";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = "Intellobyte | Software, Web & App Development in Pune, India";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | Intellobyte" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["software development company Pune", "web development Pune", "custom software development", "mobile app development India", "UI/UX design", "AI automation", "Next.js development", "Intellobyte"],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_IN", url: "/", title, description: SITE.description, images: [{ url: "/img/og.png", width: 1200, height: 630, alt: "Intellobyte Tech Solution" }] },
  twitter: { card: "summary_large_image", title, description: SITE.description, images: ["/img/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/img/logo.png", apple: "/img/logo.png" },
  other: { "geo.region": "IN-MH", "geo.placename": "Pune" },
};

export const viewport = { themeColor: "#edecec", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${inter.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <JsonLd data={organization} />
        {children}
      </body>
    </html>
  );
}
