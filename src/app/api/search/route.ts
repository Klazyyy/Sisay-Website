import { NextRequest, NextResponse } from 'next/server';
import { fetchWooCommerce } from '@/lib/woocommerce';
import { Product } from '@/types';


export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q')?.trim();

    if (!query || query.length < 2) {
        return NextResponse.json({ error: 'Query must be at least 2 characters long' }, { status: 400 });
    }

    try {
        const fields = 'id,name,slug,categories';

        const { data: searchResults } = await fetchWooCommerce<Product[]>("products", {
            search: query,
            per_page: '5',
            status: 'publish',
            _fields: fields,
        });

        if (!searchResults) {
            return NextResponse.json([]);
        }

        return NextResponse.json(searchResults);
    } catch (error) {
        console.error('API Search Error:', error);
        return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
    }
}