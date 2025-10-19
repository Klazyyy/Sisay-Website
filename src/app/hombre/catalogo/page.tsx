export const dynamic = 'force-dynamic';

import { fetchWooCommerce } from "@/lib/woocommerce";
import { Product, ProductCategory } from "@/types";
import ProductList from "@/components/products/ProductList";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo de Hombre y Unisex - Sisay",
  description: "Explora nuestra colección completa de perfumes y cosméticos para hombre y unisex. Encuentra tu estilo en Sisay Arequipa.",
  alternates: { canonical: '/hombre/catalogo' },
};

const PRODUCTS_PER_PAGE = 12;

const Pagination = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
  if (totalPages <= 1) return null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
      {prevPage && <Link href={`/hombre/catalogo?page=${prevPage}`}>Anterior</Link>}
      <span>Página {currentPage} de {totalPages}</span>
      {nextPage && <Link href={`/hombre/catalogo?page=${nextPage}`}>Siguiente</Link>}
    </nav>
  );
};



export default async function HombreCatalogoPage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;

  const [hombreResponse, unisexResponse] = await Promise.all([
    fetchWooCommerce<Product[]>("products", {
      per_page: "100",
      category: "21",
    }),
    fetchWooCommerce<Product[]>("products", {
      per_page: "100",
      category: "23"
    })
  ]);

  const hombreProducts = hombreResponse.data || [];
  const unisexProducts = unisexResponse.data || [];

  const allProducts = [...hombreProducts, ...unisexProducts];

  const uniqueProductsMap = new Map<number, Product>();
  allProducts.forEach(product => {
    uniqueProductsMap.set(product.id, product);
  });
  const uniqueProducts = Array.from(uniqueProductsMap.values());

  const totalPages = Math.ceil(uniqueProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = uniqueProducts.slice(startIndex, endIndex);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Colección para Hombre</h1>
      <ProductList products={paginatedProducts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}