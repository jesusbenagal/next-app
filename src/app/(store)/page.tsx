// src/app/(store)/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Explora palas, zapatillas, bolas y más.",
  alternates: { canonical: "/" },
};

export default function StoreHome() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Catálogo</h1>
      <p className="text-muted-foreground">
        Explora palas, zapatillas, bolas y más.
      </p>
    </section>
  );
}
