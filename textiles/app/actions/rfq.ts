'use server';

import { z } from 'zod';
import { createAnonSupabase } from '@/lib/supabase/products-query';

const RfqSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid business email is required').max(254),
  country: z.string().trim().min(2, 'Country is required').max(80),
  product_quantity: z
    .string()
    .trim()
    .min(2, 'Please specify product, colourways and quantity')
    .max(300),
  message: z.string().trim().max(2000).optional(),
  website_honeypot: z.string().optional(),
  loaded_at: z.string(),
});

export interface RfqActionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export async function submitTextilesRfq(
  _prevState: RfqActionState,
  formData: FormData
): Promise<RfqActionState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    country: String(formData.get('country') ?? ''),
    product_quantity: String(formData.get('product_quantity') ?? ''),
    message: String(formData.get('message') ?? ''),
    website_honeypot: String(formData.get('website_honeypot') ?? ''),
    loaded_at: String(formData.get('loaded_at') ?? '0'),
  };

  // 1. Honeypot check
  if (raw.website_honeypot && raw.website_honeypot.trim().length > 0) {
    return {
      status: 'error',
      message: 'Spam detected.',
    };
  }

  // 2. Reject submissions < 3 seconds after form mount
  const loadedAtMs = Number(raw.loaded_at);
  if (!Number.isFinite(loadedAtMs) || Date.now() - loadedAtMs < 3000) {
    return {
      status: 'error',
      message: 'Please take a moment to review your inquiry before sending.',
    };
  }

  // 3. Zod validation
  const parsed = RfqSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      status: 'error',
      message: firstIssue?.message ?? 'Please check the form fields.',
    };
  }

  // 4. Insert into Supabase rfq_submissions (site = 'textiles')
  const supabase = createAnonSupabase();
  if (!supabase) {
    return {
      status: 'error',
      message: 'Service temporarily unavailable. Please email us directly.',
    };
  }

  const { error } = await supabase.from('rfq_submissions').insert({
    site: 'textiles',
    name: parsed.data.name,
    email: parsed.data.email,
    country: parsed.data.country,
    product_quantity: parsed.data.product_quantity,
    message: parsed.data.message || null,
  });

  if (error) {
    return {
      status: 'error',
      message: 'Could not save your request right now. Please try again.',
    };
  }

  return {
    status: 'success',
  };
}
