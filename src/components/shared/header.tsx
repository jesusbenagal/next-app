"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-14 items-center justify-between">
        {/* Izquierda: Burger (mobile) + Logo */}
        <div className="flex items-center gap-2">
          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">{siteConfig.name}</SheetTitle>
              </SheetHeader>

              <nav aria-label="Principal móvil" className="mt-4 space-y-1">
                {siteConfig.nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="font-semibold tracking-tight"
          >
            {siteConfig.name}
          </Link>
        </div>

        {/* Centro: navegación desktop */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "px-3 py-2 text-sm",
                          active
                            ? "rounded-md bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Derecha: acciones */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Carrito */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir carrito">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Carrito</SheetTitle>
              </SheetHeader>
              <div className="py-4 text-sm text-muted-foreground">
                Tu carrito está vacío.
              </div>
            </SheetContent>
          </Sheet>

          {/* Usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Cuenta">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="/signin">Iniciar sesión</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </header>
  );
}
