export type NavItem = Readonly<{ label: string; href: "/" | `/${string}` }>;

export type SiteConfig = Readonly<{
  name: string;
  tagline: string;
  siteUrl: string;
  nav: readonly NavItem[];
}>;

export const siteConfig: SiteConfig = {
  name: "PadelPro",
  tagline: "Tu tienda de pádel profesional",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Tienda", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Admin", href: "/dashboard" },
  ] as const,
} as const;
