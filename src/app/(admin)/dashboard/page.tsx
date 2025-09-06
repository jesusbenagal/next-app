import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de administración",
  description: "KPIs y accesos rápidos.",
  alternates: { canonical: "/dashboard" },
};

export default function AdminDashboardPage() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Panel de administración</h1>
      <p className="text-muted-foreground">KPIs y accesos rápidos.</p>
    </section>
  );
}
