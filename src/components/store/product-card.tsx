import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = Readonly<{
  name: string;
  brand: string;
  href: `/${string}`;
  imageUrl?: string | null;
  priceCents: number;
}>;

export function ProductCard({
  name,
  brand,
  href,
  imageUrl,
  priceCents,
}: Props) {
  const price = (priceCents / 100).toFixed(2);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-base">{name}</CardTitle>
        <p className="text-xs text-muted-foreground">{brand}</p>
      </CardHeader>
      <CardContent className="aspect-[4/3]">
        {/* Día 4: next/image con sizes responsivos; de momento un contenedor */}
        <div className="h-full w-full rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
          {imageUrl ? "Imagen" : "Sin imagen"}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="font-medium">{price} €</span>
        <Link href={href} className="text-sm text-primary hover:underline">
          Ver
        </Link>
      </CardFooter>
    </Card>
  );
}
