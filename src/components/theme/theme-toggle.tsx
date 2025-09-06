"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Readonly<{ className?: string }>;

export function ThemeToggle({ className }: Props) {
  const { theme, setTheme } = useTheme();

  const next = theme === "dark" ? "light" : "dark";
  const icon =
    theme === "dark" ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Moon className="h-4 w-4" />
    );

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Cambiar tema"
      className={cn("rounded-full", className)}
      onClick={() => setTheme(next)}
    >
      {icon}
    </Button>
  );
}
