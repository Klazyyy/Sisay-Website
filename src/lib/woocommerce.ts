const API_URL = process.env.WORDPRESS_API_URL;
const CONSUMER_KEY = process.env.WORDPRESS_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WORDPRESS_CONSUMER_SECRET;

export async function fetchWooCommerce<T>(endpoint: string, params: Record<string, string> = {}): Promise<{ data: T | null; totalPages: number }> {

    if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
        console.error("Las variables de entorno de WooCommerce no están configuradas correctamente.");
        throw new Error("Error de configuración del servidor.");
    }

    const url = new URL(endpoint, API_URL);
    url.searchParams.append("consumer_key", CONSUMER_KEY);
    url.searchParams.append("consumer_secret", CONSUMER_SECRET);

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }

    try {

        const response = await fetch(url.toString(), {
            next: { revalidate: 60 },
        });

        if (!response.ok) {

            const errorBody = await response.json().catch(() => null);
            console.error("WooCommerce API Error Body:", errorBody);
            throw new Error(
                `HTTP error! status: ${response.status} ${response.statusText}`
            );
        }

        const totalPages = Number(response.headers.get('x-wp-totalpages')) || 0;
        const data = await response.json();

        return { data: data as T, totalPages };

    } catch (error) {
        console.error(`Error al obtener datos de WooCommerce para ${url.toString()}:`, error);
        return { data: null, totalPages: 0 };
    }
}