import { Product } from '@/types';

type Props = {
    product: Product;
    categorySlug: string;
};

export default function ProductSchema({ product, categorySlug }: Props) {  

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/catalogo/${categorySlug}/${product.slug}`;


  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images?.[0]?.src || '',
    description: product.short_description.replace(/<[^>]*>?/gm, ''), 
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Sisay', 
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'PEN', 
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },    
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}