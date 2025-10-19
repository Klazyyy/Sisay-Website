export const dynamic = 'force-dynamic';

import { fetchWooCommerce } from "@/lib/woocommerce";
import { Product, ProductCategory } from "@/types";
import ProductList from "@/components/products/ProductList";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo de Mujer y Unisex - Sisay",
  description: "Explora nuestra colección completa de perfumes y cosméticos para mujer y unisex. Realza tu belleza con Sisay Arequipa.",
  alternates: { canonical: '/mujer/catalogo' },
};

export const revalidate = 3600;
const PRODUCTS_PER_PAGE = 12;

const Pagination = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
  if (totalPages <= 1) return null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
      {prevPage && <Link href={`/mujer/catalogo?page=${prevPage}`}>Anterior</Link>}
      <span>Página {currentPage} de {totalPages}</span>
      {nextPage && <Link href={`/mujer/catalogo?page=${nextPage}`}>Siguiente</Link>}
    </nav>
  );
};

export default async function MujerCatalogoPage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;

  const [mujerResponse, unisexResponse] = await Promise.all([
    fetchWooCommerce<Product[]>("products", {
      per_page: "100",
      category: '22',
    }),
    fetchWooCommerce<Product[]>("products", {
      per_page: "100",
      category: '23',
    })
  ]);

  const mujerProducts = mujerResponse.data || [];
  const unisexProducts = unisexResponse.data || [];

  const allProducts = [...mujerProducts, ...unisexProducts];

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
      <h1>Colección para Mujer</h1>
      <ProductList products={paginatedProducts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}