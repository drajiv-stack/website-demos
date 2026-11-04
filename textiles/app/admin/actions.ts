'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabase } from '@/lib/supabase/products-query';

export async function toggleProductPublished(id: string, published: boolean) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from('products')
    .update({ published })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/en', 'layout');
  revalidatePath('/de', 'layout');
  revalidatePath('/admin/products');
  return { success: true };
}

export async function updateProductDetails(formData: FormData): Promise<void> {
  const supabase = await createServerSupabase();
  const id = String(formData.get('id') ?? '');
  const name_en = String(formData.get('name_en') ?? '');
  const name_de = String(formData.get('name_de') ?? '');
  const description_en = String(formData.get('description_en') ?? '');
  const description_de = String(formData.get('description_de') ?? '');
  const moq = String(formData.get('moq') ?? '');
  const hs_code = String(formData.get('hs_code') ?? '');
  const lead_time = String(formData.get('lead_time') ?? '');

  const fibre_en = String(formData.get('fibre_en') ?? '');
  const fibre_de = String(formData.get('fibre_de') ?? '');
  const density = String(formData.get('density') ?? '');
  const sizes_de = String(formData.get('sizes_de') ?? '');
  const sizes_eu = String(formData.get('sizes_eu') ?? '');
  const sizes_au = String(formData.get('sizes_au') ?? '');

  const specs = {
    fibre_en,
    fibre_de,
    density,
    sizes_de,
    sizes_eu,
    sizes_au,
  };

  const { error } = await supabase
    .from('products')
    .update({
      name_en,
      name_de,
      description_en,
      description_de,
      moq,
      hs_code,
      lead_time,
      specs,
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/en', 'layout');
  revalidatePath('/de', 'layout');
  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
}
