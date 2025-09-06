import type { Metadata } from "next";
import { siteConfig } from "./site";

export const absoluteUrl = (path: "/" | `/${string}`): string =>
  new URL(path, siteConfig.siteUrl).toString();

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "es_ES",
  },
  twitter: { card: "summary_large_image" },
};
