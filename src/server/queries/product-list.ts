import { prisma } from "@/lib/db";
import { TAGS } from "@/lib/cache";
import { ProductsQuery } from "@/lib/types";

const PAGE_SIZE = 12;

// Opciones de filtros (marcas, categorías, rango de precios)
export async function getFilterOptions() {
  const [brands, categories, priceAgg] = await Promise.all([
    prisma.brand.findMany({
      select: { slug: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.category.findMany({
      select: { slug: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.productVariant.aggregate({
      _min: { priceCents: true },
      _max: { priceCents: true },
    }),
  ]);

  const min = (priceAgg._min.priceCents ?? 0) / 100;
  const max = (priceAgg._max.priceCents ?? 0) / 100;

  return {
    brands: brands.map((b) => ({ label: b.name, value: b.slug })),
    categories: categories.map((c) => ({
      label: c.name,
      value: c.slug,
    })),
    price: { min, max } as const,
  } as const;
}

// Página de productos según filtros
export async function getProductsPage(query: ProductsQuery) {
  const where = {
    active: true,
    brand: query.brand ? { slug: query.brand } : undefined,
    category: query.category ? { slug: query.category } : undefined,
    variants: {
      some:
        query.minPrice != null || query.maxPrice != null
          ? {
              priceCents: {
                gte:
                  query.minPrice != null
                    ? Math.round(query.minPrice * 100)
                    : undefined,
                lte:
                  query.maxPrice != null
                    ? Math.round(query.maxPrice * 100)
                    : undefined,
              },
            }
          : undefined,
    },
  } as const;

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: {
        brand: { select: { name: true } },
        images: { select: { url: true, alt: true }, take: 1 },
        variants: {
          select: { priceCents: true },
          orderBy: { priceCents: "asc" },
          take: 1,
        },
      },
      orderBy: [{ createdAt: "desc" }, { name: "asc" }],
      skip: (query.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const products = items.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    brand: p.brand.name,
    imageUrl: p.images[0]?.url ?? null,
    imageAlt: p.images[0]?.alt ?? null,
    priceCents: p.variants[0]?.priceCents ?? 0,
  }));

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return { products, total, totalPages, pageSize: PAGE_SIZE } as const;
}

// Etiquetas para revalidación por tag (las usaremos en Admin)
export const PRODUCT_TAGS = [
  TAGS.products,
  TAGS.brands,
  TAGS.categories,
] as const;
