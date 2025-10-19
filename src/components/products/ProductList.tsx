'use client'; 

import { Product } from "@/types";
import ProductCard from './ProductCard';
import styles from '@/app/catalogo/catalogo.module.css';

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {  

  if (!products || products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
  <div className={styles.productListGrid}>
    {products.map((product) => {      
      const primaryCategory = product.categories?.[0]?.slug || 'sin-categoria';
      
      return (
        <ProductCard 
          key={product.id} 
          product={product}           
          href={`/catalogo/${primaryCategory}/${product.slug}`}
        />
      );
    })}
  </div>
);
}