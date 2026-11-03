'use client';

import { useSearchParams } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { RfqForm } from './RfqForm';

export function PrefilledRfqForm({ dark = false }: { dark?: boolean }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get('product') ?? '';
  const matchedProduct = slug ? getProductBySlug(slug) : undefined;

  const defaultProduct = matchedProduct
    ? `${matchedProduct.name} — ${matchedProduct.rfqPlaceholder.replace(/^e\.g\.\s*/i, '')}`
    : slug;

  return <RfqForm defaultProduct={defaultProduct} dark={dark} />;
}
