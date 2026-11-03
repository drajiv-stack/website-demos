'use server';

import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const rfqSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Name must be 120 characters or fewer.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid business email address.')
    .max(254, 'Email must be 254 characters or fewer.'),
  country: z
    .string()
    .trim()
    .min(2, 'Please specify your destination country.')
    .max(80, 'Country must be 80 characters or fewer.'),
  product_quantity: z
    .string()
    .trim()
    .min(3, 'Please specify the component, alloy and annual quantity.')
    .max(300, 'Product and quantity must be 300 characters or fewer.'),
  message: z
    .string()
    .trim()
    .max(2000, 'Message must be 2000 characters or fewer.')
    .optional()
    .or(z.literal('')),
});

export interface RfqActionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'country' | 'product_quantity' | 'message', string>>;
}

export async function submitRfqAction(
  _prevState: RfqActionState,
  formData: FormData
): Promise<RfqActionState> {
  // 1. Honeypot check
  const honeypot = String(formData.get('website_url') ?? '').trim();
  if (honeypot.length > 0) {
    return {
      status: 'error',
      message: 'Submission rejected by spam filter.',
    };
  }

  // 2. Time-gate check (< 3 seconds after form mount/load)
  const loadedAtRaw = Number(formData.get('loaded_at') ?? 0);
  const now = Date.now();
  if (!loadedAtRaw || Number.isNaN(loadedAtRaw) || now - loadedAtRaw < 3000) {
    return {
      status: 'error',
      message: 'Please take a moment to review your inquiry before submitting.',
    };
  }

  // 3. Zod validation (5 fields max)
  const rawInput = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    country: String(formData.get('country') ?? ''),
    product_quantity: String(formData.get('product_quantity') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const parsed = rfqSchema.safeParse(rawInput);
  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return {
      status: 'error',
      message: 'Please check the highlighted fields below.',
      fieldErrors: {
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        country: flattened.country?.[0],
        product_quantity: flattened.product_quantity?.[0],
        message: flattened.message?.[0],
      },
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      status: 'error',
      message: 'Quote service configuration is missing. Please contact us via WhatsApp or email.',
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from('rfq_submissions').insert({
    site: 'castings',
    name: parsed.data.name,
    email: parsed.data.email,
    country: parsed.data.country,
    product_quantity: parsed.data.product_quantity,
    message: parsed.data.message ? parsed.data.message : null,
  });

  if (error) {
    return {
      status: 'error',
      message: 'Unable to record your quote request right now. Please try again or message us on WhatsApp.',
    };
  }

  return {
    status: 'success',
    message: 'We reply within 24 hours with price, MOQ and lead time.',
  };
}
