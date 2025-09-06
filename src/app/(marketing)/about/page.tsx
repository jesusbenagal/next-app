// src/app/(marketing)/about/page.tsx
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Material de pádel profesional con asesoramiento experto, envío rápido y garantías oficiales.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    sameAs: [] as string[],
    logo: absoluteUrl("/icon.png"),
  } as const;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Sobre nosotros</h1>
      <p>
        Nacimos para llevar material de pádel profesional al mejor precio, con
        asesoramiento experto.
      </p>
      <h2>Nuestros valores</h2>
      <ul>
        <li>Producto auténtico y garantía oficial.</li>
        <li>Atención técnica especializada.</li>
        <li>Envío rápido y devoluciones sencillas.</li>
      </ul>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
