import type { Metadata } from "next";
import { ProductsQuerySchema } from "@/lib/types";
import {
  getFilterOptions,
  getProductsPage,
} from "@/server/queries/product-list";
import { ProductsFilters } from "@/components/store/filters";
import { ProductCard } from "@/components/store/product-card";
import { Pager } from "@/components/shared/pagination";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo completo de productos de pádel.",
  alternates: { canonical: "/productos" },
};

type Props = Readonly<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>;

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const normalize = (v: unknown) =>
    typeof v === "string" && v !== "" && v !== "__all__" ? v : undefined;

  const parsed = ProductsQuerySchema.parse({
    page: sp.page,
    brand: normalize(sp.brand),
    category: normalize(sp.category),
    minPrice:
      typeof sp.minPrice === "string" && sp.minPrice !== ""
        ? sp.minPrice
        : undefined,
    maxPrice:
      typeof sp.maxPrice === "string" && sp.maxPrice !== ""
        ? sp.maxPrice
        : undefined,
  });

  const [options, pageData] = await Promise.all([
    getFilterOptions(),
    getProductsPage(parsed),
  ]);

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            {pageData.total} resultado{pageData.total === 1 ? "" : "s"}
          </p>
        </div>
        <div className="md:hidden">
          <ProductsFilters options={options} />
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <ProductsFilters options={options} className="sticky top-20" />
        </aside>

        <div className="space-y-6">
          {pageData.products.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay productos con esos filtros.
            </p>
          ) : (
            <ul className="grid gap-4 auto-rows-fr sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageData.products.map((p) => (
                <li key={p.id} className="h-full">
                  <ProductCard
                    name={p.name}
                    brand={p.brand}
                    href={`/productos/${p.slug}`}
                    imageUrl={p.imageUrl}
                    imageAlt={p.imageAlt}
                    priceCents={p.priceCents}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-center">
            <Pager currentPage={parsed.page} totalPages={pageData.totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
}
