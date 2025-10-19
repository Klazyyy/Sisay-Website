import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Página no encontrada | Sisay',
  description: 'La página que buscas no existe o ha sido movida.',
};

export default function NotFound() {
  return (
    <main style={{ 
      textAlign: 'center', 
      padding: '4rem 2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '60vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>404 - Página no encontrada</h1>
      <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link href="/" style={{ textDecoration: 'underline' }}>
          Ir a la página de inicio
        </Link>
        <Link href="/catalogo" style={{ textDecoration: 'underline' }}>
          Ver nuestro catálogo
        </Link>
      </div>
    </main>
  );
}
