import type { Locale } from '@/lib/products';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noolweave-textiles.vercel.app';

export const LOCALES: Locale[] = ['en', 'de'];

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'de';
}

export function t(lang: Locale, en: string, de: string) {
  return lang === 'de' ? de : en;
}
