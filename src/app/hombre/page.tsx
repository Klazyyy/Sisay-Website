import Link from "next/link";
import { fetchWooCommerce } from "@/lib/woocommerce";
import type { Product } from "@/types";
import ProductList from "@/components/products/ProductList";

export const revalidate = 3600;

export default async function HombreHomePage() {

  const ID_HOMBRE = '21';
  const ID_UNISEX = '23';

  const { data: products } = await fetchWooCommerce<Product[]>("products", {
    category: `${ID_HOMBRE},${ID_UNISEX}`,
    per_page: "4",
  });
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenido a la sección de Hombre</h1>
      <p>Aquí irá el diseño de la home temática para hombre.</p>
      <Link href="/hombre/catalogo" style={{ color: 'var(--color-primary)', marginTop: '1rem', display: 'inline-block' }}>
        Ver Catálogo Completo
      </Link>

      <div style={{ marginTop: '2rem' }}>
        <h2>Destacados</h2>
        {products && products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p>No se encontraron productos destacados.</p>
        )}
      </div>
    </main>
  );
}