'use client';

import { useState, useRef, useEffect } from 'react';

type Props = {
    src: string,
}

export default function LazyGoogleMaps({ src }: Props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const mapRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const mapElement = mapRef.current

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px',
            }
        );

        if (mapElement) {
            observer.observe(mapElement);
        }

        if (mapRef.current) {
            observer.observe(mapRef.current);
        }

        return () => {
            if (mapElement) {
                observer.unobserve(mapElement);
            }
        };
    }, []);

    return (
        <div
            ref={mapRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                backgroundColor: 'var(--color-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
            }}
        >
            {isLoaded ? (
                <iframe
                    src={src}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy" 
                    title="Ubicación de la tienda en Google Maps"
                />
            ) : (
                <div style={{ display: 'grid', placeContent: 'center', height: '100%' }}>
                    <p>Cargando mapa...</p>
                </div>
            )}
        </div>
    );
}