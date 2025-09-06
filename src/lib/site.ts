export type NavItem = Readonly<{
  label: string;
  href: "/" | `/${string}`;
}>;

export type SiteConfig = Readonly<{
  name: string;
  tagline: string;
  nav: readonly NavItem[];
}>;

export const siteConfig: SiteConfig = {
  name: "PadelPro",
  tagline: "Tu tienda de pádel profesional",
  nav: [
    { label: "Tienda", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Admin", href: "/dashboard" },
  ] as const,
} as const;
