/* eslint-disable no-console */
import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  // Categorías
  const [palas, zapatillas, bolas] = await Promise.all([
    prisma.category.upsert({
      where: { slug: "palas" },
      update: {},
      create: { name: "Palas", slug: "palas" },
    }),
    prisma.category.upsert({
      where: { slug: "zapatillas" },
      update: {},
      create: { name: "Zapatillas", slug: "zapatillas" },
    }),
    prisma.category.upsert({
      where: { slug: "bolas" },
      update: {},
      create: { name: "Bolas", slug: "bolas" },
    }),
  ]);

  // Marcas
  const [adidas, bullpadel, head] = await Promise.all([
    prisma.brand.upsert({
      where: { slug: "adidas" },
      update: {},
      create: { name: "Adidas", slug: "adidas" },
    }),
    prisma.brand.upsert({
      where: { slug: "bullpadel" },
      update: {},
      create: { name: "Bullpadel", slug: "bullpadel" },
    }),
    prisma.brand.upsert({
      where: { slug: "head" },
      update: {},
      create: { name: "Head", slug: "head" },
    }),
  ]);

  // Productos
  await prisma.product.upsert({
    where: { slug: "adidas-metalbone-ctrl" },
    update: {},
    create: {
      name: "Adidas Metalbone CTRL",
      slug: "adidas-metalbone-ctrl",
      type: ProductType.PALA,
      brandId: adidas.id,
      categoryId: palas.id,
      description:
        "Pala de control con gran salida de bola. Ideal para jugadores avanzados.",
      seoTitle: "Adidas Metalbone CTRL",
      seoDescription:
        "Pala de control premium. Balance medio, forma redonda, gran manejabilidad.",
      weightGr: 365,
      balance: "even",
      shape: "redonda",
      variants: {
        create: [
          { sku: "AD-MB-CTRL-1", priceCents: 24999, stock: 10, gripSize: "L2" },
          { sku: "AD-MB-CTRL-2", priceCents: 24999, stock: 6, gripSize: "L3" },
        ],
      },
      images: {
        create: [
          {
            url: "/images/palas/metalbone-ctrl-1.jpg",
            alt: "Adidas Metalbone CTRL vista frontal",
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "bullpadel-vertex-03" },
    update: {},
    create: {
      name: "Bullpadel Vertex 03",
      slug: "bullpadel-vertex-03",
      type: ProductType.PALA,
      brandId: bullpadel.id,
      categoryId: palas.id,
      description: "Pala de potencia con formato diamante para juego agresivo.",
      seoTitle: "Bullpadel Vertex 03",
      seoDescription:
        "Potencia máxima, formato diamante y gran pegada para avanzados.",
      weightGr: 370,
      balance: "head-heavy",
      shape: "diamante",
      variants: {
        create: [
          { sku: "BP-VTX03-L2", priceCents: 28999, stock: 8, gripSize: "L2" },
          { sku: "BP-VTX03-L3", priceCents: 28999, stock: 4, gripSize: "L3" },
        ],
      },
      images: {
        create: [
          { url: "/images/palas/vertex-03-1.jpg", alt: "Bullpadel Vertex 03" },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "head-sprint-pro-3" },
    update: {},
    create: {
      name: "Head Sprint Pro 3.0",
      slug: "head-sprint-pro-3",
      type: ProductType.ZAPATILLA,
      brandId: head.id,
      categoryId: zapatillas.id,
      description:
        "Zapatillas ligeras y transpirables para máxima velocidad en pista.",
      seoTitle: "Head Sprint Pro 3.0",
      seoDescription: "Ligeras, rápidas y cómodas para pádel.",
      variants: {
        create: [
          {
            sku: "HD-SP3-42",
            priceCents: 11999,
            stock: 12,
            size: "42",
            color: "Azul",
          },
          {
            sku: "HD-SP3-43",
            priceCents: 11999,
            stock: 7,
            size: "43",
            color: "Azul",
          },
          {
            sku: "HD-SP3-44",
            priceCents: 11999,
            stock: 5,
            size: "44",
            color: "Azul",
          },
        ],
      },
      images: {
        create: [
          {
            url: "/images/zapatillas/sprint-pro-3-azul.jpg",
            alt: "Head Sprint Pro 3.0 azul",
          },
        ],
      },
    },
  });

  console.log("✅ Seed completado");
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
