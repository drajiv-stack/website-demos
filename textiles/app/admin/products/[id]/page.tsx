import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllAdminProducts } from '@/lib/supabase/products-query';
import { requireAdmin } from '@/lib/supabase/admin-auth';
import { updateProductDetails } from '@/app/admin/actions';
import { ProductImageUpload, ColourwaysEditor } from '@/components/AdminProductEditors';

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const products = await getAllAdminProducts();
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-stone/50 pb-5">
        <div>
          <Link
            href="/admin/products"
            className="text-xs font-semibold uppercase tracking-wider text-indigo hover:underline"
          >
            ← Back to Products List
          </Link>
          <h1 className="mt-2 font-display text-3xl text-ink">
            Edit: {product.name_en}
          </h1>
        </div>
        <span className="rounded-xs bg-indigo-soft px-3 py-1 font-mono text-xs font-semibold text-indigo">
          {product.category} · {product.slug}
        </span>
      </div>

      <form action={updateProductDetails} className="mt-8 space-y-8">
        <input type="hidden" name="id" value={product.id} />

        {/* Names */}
        <div className="rounded-sm border border-stone/60 bg-alabaster p-6 shadow-xs">
          <h2 className="font-display text-xl text-ink">Bilingual Names</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name_en" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                English Name (name_en)
              </label>
              <input
                id="name_en"
                name="name_en"
                type="text"
                defaultValue={product.name_en}
                required
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="name_de" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                German Name (name_de)
              </label>
              <input
                id="name_de"
                name="name_de"
                type="text"
                defaultValue={product.name_de}
                required
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="rounded-sm border border-stone/60 bg-alabaster p-6 shadow-xs">
          <h2 className="font-display text-xl text-ink">Descriptions</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="description_en" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                English Description (description_en)
              </label>
              <textarea
                id="description_en"
                name="description_en"
                rows={3}
                defaultValue={product.description_en}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="description_de" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                German Description (description_de)
              </label>
              <textarea
                id="description_de"
                name="description_de"
                rows={3}
                defaultValue={product.description_de}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
          </div>
        </div>

        {/* Product Images & Storage Upload */}
        <div className="rounded-sm border border-stone/60 bg-alabaster p-6 shadow-xs">
          <h2 className="font-display text-xl text-ink">Product Images &amp; Storage Upload</h2>
          <div className="mt-4">
            <ProductImageUpload
              initialUrls={product.image_urls}
              productId={product.id}
            />
          </div>
        </div>

        {/* Colourways Swatches */}
        <div className="rounded-sm border border-stone/60 bg-alabaster p-6 shadow-xs">
          <h2 className="font-display text-xl text-ink">Seasonal Colourway Swatches</h2>
          <div className="mt-4">
            <ColourwaysEditor initialColourways={product.colourways} />
          </div>
        </div>

        {/* Specs & Export Info */}
        <div className="rounded-sm border border-stone/60 bg-alabaster p-6 shadow-xs">
          <h2 className="font-display text-xl text-ink">Export Specs (4-Row PDP Table)</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fibre_en" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                Fibre &amp; Weave (EN)
              </label>
              <input
                id="fibre_en"
                name="fibre_en"
                type="text"
                defaultValue={product.specs.fibre_en}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="fibre_de" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                Fibre &amp; Weave (DE)
              </label>
              <input
                id="fibre_de"
                name="fibre_de"
                type="text"
                defaultValue={product.specs.fibre_de}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="density" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                Density / GSM (with †)
              </label>
              <input
                id="density"
                name="density"
                type="text"
                defaultValue={product.specs.density}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="moq" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                MOQ (with †)
              </label>
              <input
                id="moq"
                name="moq"
                type="text"
                defaultValue={product.moq}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="lead_time" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                Lead Time &amp; Ports
              </label>
              <input
                id="lead_time"
                name="lead_time"
                type="text"
                defaultValue={product.lead_time_en}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="hs_code" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                HS Code (6 digits)
              </label>
              <input
                id="hs_code"
                name="hs_code"
                type="text"
                defaultValue={product.hs_code}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 border-t border-stone/45 pt-4 sm:grid-cols-3">
            <div>
              <label htmlFor="sizes_de" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                🇩🇪 DE Sizes
              </label>
              <input
                id="sizes_de"
                name="sizes_de"
                type="text"
                defaultValue={product.specs.sizes_de}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="sizes_eu" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                🇳🇱 EU Sizes
              </label>
              <input
                id="sizes_eu"
                name="sizes_eu"
                type="text"
                defaultValue={product.specs.sizes_eu}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
            <div>
              <label htmlFor="sizes_au" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                🇦🇺 AU Sizes
              </label>
              <input
                id="sizes_au"
                name="sizes_au"
                type="text"
                defaultValue={product.specs.sizes_au}
                className="mt-1.5 w-full rounded-xs border border-stone/70 bg-linen px-3.5 py-2 text-sm text-ink focus:border-indigo"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-stone/50 pt-4">
          <Link
            href="/admin/products"
            className="text-xs font-semibold uppercase tracking-wider text-stone-dark hover:text-ink"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-full bg-indigo px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-alabaster hover:bg-indigo-hover"
          >
            Save &amp; Revalidate Public Pages
          </button>
        </div>
      </form>
    </div>
  );
}
