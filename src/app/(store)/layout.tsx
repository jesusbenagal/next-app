import { Container } from "@/components/shared/container";

export default function StoreLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <Container className="py-8">{children}</Container>;
}
