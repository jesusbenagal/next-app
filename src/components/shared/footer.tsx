import { Container } from "@/components/shared/container";

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="py-3 text-center text-xs text-muted-foreground leading-tight">
        <p>
          © {new Date().getFullYear()} PadelPro. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
