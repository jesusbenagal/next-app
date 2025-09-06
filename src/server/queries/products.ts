import { prisma } from "@/lib/db";

export type ProductCardDTO = Readonly<{
  id: string;
  name: string;
  slug: string;
  brand: string;
  imageUrl: string | null;
  priceCents: number; // min price
}>;

export async function getFeaturedProducts(
  limit = 8
): Promise<readonly ProductCardDTO[]> {
  const products = await prisma.product.findMany({
    where: { active: true },
    take: limit,
    include: {
      brand: { select: { name: true } },
      images: { select: { url: true }, take: 1 },
      variants: {
        select: { priceCents: true },
        orderBy: { priceCents: "asc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    brand: p.brand.name,
    imageUrl: p.images[0]?.url ?? null,
    priceCents: p.variants[0]?.priceCents ?? 0,
  }));
}
