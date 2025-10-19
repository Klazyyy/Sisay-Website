import { fetchWooCommerce } from "@/lib/woocommerce";
import { Product } from "@/types";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import styles from './page.module.css';
import WhatsAppButton from '@/components/ui/WhatsappButton';
import ProductSchema from '@/components/products/ProductSchema';

export const revalidate = 3600; 

type Props = {
  params: {
    category: string;
    product: string;
  };
};

export async function generateStaticParams() {  

  const { data: products } = await fetchWooCommerce<Product[]>("products", { per_page: "100" });

  if (!products) return [];

  return products.flatMap(product =>
    product.categories.map(category => ({
      category: category.slug,
      product: product.slug,
    }))
  );
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: products } = await fetchWooCommerce<Product[]>("products", {
    slug: params.product,
  });

  if (!products || products.length === 0) {
    return {
      title: "Producto no encontrado",
    };
  }

  const product = products[0];
  const imageUrl = product.images?.[0]?.src;
  
  const plainDescription = product.short_description.replace(/<[^>]*>?/gm, '').substring(0, 155) + '...';

  return {
    title: `${product.name} - Sisay`,
    description: plainDescription,
    alternates: {
      canonical: `/catalogo/${params.category}/${params.product}`,
    },
    openGraph: {
      title: `${product.name} | Sisay`,
      description: plainDescription,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 800, 
          height: 600,
        },
      ] : [],
    },
  };
}

export default async function SingleProductPage({ params }: Props) {
  const { data: products } = await fetchWooCommerce<Product[]>("products", {
    slug: params.product,
  });

  if (!products || products.length === 0) {
    notFound();
  }

  const product = products[0];
  
  const yourPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name} (SKU: ${product.sku})`;

  return (
    <main className={styles.main}>
      <ProductSchema product={product} categorySlug={params.category} />
      <h1>{product.name}</h1>
      <p>Precio: S/ {product.price}</p>
      <div
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      <WhatsAppButton
        phoneNumber={yourPhoneNumber}
        message={whatsappMessage}
        label="Consultar por WhatsApp"
      />
    </main>
  );
}