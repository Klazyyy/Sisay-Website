import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nuestros Servicios - Asesoría y Experiencias | Sisay",
  
  description: "Descubre los servicios exclusivos de Sisay en Arequipa. Ofrecemos asesoría personalizada para ayudarte a encontrar tu fragancia ideal y más.",
  alternates: { canonical: '/servicios' },
};

export default function ServicioPage () {
    
    return (
        <main style={{ padding: '2rem', maxWidth: 'var(--max-width)', margin: '0 auto'}}>           
            <h1>Servicios</h1>
            <p>Nuestros servicios</p>
        </main>
    );
}
