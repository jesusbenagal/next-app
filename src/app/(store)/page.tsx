import type { Metadata } from "next";
import { getFeaturedProducts } from "@/server/queries/products";
import { ProductCard } from "@/components/store/product-card";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Explora palas, zapatillas, bolas y más.",
  alternates: { canonical: "/" },
};

export default async function StoreHome() {
  const products = await getFeaturedProducts(12);

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Catálogo</h1>
        <p className="text-muted-foreground">
          Explora palas, zapatillas, bolas y más.
        </p>
      </header>

      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aún no hay productos.</p>
      ) : (
        <ul
          className="
            grid gap-4
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard
                name={p.name}
                brand={p.brand}
                href={`/productos/${p.slug}`}
                imageUrl={p.imageUrl}
                priceCents={p.priceCents}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
