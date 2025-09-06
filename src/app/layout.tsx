import type { Metadata } from "next";
import "@/app/globals.css";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "@/components/theme/provider";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground font-sans antialiased flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>{" "}
          {/* <- antes: min-h-[70dvh] */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
