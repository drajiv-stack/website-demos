import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/products-query';

// UI-level gate only. Real enforcement is Supabase RLS (public.is_admin()) on every write.
export async function requireAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) redirect('/admin/login?error=not-admin');

  return { supabase, user };
}
