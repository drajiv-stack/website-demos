import Image from 'next/image';

export function EditorialRow({
  index,
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  flip = false,
  tone = 'alabaster',
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  flip?: boolean;
  tone?: 'alabaster' | 'linen' | 'warm';
  children?: React.ReactNode;
}) {
  const bg =
    tone === 'linen' ? 'bg-linen' : tone === 'warm' ? 'bg-linen-warm' : 'bg-alabaster';
  return (
    <section className={`${bg} border-b border-stone/40 py-14 sm:py-20 lg:pl-16`}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-stone/55 shadow-sm">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <span className="font-display text-6xl italic text-stone">{index}</span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-dark">{body}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  lang,
  href,
}: {
  lang: 'en' | 'de';
  href: string;
}) {
  return (
    <section className="bg-ink py-14 text-linen lg:pl-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <h2 className="font-display text-3xl font-normal leading-tight sm:text-4xl">
          {lang === 'de' ? (
            <>
              Musterbuch &amp; <span className="italic text-stone">Angebot anfordern.</span>
            </>
          ) : (
            <>
              Request a swatch book <span className="italic text-stone">and quote.</span>
            </>
          )}
        </h2>
        <a
          href={href}
          className="inline-flex items-center justify-center rounded-full bg-linen px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-stone sm:text-sm"
        >
          {lang === 'de' ? 'Angebot anfordern' : 'Request a quote'}
        </a>
      </div>
    </section>
  );
}
