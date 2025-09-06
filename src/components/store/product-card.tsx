import Link from "next/link";
import Image from "next/image";
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
  imageUrl: string | null;
  imageAlt: string | null;
  priceCents: number;
}>;

export function ProductCard({
  name,
  brand,
  href,
  imageUrl,
  imageAlt,
  priceCents,
}: Props) {
  const price = (priceCents / 100).toFixed(2);

  return (
    <Card className="flex h-full flex-col">
      {/* Header + imagen clicables */}
      <Link href={href} aria-label={`${name} de ${brand}`} className="contents">
        <CardHeader className="p-4 pb-2 min-h-[76px]">
          {/* ~ 2 líneas título + 1 brand. Ajusta 72–84px si usas otra font-size/leading */}
          <CardTitle className="line-clamp-2 text-base leading-tight">
            {name}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{brand}</p>
        </CardHeader>

        <CardContent className="relative aspect-[4/3] px-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt ?? name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              className="rounded-md object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
              Sin imagen
            </div>
          )}
        </CardContent>
      </Link>

      {/* Footer siempre pegado abajo */}
      <CardFooter className="mt-auto justify-between p-4 pt-2">
        <span className="font-medium">{price} €</span>
        <Link href={href} className="text-sm text-primary hover:underline">
          Ver
        </Link>
      </CardFooter>
    </Card>
  );
}
