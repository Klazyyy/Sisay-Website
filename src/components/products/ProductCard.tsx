import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
  href: string; 
  blurDataURL?: string;
};

export default function ProductCard({ product, href, blurDataURL }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.src || '/placeholder.png';

  return (
    
    <article className={styles.card}>      
      <Link href={href} className={styles.linkWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={`Imagen de ${product.name}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"              
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>S/ {product.price}</p>
        </div>
      </Link>
    </article>
  );
}