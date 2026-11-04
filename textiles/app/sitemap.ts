import type { MetadataRoute } from 'next';
import { SEEDED_PRODUCTS } from '@/lib/products';
import { LOCALES, siteUrl } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    const pages = [
      '',
      '/collections',
      '/private-label',
      '/sustainability',
      '/about',
      '/contact',
    ];

    for (const p of pages) {
      entries.push({
        url: `${siteUrl}/${lang}${p}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: p === '' ? 1.0 : 0.8,
      });
    }

    for (const product of SEEDED_PRODUCTS) {
      entries.push({
        url: `${siteUrl}/${lang}/products/${product.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
