'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ColourwayOption } from '@/lib/products';
import { createBrowserSupabase } from '@/lib/supabase/browser';

export function ProductImageUpload({
  initialUrls,
  productId,
}: {
  initialUrls: string[];
  productId: string;
}) {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const supabase = createBrowserSupabase();
      const ext = file.name.split('.').pop() || 'webp';
      const fileName = `${productId}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      if (data?.publicUrl) {
        setUrls((prev) => [...prev, data.publicUrl]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(msg);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <div
            key={i}
            className="relative h-20 w-24 overflow-hidden rounded-xs border border-stone/60 bg-linen"
          >
            <Image src={url} alt="" fill sizes="96px" className="object-cover" />
            <span className="absolute bottom-1 right-1 rounded-xs bg-ink/75 px-1 py-0.5 text-[9px] text-alabaster">
              #{i + 1}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-full border border-stone/70 bg-linen px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:border-indigo">
          {uploading ? 'Uploading to Storage…' : '+ Upload Image to product-images Bucket'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {error && <span className="text-xs text-red-700">{error}</span>}
      </div>
    </div>
  );
}

export function ColourwaysEditor({
  initialColourways,
}: {
  initialColourways: ColourwayOption[];
}) {
  const [colourways, setColourways] = useState<ColourwayOption[]>(initialColourways);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {colourways.map((c, i) => (
          <div
            key={c.id || i}
            className="flex items-center gap-3 rounded-xs border border-stone/50 bg-linen p-3 text-xs"
          >
            <span
              className="h-6 w-6 shrink-0 rounded-full border border-ink/20"
              style={{ backgroundColor: c.hex }}
            />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-ink">{c.name_en}</span>
              <span className="text-stone-dark"> / {c.name_de}</span>
              <div className="font-mono text-[10px] text-stone-dark">
                {c.pantone_ref} · {c.hex}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-stone-dark">
        Vat-dyed colourways matched for this piece. Custom shades can be formulated from client Pantone references.
      </p>
    </div>
  );
}
