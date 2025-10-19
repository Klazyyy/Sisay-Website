'use client';

import { useState, useMemo, useRef } from "react";
import ProductList from "@/components/products/ProductList";
import styles from './catalogo.module.css';
import type { Product, ProductCategory } from "@/types";

const PRODUCTS_PER_PAGE = 12;

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

type Props = {
  products: Product[];
  categories: ProductCategory[];
};

export default function CatalogoClient({ products: allProducts, categories }: Props) {

  const mainContentRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === null) return allProducts;
    return allProducts.filter(p => p.categories.some(c => c.id === selectedCategory));
  }, [selectedCategory, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
     <div className={styles.container} ref={mainContentRef}>
      <aside className={styles.filters}>
        <h2>Categorías</h2>
        <ul>
          <li>
            <button onClick={() => handleCategoryClick(null)} className={selectedCategory === null ? styles.active : ''}>
              Todas
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button onClick={() => handleCategoryClick(category.id)} className={selectedCategory === category.id ? styles.active : ''}>
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <h1>Catálogo General</h1>
        <ProductList products={paginatedProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}