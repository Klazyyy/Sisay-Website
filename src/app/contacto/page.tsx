import LazyGoogleMaps from '@/components/ui/LazyGoogleMaps';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Sisay | Perfumería en Arequipa',
  description: 'Encuéntranos en nuestra tienda en Arequipa. Contáctanos para consultas, horarios y descubre la mejor selección de cosméticos y perfumes.',
  alternates: { canonical: '/contacto' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Perfumery',
  'name': 'Sisay Perfumería',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Avenida José Abelardo Quiñones B6',
    'addressLocality': 'Arequipa',
    'postalCode': '04001',
    'addressCountry': 'PE'
  },
  'telephone': '+51954279189',
  'openingHours': 'Mo-Sa 10:00-20:00', 
  'url': 'https://www.sisay.website/contacto', 
  'image': 'https://www.sisay.website/logo.png', 
  'priceRange': 'S/.' 
};

export default function ContactoPage () {
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1137.936516995829!2d-71.54723475529575!3d-16.39702526054496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424baf208817d9%3A0x5c023ce86671904a!2sSisay%20Perfumer%C3%ADa!5e0!3m2!1ses-419!2spe!4v1760759789143!5m2!1ses-419!2spe";
    
    return (
        <main style={{ padding: '2rem', maxWidth: 'var(--max-width)', margin: '0 auto'}}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1>Contacto</h1>
            <p>Visítanos en nuestra tienda física</p>

            <div style={{ height: '100vh'}}>
                <p>Desliza hacia abajo para ver el mapa.</p>
            </div>

            <h2>Nuestra Ubicación</h2>
            <LazyGoogleMaps src={mapSrc} />
        </main>
    );
}
