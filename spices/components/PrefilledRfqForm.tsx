'use client';

import { useSearchParams } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { RfqForm } from './RfqForm';

export function PrefilledRfqForm() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('product') ?? '';
  const matchedProduct = slug ? getProductBySlug(slug) : undefined;

  const defaultProduct = matchedProduct
    ? `${matchedProduct.name} (HS ${matchedProduct.specs.hsCode}) — ${matchedProduct.rfqPlaceholder.replace(/^e\.g\.\s*/i, '')}`
    : slug;

  return <RfqForm defaultProduct={defaultProduct} />;
}
