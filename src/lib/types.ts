import { z } from "zod";

// page y price vienen por querystring → normalizamos a números seguros
export const ProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  brand: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  // en euros en la URL (p. ej. 50 → 50 €)
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
});
export type ProductsQuery = z.infer<typeof ProductsQuerySchema>;

// respuesta para la vista (DTOs estrictos)
export type ProductCardDTO = Readonly<{
  id: string;
  name: string;
  slug: string;
  brand: string;
  imageUrl: string | null;
  imageAlt: string | null;
  priceCents: number; // min variant
}>;

export type FilterOption = Readonly<{ label: string; value: string }>;
export type FilterOptions = Readonly<{
  brands: readonly FilterOption[];
  categories: readonly FilterOption[];
  // precios en euros para el slider/inputs
  price: Readonly<{ min: number; max: number }>;
}>;
