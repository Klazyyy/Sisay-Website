import type { Metadata } from "next";
import { fetchWooCommerce } from "@/lib/woocommerce";
import type { Product, ProductCategory } from "@/types";
import CatalogoClient from "./CatalogoClient";

export const metadata: Metadata = {
  title: "Catálogo Completo | Sisay",
  description: "Explora el catálogo completo de Sisay...",
  alternates: { canonical: '/catalogo' },
};

export default async function CatalogoPage() {  
  const [productsResponse, categoriesResponse] = await Promise.all([
    fetchWooCommerce<Product[]>("products", { per_page: "100" }),
    fetchWooCommerce<ProductCategory[]>("products/categories", { per_page: "100" })
  ]);

  const allProducts = productsResponse?.data || [];
  const allCategories = categoriesResponse?.data || [];

  return (
    <CatalogoClient
      products={allProducts}
      categories={allCategories}
    />
  );
}