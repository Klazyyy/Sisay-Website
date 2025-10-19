'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import styles from './Search.module.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {        
        if (query.length < 2) {
            setResults([]);
            return;
        }
        
        const controller = new AbortController();
        const { signal } = controller;
       
        const debounceTimeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${query}`, {
                    signal, 
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();                
                if (!signal.aborted) {
                    setResults(data);
                }
            } catch (error) {                
                if ((error as Error).name !== 'AbortError') {
                    console.error('Error fetching search results:', error);
                }
            } finally {                
                if (!signal.aborted) {
                    setIsLoading(false);
                }
            }
        }, 150); 
        
        return () => {
            clearTimeout(debounceTimeout);
            controller.abort();
        };
    }, [query]); 
    
    return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className={styles.searchInput}
      />
       {isLoading && <div className={styles.spinner}></div>}
      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((product) => {            
            const primaryCategory = product.categories?.[0]?.slug || 'sin-categoria';
            const href = `/catalogo/${primaryCategory}/${product.slug}`;           

            return (
              <li key={product.id}>
                <Link href={href} onClick={() => { setQuery(''); setResults([]); }}>
                  {product.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}