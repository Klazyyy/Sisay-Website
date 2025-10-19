import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import styles from './layout.module.css';
import { NextThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';
import CardNavHeader from "@/components/layout/CardNavHeader";



const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const siteTitle = "Sisay - Perfumería y Cosméticos en Arequipa";
const siteDescription = "Descubre la belleza natural con Sisay. Perfumes, fragancias y cosméticos de alta calidad en Arequipa a precios increíbles.";

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Sisay',
  'url': siteUrl,
  'logo': `${siteUrl}/logo.png`,
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+51954279189',
    'contactType': 'Customer Service',
  },
  'address': {
    '@type': '04010',
    'streetAddress': 'Avenida José Aberlado Quiñones B6',
    'addressLocality': 'Arequipa',
    'postalCode': '04001',
    'addressCountry': 'PE'
  },
  'sameAs': [
    'https://www.facebook.com/',
    'https://www.instagram.com',
    'https://twitter.com/'
  ]
};

export const metadata: Metadata = {

  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Sisay",
  },
  description: siteDescription,
  keywords: ["perfumería", "cosméticos", "fragancias", "perfumes", "Arequipa", "Sisay", "belleza", "cuidado personal"],
  alternates: {
    canonical: '/',
    languages: {
      'es-PE': '/',
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Sisay",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    site: '@',
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },

  },

};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="es-PE" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >          
          <CardNavHeader />
          <main className={styles.main}>
            {children}
          </main>
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}