import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { MediaVaultProvider } from "@/lib/mediaVault";
import { brand, siteOrigin } from "@/lib/brand";
import "./globals.css";

// If Supabase is configured, expose the console-managed favicon slot as an
// additional browser icon; the bundled app/icon.svg is the reliable fallback.
const storeUrl = process.env.NEXT_PUBLIC_STORE_URL;
const managedFavicon = storeUrl
  ? `${storeUrl.replace(/\/$/, "")}/storage/v1/object/public/brand-media/favicon`
  : null;

const display = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: `${brand.legalName} — ${brand.tagline}`,
    template: `%s · ${brand.shortName}`,
  },
  description: brand.positioning,
  keywords: [
    "medical equipment supplier",
    "wheelchairs",
    "mobility aids",
    "diabetic care",
    "orthopedic braces",
    "Columbus Ohio",
  ],
  openGraph: {
    type: "website",
    url: siteOrigin,
    siteName: brand.legalName,
    title: `${brand.legalName} — ${brand.tagline}`,
    description: brand.positioning,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.legalName,
    description: brand.tagline,
  },
  alternates: { canonical: siteOrigin },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      ...(managedFavicon ? [{ url: managedFavicon }] : []),
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B57C2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <MediaVaultProvider>{children}</MediaVaultProvider>
      </body>
    </html>
  );
}
