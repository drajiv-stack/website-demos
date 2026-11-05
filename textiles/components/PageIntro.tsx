import Image from 'next/image';

export function PageIntro({
  eyebrow,
  title,
  italic,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  lead: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="linen-weave-surface border-b border-stone/45 bg-linen ">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-8">
        <div className={image ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-normal leading-[1.06] tracking-tight text-ink sm:text-6xl">
            {title}
            {italic && (
              <>
                {' '}
                <span className="italic text-indigo">{italic}</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-dark sm:text-lg">
            {lead}
          </p>
        </div>
        {image && (
          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone/60 shadow-md">
              <Image
                src={image}
                alt={imageAlt ?? ''}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
