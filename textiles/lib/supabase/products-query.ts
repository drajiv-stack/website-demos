import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  SEEDED_PRODUCTS,
  SEASONAL_COLOURWAYS,
  type TextileProduct,
} from '@/lib/products';

const CATEGORY_DE_MAP: Record<string, TextileProduct['category_de']> = {
  Bed: 'Bettwäsche',
  Bath: 'Badtextilien',
  Kitchen: 'Tisch & Küche',
  Living: 'Wohnen',
};

// Public anonymous client for static generation & ISR
export function createAnonSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Authenticated SSR client for /admin routes & server actions
export async function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — middleware handles refresh
        }
      },
    },
  });
}

function mapRowToProduct(row: Record<string, unknown>, fallback?: TextileProduct): TextileProduct {
  const cat = ((row.category as string) || fallback?.category || 'Bed') as TextileProduct['category'];
  const rawSpecs = (row.specs as Record<string, string>) || {};
  const rawColourways = Array.isArray(row.colourways) && row.colourways.length > 0
    ? (row.colourways as TextileProduct['colourways'])
    : fallback?.colourways ?? SEASONAL_COLOURWAYS.slice(0, 4);

  return {
    id: (row.id as string) || fallback?.id || '',
    slug: (row.slug as string) || fallback?.slug || '',
    category: cat,
    category_de: CATEGORY_DE_MAP[cat] ?? 'Bettwäsche',
    name_en: (row.name_en as string) || fallback?.name_en || '',
    name_de: (row.name_de as string) || fallback?.name_de || (row.name_en as string) || '',
    description_en: (row.description_en as string) || fallback?.description_en || '',
    description_de:
      (row.description_de as string) ||
      fallback?.description_de ||
      (row.description_en as string) ||
      '',
    specs: {
      fibre_en: rawSpecs.fibre_en || fallback?.specs.fibre_en || '100% Combed Cotton',
      fibre_de: rawSpecs.fibre_de || fallback?.specs.fibre_de || '100 % Gekämmte Baumwolle',
      density: rawSpecs.density || fallback?.specs.density || '200 TC†',
      sizes_de: rawSpecs.sizes_de || fallback?.specs.sizes_de || '135×200 cm',
      sizes_eu: rawSpecs.sizes_eu || fallback?.specs.sizes_eu || '240×220 cm',
      sizes_au: rawSpecs.sizes_au || fallback?.specs.sizes_au || '210×210 cm',
    },
    colourways: rawColourways,
    moq: (row.moq as string) || fallback?.moq || '300 sets per colourway†',
    hs_code: (row.hs_code as string) || fallback?.hs_code || '630231',
    lead_time_en: (row.lead_time as string) || fallback?.lead_time_en || '35 days† · CIF Hamburg / Rotterdam',
    lead_time_de:
      rawSpecs.lead_time_de ||
      fallback?.lead_time_de ||
      ((row.lead_time as string) ?? '').replace('days', 'Tage') ||
      '35 Tage† · CIF Hamburg / Rotterdam',
    incoterms:
      Array.isArray(row.incoterms) && row.incoterms.length > 0
        ? (row.incoterms as string[])
        : fallback?.incoterms ?? ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam'],
    image_urls:
      Array.isArray(row.image_urls) && row.image_urls.length > 0
        ? (row.image_urls as string[])
        : fallback?.image_urls ?? ['/images/products/washed-percale-duvet-set.webp'],
    published: typeof row.published === 'boolean' ? row.published : true,
    sort_order: typeof row.sort_order === 'number' ? row.sort_order : fallback?.sort_order ?? 1,
  };
}

export async function getPublishedTextilesProducts(): Promise<TextileProduct[]> {
  try {
    const supabase = createAnonSupabase();
    if (!supabase) return SEEDED_PRODUCTS;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('site', 'textiles')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return SEEDED_PRODUCTS;
    }

    // Merge Supabase rows with seeded fallbacks so all 10 products are always present
    const bySlug = new Map<string, TextileProduct>();
    for (const p of SEEDED_PRODUCTS) {
      bySlug.set(p.slug, p);
    }
    for (const row of data) {
      const slug = row.slug as string;
      const fallback = bySlug.get(slug);
      bySlug.set(slug, mapRowToProduct(row, fallback));
    }

    return Array.from(bySlug.values()).sort((a, b) => a.sort_order - b.sort_order);
  } catch {
    return SEEDED_PRODUCTS;
  }
}

export async function getTextileProductBySlug(slug: string): Promise<TextileProduct | undefined> {
  const all = await getPublishedTextilesProducts();
  return all.find((p) => p.slug === slug);
}

export async function getAllAdminProducts(): Promise<TextileProduct[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('site', 'textiles')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return SEEDED_PRODUCTS;
    }

    const bySlug = new Map<string, TextileProduct>();
    for (const p of SEEDED_PRODUCTS) {
      bySlug.set(p.slug, p);
    }
    for (const row of data) {
      const slug = row.slug as string;
      bySlug.set(slug, mapRowToProduct(row, bySlug.get(slug)));
    }
    return Array.from(bySlug.values()).sort((a, b) => a.sort_order - b.sort_order);
  } catch {
    return SEEDED_PRODUCTS;
  }
}
