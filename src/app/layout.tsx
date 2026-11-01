import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { photos, site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Mediterranean Seafront Restaurant, Beach Club & Sunset Bar`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["Mediterranean restaurant", "beach club", "seafood restaurant", "sunset bar", "seafront dining", site.name],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    images: [{ url: `${photos.hero.src}?auto=format&fit=crop&w=1200&h=630&q=80`, width: 1200, height: 630, alt: photos.hero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [`${photos.hero.src}?auto=format&fit=crop&w=1200&h=630&q=80`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#173B4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
