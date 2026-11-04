import Link from 'next/link';
import { getAllAdminProducts } from '@/lib/supabase/products-query';
import { requireAdmin } from '@/lib/supabase/admin-auth';
import { toggleProductPublished } from '@/app/admin/actions';

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getAllAdminProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone/50 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            Supabase Products Catalogue
          </p>
          <h1 className="mt-1 font-display text-4xl text-ink">Products ({products.length})</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/en"
            target="_blank"
            className="rounded-full border border-stone/70 bg-alabaster px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:border-indigo"
          >
            Open Live Showroom ↗
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-sm border border-stone/60 bg-alabaster shadow-xs">
        <table className="w-full text-left text-sm text-ink">
          <thead className="border-b border-stone/45 bg-linen text-xs font-semibold uppercase tracking-wider text-stone-dark">
            <tr>
              <th scope="col" className="px-5 py-3.5">#</th>
              <th scope="col" className="px-5 py-3.5">Category</th>
              <th scope="col" className="px-5 py-3.5">English / German Name</th>
              <th scope="col" className="px-5 py-3.5">MOQ</th>
              <th scope="col" className="px-5 py-3.5">Status</th>
              <th scope="col" className="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone/40">
            {products.map((p, idx) => (
              <tr key={p.id} className="hover:bg-linen/40">
                <td className="px-5 py-4 font-mono text-xs text-stone-dark">
                  {String(idx + 1).padStart(2, '0')}
                </td>
                <td className="px-5 py-4 font-medium text-indigo">
                  {p.category}
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-ink">{p.name_en}</div>
                  <div className="text-xs text-stone-dark">{p.name_de}</div>
                </td>
                <td className="px-5 py-4 text-xs font-mono text-stone-dark">
                  {p.moq}
                </td>
                <td className="px-5 py-4">
                  <form
                    action={async () => {
                      'use server';
                      await toggleProductPublished(p.id, !p.published);
                    }}
                  >
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        p.published
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone/30 text-stone-dark'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${p.published ? 'bg-emerald-600' : 'bg-stone-dark'}`} />
                      {p.published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="rounded-xs border border-stone/60 bg-linen px-3 py-1.5 text-xs font-semibold text-ink hover:border-indigo hover:text-indigo"
                  >
                    Edit EN/DE →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
