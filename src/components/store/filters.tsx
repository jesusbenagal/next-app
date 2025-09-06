"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FilterOptions } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Readonly<{ options: FilterOptions; className?: string }>;
type State = Readonly<{
  brand: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}>;

const ALL = "__all__" as const;

export function ProductsFilters({ options, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [state, setState] = useState<State>({
    brand: sp.get("brand") ?? ALL,
    category: sp.get("category") ?? ALL,
    minPrice: sp.get("minPrice") ?? "",
    maxPrice: sp.get("maxPrice") ?? "",
  });

  // Sincroniza estado cuando cambia la URL
  useEffect(() => {
    setState({
      brand: sp.get("brand") ?? ALL,
      category: sp.get("category") ?? ALL,
      minPrice: sp.get("minPrice") ?? "",
      maxPrice: sp.get("maxPrice") ?? "",
    });
  }, [sp]);

  const appliedCount = useMemo(() => {
    let n = 0;
    if (state.brand !== ALL) n++;
    if (state.category !== ALL) n++;
    if (state.minPrice) n++;
    if (state.maxPrice) n++;
    return n;
  }, [state]);

  const apply = () => {
    const q = new URLSearchParams();
    if (state.brand !== ALL) q.set("brand", state.brand);
    if (state.category !== ALL) q.set("category", state.category);
    if (state.minPrice) q.set("minPrice", state.minPrice);
    if (state.maxPrice) q.set("maxPrice", state.maxPrice);
    router.push(q.toString() ? `${pathname}?${q.toString()}` : pathname);
  };

  const reset = () => {
    setState({ brand: ALL, category: ALL, minPrice: "", maxPrice: "" });
    router.push(pathname);
  };

  const Content = (
    <div className={cn("grid gap-4", className)}>
      {/* Marca */}
      <div className="grid gap-2">
        <Label>Marca</Label>
        <Select
          value={state.brand}
          onValueChange={(v) => setState((s) => ({ ...s, brand: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent position="popper" side="bottom" align="start">
            <SelectItem value={ALL}>Todas</SelectItem>
            {options.brands.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categoría */}
      <div className="grid gap-2">
        <Label>Categoría</Label>
        <Select
          value={state.category}
          onValueChange={(v) => setState((s) => ({ ...s, category: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent position="popper" side="bottom" align="start">
            <SelectItem value={ALL}>Todas</SelectItem>
            {options.categories.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Precio */}
      <div className="grid gap-2">
        <Label>Precio (€)</Label>
        <div className="flex items-center gap-2">
          <Input
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={`Min (${options.price.min})`}
            value={state.minPrice}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                minPrice: e.target.value.replace(/[^\d.]/g, ""),
              }))
            }
          />
          <span className="text-muted-foreground">—</span>
          <Input
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={`Max (${options.price.max})`}
            value={state.maxPrice}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                maxPrice: e.target.value.replace(/[^\d.]/g, ""),
              }))
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={apply} className="flex-1">
          Aplicar
        </Button>
        <Button variant="outline" onClick={reset}>
          Limpiar
        </Button>
        {appliedCount > 0 && (
          <Badge variant="secondary" className="ml-auto">
            {appliedCount}
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">{Content}</div>

      {/* Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="md:hidden">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros{" "}
            {appliedCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {appliedCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
          </SheetHeader>
          <div className="mt-4">{Content}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
