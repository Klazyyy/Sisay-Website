'use client';

import Link from 'next/link';

type WhatsAppButtonProps = {
    phoneNumber: string;
    message?: string;
    label?: string;
};

export default function WhatsAppButton({
    phoneNumber,
    message = 'Hola, estoy interesado en un producto.',
    label = 'Contáctanos por Whatsapp',
}: WhatsAppButtonProps) {

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <Link href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#25D366',
                color: 'white',
                borderRadius: 'var(--border-radius)',
                textDecoration: 'none',
                fontWeight: 'bold',
            }}
    >{label}
        </Link>
    );
}