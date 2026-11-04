export type Locale = 'en' | 'de';
export type RegionCode = 'de' | 'eu' | 'au';

export interface ColourwayOption {
  id: string;
  name_en: string;
  name_de: string;
  hex: string;
  pantone_ref: string;
  image_url: string;
  macro_url: string;
}

export interface CountryShowroom {
  code: RegionCode;
  lang: Locale;
  href: string;
  flag: string;
  country_en: string;
  country_de: string;
  city_en: string;
  city_de: string;
  thumbnail: string;
  duvet_size: string;
  pillow_size: string;
  incoterm: string;
  transit_note_en: string;
  transit_note_de: string;
}

export interface TextileProduct {
  id: string;
  slug: string;
  category: 'Bed' | 'Bath' | 'Kitchen' | 'Living';
  category_de: 'Bettwäsche' | 'Badtextilien' | 'Tisch & Küche' | 'Wohnen';
  name_en: string;
  name_de: string;
  description_en: string;
  description_de: string;
  specs: {
    fibre_en: string;
    fibre_de: string;
    density: string;
    sizes_de: string;
    sizes_eu: string;
    sizes_au: string;
  };
  colourways: ColourwayOption[];
  moq: string;
  hs_code: string;
  lead_time_en: string;
  lead_time_de: string;
  incoterms: string[];
  image_urls: string[];
  published: boolean;
  sort_order: number;
}

export const COMPANY = {
  name: 'NoolWeave Exports',
  shortName: 'NoolWeave',
  tagline_en: 'Woven in Karur. Tailored for Hamburg, Rotterdam & Melbourne.',
  tagline_de: 'Gewebt in Karur. Maßgeschneidert für Hamburg, Rotterdam & Melbourne.',
  location_en: 'Karur, Tamil Nadu, India',
  location_de: 'Karur, Tamil Nadu, Indien',
  address: 'S.F. No. 218, Vaiyapuri Nagar, Karur 639002, Tamil Nadu, India [fictional]',
  email: 'atelier@noolweave-exports.example',
  ports: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
};

export const COUNTRY_SHOWROOMS: CountryShowroom[] = [
  {
    code: 'de',
    lang: 'de',
    href: '/de',
    flag: '🇩🇪',
    country_en: 'Germany & DACH',
    country_de: 'Deutschland & DACH',
    city_en: 'Hamburg Showroom (DE)',
    city_de: 'Showroom Hamburg (DE)',
    thumbnail: '/images/markets/market-de-hamburg.webp',
    duvet_size: '135×200 cm · 155×220 cm',
    pillow_size: '80×80 cm · 40×80 cm',
    incoterm: 'CIF Hamburg',
    transit_note_en: 'German retail sizing, bilingual care labels & EAN-13 cartons',
    transit_note_de: 'Deutsche Standardmaße, zweisprachige Pflegeetiketten & EAN-13',
  },
  {
    code: 'eu',
    lang: 'en',
    href: '/en?region=eu',
    flag: '🇳🇱',
    country_en: 'Netherlands & EU',
    country_de: 'Niederlande & EU',
    city_en: 'Rotterdam Hub (EN)',
    city_de: 'Rotterdam Hub (EN)',
    thumbnail: '/images/markets/market-nl-rotterdam.webp',
    duvet_size: '200×200 cm · 240×220 cm',
    pillow_size: '60×70 cm · 50×75 cm',
    incoterm: 'CIF Rotterdam',
    transit_note_en: 'Benelux & Nordic double/king cuts with tucked or zip closures',
    transit_note_de: 'Benelux- & EU-Maße mit Hotelverschluss oder Reißverschluss',
  },
  {
    code: 'au',
    lang: 'en',
    href: '/en?region=au',
    flag: '🇦🇺',
    country_en: 'Australia & ANZ',
    country_de: 'Australien & ANZ',
    city_en: 'Melbourne Desk (EN)',
    city_de: 'Melbourne Desk (EN)',
    thumbnail: '/images/markets/market-au-melbourne.webp',
    duvet_size: '210×210 cm (Q) · 245×210 cm (K)',
    pillow_size: '48×73 cm Standard',
    incoterm: 'CIF Melbourne',
    transit_note_en: 'Australian Queen, King & Super King specs for coastal retail',
    transit_note_de: 'Australische Queen- & King-Maße für den Einzelhandel',
  },
];

export const SEASONAL_COLOURWAYS: ColourwayOption[] = [
  {
    id: 'indigo',
    name_en: 'Mineral Indigo',
    name_de: 'Mineral-Indigo',
    hex: '#2E3A8C',
    pantone_ref: 'NW-19-4028',
    image_url: '/images/studio/colourway-indigo.webp',
    macro_url: '/images/weaves/macro-percale.webp',
  },
  {
    id: 'flax',
    name_en: 'Undyed Raw Flax',
    name_de: 'Ungefärbtes Rohleinen',
    hex: '#D4C8B4',
    pantone_ref: 'NW-13-1009',
    image_url: '/images/studio/colourway-flax.webp',
    macro_url: '/images/weaves/macro-linen.webp',
  },
  {
    id: 'terracotta',
    name_en: 'Terracotta Clay',
    name_de: 'Terrakotta-Ton',
    hex: '#9E4F36',
    pantone_ref: 'NW-18-1438',
    image_url: '/images/studio/colourway-terracotta.webp',
    macro_url: '/images/weaves/macro-waffle.webp',
  },
  {
    id: 'sage',
    name_en: 'Washed Salbei',
    name_de: 'Gewaschenes Salbei',
    hex: '#647560',
    pantone_ref: 'NW-16-0213',
    image_url: '/images/studio/colourway-sage.webp',
    macro_url: '/images/weaves/macro-linen.webp',
  },
  {
    id: 'ochre',
    name_en: 'Warm Ochre Sand',
    name_de: 'Warmer Ockersand',
    hex: '#B89352',
    pantone_ref: 'NW-15-1237',
    image_url: '/images/studio/colourway-ochre.webp',
    macro_url: '/images/weaves/macro-boucle.webp',
  },
  {
    id: 'slate',
    name_en: 'Nordic Slate Ink',
    name_de: 'Nordisches Schiefergrau',
    hex: '#363D4A',
    pantone_ref: 'NW-19-4010',
    image_url: '/images/studio/colourway-slate.webp',
    macro_url: '/images/weaves/macro-percale.webp',
  },
];

export const SEEDED_PRODUCTS: TextileProduct[] = [
  {
    id: '11111111-2222-3333-4444-555555550001',
    slug: 'washed-percale-duvet-set',
    category: 'Bed',
    category_de: 'Bettwäsche',
    name_en: 'Washed Organic Percale Duvet Set',
    name_de: 'Gewaschenes Bio-Perkal-Bettwäsche-Set',
    description_en:
      'Crisp one-over-one combed cotton percale enzyme-washed for a matte, breathable hand feel and tailored with coconut buttons or concealed zip.',
    description_de:
      'Kühler, enzymgewaschener Baumwoll-Perkal mit matter Haptik, konfektioniert mit verdecktem Reißverschluss oder Hotelverschluss.',
    specs: {
      fibre_en: '100% Long-Staple Combed Cotton Percale',
      fibre_de: '100 % Langstapel-Baumwoll-Perkal',
      density: '200 TC† (125 GSM†)',
      sizes_de: '135×200 + 80×80 cm',
      sizes_eu: '200×200 / 240×220 cm',
      sizes_au: '210×210 cm (Queen)',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '300 sets per colourway†',
    hs_code: '630231',
    lead_time_en: '35 days† · CIF Hamburg / Rotterdam',
    lead_time_de: '35 Tage† · CIF Hamburg / Rotterdam',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/washed-percale-duvet-set.webp',
      '/images/studio/colourway-indigo.webp',
      '/images/studio/colourway-flax.webp',
    ],
    published: true,
    sort_order: 1,
  },
  {
    id: '11111111-2222-3333-4444-555555550002',
    slug: 'flax-linen-sheet-set',
    category: 'Bed',
    category_de: 'Bettwäsche',
    name_en: 'Garment-Washed European Flax Sheet Set',
    name_de: 'Vorgewaschenes Reinleinen-Bettlakenset',
    description_en:
      'Woven in Karur from wet-spun European flax yarn and tumbled with natural enzymes for effortless drape and year-round thermal comfort.',
    description_de:
      'Gewebt in Karur aus europäischem Flachsgarn und schonend vorgewaschen für natürlichen Fall und ganzjährigen Schlafkomfort.',
    specs: {
      fibre_en: '100% Wet-Spun European Flax Linen',
      fibre_de: '100 % Europäisches Reinleinen',
      density: '170 GSM†',
      sizes_de: '155×220 + 80×80 cm',
      sizes_eu: '240×220 + 60×70 cm',
      sizes_au: '245×210 cm (King)',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '200 sets per colourway†',
    hs_code: '630239',
    lead_time_en: '40 days† · CIF Hamburg / Melbourne',
    lead_time_de: '40 Tage† · CIF Hamburg / Melbourne',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/flax-linen-sheet-set.webp',
      '/images/studio/colourway-flax.webp',
      '/images/studio/colourway-sage.webp',
    ],
    published: true,
    sort_order: 2,
  },
  {
    id: '11111111-2222-3333-4444-555555550003',
    slug: 'sateen-hotel-duvet-cover',
    category: 'Bed',
    category_de: 'Bettwäsche',
    name_en: 'Mercerised Sateen Stripe Duvet Cover',
    name_de: 'Merzerisierter Satin-Streifen-Bettbezug',
    description_en:
      'Four-over-one luminous cotton sateen with woven tone-on-tone atelier stripes engineered for hospitality and luxury department-store bedding.',
    description_de:
      'Seidig glänzender Baumwollsatin mit gewebten Ton-in-Ton-Streifen für gehobene Hotellerie und Kaufhaus-Eigenmarken.',
    specs: {
      fibre_en: '100% Mercerised Combed Cotton Sateen',
      fibre_de: '100 % Merzerisierter Baumwollsatin',
      density: '300 TC† (140 GSM†)',
      sizes_de: '135×200 / 200×200 cm',
      sizes_eu: '240×220 cm',
      sizes_au: '210×210 / 245×210 cm',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '400 pcs per colourway†',
    hs_code: '630231',
    lead_time_en: '30 days† · FOB Tuticorin / CIF Rotterdam',
    lead_time_de: '30 Tage† · FOB Tuticorin / CIF Rotterdam',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam'],
    image_urls: [
      '/images/products/sateen-hotel-duvet-cover.webp',
      '/images/studio/colourway-slate.webp',
    ],
    published: true,
    sort_order: 3,
  },
  {
    id: '11111111-2222-3333-4444-555555550004',
    slug: 'aegean-combed-bath-towel',
    category: 'Bath',
    category_de: 'Badtextilien',
    name_en: 'Zero-Twist Combed Terry Bath Sheet',
    name_de: 'Zero-Twist-Frottier-Badetuch',
    description_en:
      'High-loft zero-twist terry loops with double-stitchedlock hems and custom woven hanging loop, vat-dyed for 60°C wash fastness.',
    description_de:
      'Voluminöses Zero-Twist-Frottier mit Doppelnähten und gewebtem Aufhänger, küpengefärbt für hohe Farbechtheit bei 60 °C.',
    specs: {
      fibre_en: '100% Zero-Twist Combed Ring-Spun Cotton',
      fibre_de: '100 % Zero-Twist gekämmte Baumwolle',
      density: '600 GSM†',
      sizes_de: '70×140 cm · 100×150 cm',
      sizes_eu: '70×140 cm · 100×150 cm',
      sizes_au: '90×170 cm Bath Sheet',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '500 pcs per colourway†',
    hs_code: '630260',
    lead_time_en: '30 days† · CIF Rotterdam / Hamburg',
    lead_time_de: '30 Tage† · CIF Rotterdam / Hamburg',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/aegean-combed-bath-towel.webp',
      '/images/studio/colourway-terracotta.webp',
    ],
    published: true,
    sort_order: 4,
  },
  {
    id: '11111111-2222-3333-4444-555555550005',
    slug: 'waffle-weave-spa-robe',
    category: 'Bath',
    category_de: 'Badtextilien',
    name_en: 'Honeycomb Waffle Weave Bath Towel',
    name_de: 'Waffelpiqué-Badetuch & Saunatuch',
    description_en:
      'Deep dimensional honeycomb pocket weave in cotton-linen blend that dries rapidly and compacts neatly for spa and coastal retail programs.',
    description_de:
      'Dreidimensionales Waffelpiqué aus Baumwoll-Leinen-Mischung, schnelltrocknend und kompakt für Spa- und Wellness-Kollektionen.',
    specs: {
      fibre_en: '80% Organic Cotton / 20% Linen Waffle',
      fibre_de: '80 % Bio-Baumwolle / 20 % Leinen-Waffelpiqué',
      density: '420 GSM†',
      sizes_de: '80×200 cm Saunatuch',
      sizes_eu: '75×150 cm Bath',
      sizes_au: '90×165 cm Coastal Sheet',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '400 pcs per colourway†',
    hs_code: '630260',
    lead_time_en: '32 days† · CIF Rotterdam',
    lead_time_de: '32 Tage† · CIF Rotterdam',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/waffle-weave-spa-robe.webp',
      '/images/studio/colourway-ochre.webp',
    ],
    published: true,
    sort_order: 5,
  },
  {
    id: '11111111-2222-3333-4444-555555550006',
    slug: 'yarn-dyed-kitchen-towel',
    category: 'Kitchen',
    category_de: 'Tisch & Küche',
    name_en: 'Yarn-Dyed Herringbone Tea Towel Set',
    name_de: 'Garngefärbtes Fischgrät-Geschirrtuch-Set',
    description_en:
      'Classic Karur yarn-dyed herringbone kitchen cloths bundled in kraft belly bands of three, woven from GRS-traceable recycled cotton blend.',
    description_de:
      'Klassische garngefärbte Fischgrät-Geschirrtücher im 3er-Kraftpapier-Banderolen-Set aus recycelter Baumwollmischung.',
    specs: {
      fibre_en: '70% Combed Cotton / 30% Recycled Cotton',
      fibre_de: '70 % Baumwolle / 30 % Recycelte Baumwolle',
      density: '240 GSM†',
      sizes_de: '50×70 cm (3er-Set)',
      sizes_eu: '50×70 cm (Set of 3)',
      sizes_au: '50×70 cm (Set of 3)',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '1,000 sets per colourway†',
    hs_code: '630291',
    lead_time_en: '28 days† · FOB Tuticorin',
    lead_time_de: '28 Tage† · FOB Tuticorin',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam'],
    image_urls: [
      '/images/products/yarn-dyed-kitchen-towel.webp',
      '/images/studio/colourway-indigo.webp',
    ],
    published: true,
    sort_order: 6,
  },
  {
    id: '11111111-2222-3333-4444-555555550007',
    slug: 'washed-linen-table-runner',
    category: 'Kitchen',
    category_de: 'Tisch & Küche',
    name_en: 'Mitered-Hem Washed Linen Table Runner',
    name_de: 'Tischläufer aus gewaschenem Leinen mit Briefecke',
    description_en:
      'Architectural 3 cm mitered-corner table runner and matching napkin program with soil-release enzyme finish for dining collections.',
    description_de:
      'Tischläufer mit präziser 3-cm-Briefecke und passenden Stoffservietten aus enzymgewaschenem Halbleinen.',
    specs: {
      fibre_en: '55% European Linen / 45% Combed Cotton',
      fibre_de: '55 % Leinen / 45 % Gekämmte Baumwolle',
      density: '210 GSM†',
      sizes_de: '45×180 cm · 50×250 cm',
      sizes_eu: '45×200 cm · 45×45 cm Napkin',
      sizes_au: '45×220 cm Dining Runner',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '500 pcs per colourway†',
    hs_code: '630252',
    lead_time_en: '30 days† · CIF Rotterdam / Hamburg',
    lead_time_de: '30 Tage† · CIF Rotterdam / Hamburg',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/washed-linen-table-runner.webp',
      '/images/studio/colourway-flax.webp',
    ],
    published: true,
    sort_order: 7,
  },
  {
    id: '11111111-2222-3333-4444-555555550008',
    slug: 'boucle-textured-cushion-cover',
    category: 'Living',
    category_de: 'Wohnen',
    name_en: 'Slub-Woven Bouclé Cushion Cover',
    name_de: 'Kissenbezug aus Bouclé-Strukturgewebe',
    description_en:
      'Tactile multi-ply bouclé and slub yarns woven on rapier looms with knife-edge or flanged borders and heavy brass YKK concealed zip.',
    description_de:
      'Griffiges Bouclé- und Flammgarngewebe vom Greiferwebstuhl mit Stehsaum oder Paspel und verdecktem Marken-Reißverschluss.',
    specs: {
      fibre_en: '85% Textured Cotton Slub / 15% Linen',
      fibre_de: '85 % Baumwoll-Bouclé / 15 % Leinen',
      density: '380 GSM†',
      sizes_de: '50×50 cm · 40×60 cm',
      sizes_eu: '50×50 cm · 60×60 cm',
      sizes_au: '55×55 cm Euro Cushion',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '400 pcs per colourway†',
    hs_code: '630492',
    lead_time_en: '28 days† · FOB Tuticorin',
    lead_time_de: '28 Tage† · FOB Tuticorin',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/boucle-textured-cushion-cover.webp',
      '/images/studio/colourway-ochre.webp',
    ],
    published: true,
    sort_order: 8,
  },
  {
    id: '11111111-2222-3333-4444-555555550009',
    slug: 'herringbone-fringed-throw',
    category: 'Living',
    category_de: 'Wohnen',
    name_en: 'Brushed Herringbone Sofa Throw',
    name_de: 'Gebürstetes Fischgrät-Sofaplaid mit Fransen',
    description_en:
      'Generously scaled sofa and bed throw with hand-knotted 8 cm warp fringes, lightly brushed for a cashmere-soft loft.',
    description_de:
      'Großzügiges Sofa- und Bettplaid mit handgeknoteten 8-cm-Kettfransen, leicht angeraut für besonders weichen Griff.',
    specs: {
      fibre_en: '100% Combed & Recycled Cotton Jacquard',
      fibre_de: '100 % Baumwoll-Jacquard (recycelt)',
      density: '340 GSM†',
      sizes_de: '150×200 cm Wohnplaid',
      sizes_eu: '140×200 cm · 170×220 cm',
      sizes_au: '150×220 cm Bed Throw',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '300 pcs per colourway†',
    hs_code: '630492',
    lead_time_en: '32 days† · CIF Rotterdam / Melbourne',
    lead_time_de: '32 Tage† · CIF Rotterdam / Melbourne',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/herringbone-fringed-throw.webp',
      '/images/studio/colourway-terracotta.webp',
    ],
    published: true,
    sort_order: 9,
  },
  {
    id: '11111111-2222-3333-4444-555555550010',
    slug: 'quilted-matelasse-bedspread',
    category: 'Bed',
    category_de: 'Bettwäsche',
    name_en: 'Loom-Quilted Matelassé Coverlet',
    name_de: 'Gewebter Matelassé-Tagesdeckenüberwurf',
    description_en:
      'Double-cloth jacquard matelassé woven with pocketed weft yarns that create a sculpted quilted relief directly on the loom without synthetic batting.',
    description_de:
      'Doppelgewebter Jacquard-Matelassé mit plastischem Relief direkt vom Webstuhl – ganz ohne synthetische Wattierung.',
    specs: {
      fibre_en: '100% Yarn-Dyed Double-Cloth Cotton',
      fibre_de: '100 % Garngefärbtes Doppelgewebe',
      density: '450 GSM†',
      sizes_de: '220×240 cm · 240×260 cm',
      sizes_eu: '240×260 cm · 260×260 cm',
      sizes_au: '260×240 cm King Coverlet',
    },
    colourways: SEASONAL_COLOURWAYS.slice(0, 4),
    moq: '200 pcs per colourway†',
    hs_code: '630419',
    lead_time_en: '38 days† · CIF Hamburg / Rotterdam',
    lead_time_de: '38 Tage† · CIF Hamburg / Rotterdam',
    incoterms: ['FOB Tuticorin', 'CIF Hamburg', 'CIF Rotterdam', 'CIF Melbourne'],
    image_urls: [
      '/images/products/quilted-matelasse-bedspread.webp',
      '/images/studio/colourway-sage.webp',
    ],
    published: true,
    sort_order: 10,
  },
];

export interface RoomHotspot {
  id: string;
  pinNumber: string;
  xPercent: number;
  yPercent: number;
  productSlug: string;
  title_en: string;
  title_de: string;
  weave_en: string;
  weave_de: string;
  metric: string;
  image: string;
}

export const ROOM_HOTSPOTS: RoomHotspot[] = [
  {
    id: 'pin-duvet',
    pinNumber: '01',
    xPercent: 44,
    yPercent: 52,
    productSlug: 'washed-percale-duvet-set',
    title_en: 'Washed Organic Percale Duvet Set',
    title_de: 'Gewaschenes Bio-Perkal-Bettwäsche-Set',
    weave_en: 'Enzyme-Washed Combed Percale',
    weave_de: 'Enzymgewaschener Baumwoll-Perkal',
    metric: '200 TC†',
    image: '/images/products/washed-percale-duvet-set.webp',
  },
  {
    id: 'pin-sheet',
    pinNumber: '02',
    xPercent: 56,
    yPercent: 36,
    productSlug: 'flax-linen-sheet-set',
    title_en: 'European Flax Linen Pillow & Sheet Set',
    title_de: 'Reinleinen-Kissen- & Bettlakenset',
    weave_en: 'Wet-Spun European Flax',
    weave_de: 'Nassgesponnenes Europäisches Leinen',
    metric: '170 GSM†',
    image: '/images/products/flax-linen-sheet-set.webp',
  },
  {
    id: 'pin-throw',
    pinNumber: '03',
    xPercent: 31,
    yPercent: 68,
    productSlug: 'herringbone-fringed-throw',
    title_en: 'Brushed Herringbone Bed & Sofa Throw',
    title_de: 'Gebürstetes Fischgrät-Sofaplaid',
    weave_en: 'Recycled Cotton Jacquard',
    weave_de: 'Recycelter Baumwoll-Jacquard',
    metric: '340 GSM†',
    image: '/images/products/herringbone-fringed-throw.webp',
  },
  {
    id: 'pin-bath',
    pinNumber: '04',
    xPercent: 78,
    yPercent: 58,
    productSlug: 'aegean-combed-bath-towel',
    title_en: 'Zero-Twist Combed Terry Bath Sheet',
    title_de: 'Zero-Twist-Frottier-Badetuch',
    weave_en: 'High-Loft Zero-Twist Ring-Spun',
    weave_de: 'Voluminöses Zero-Twist-Frottier',
    metric: '600 GSM†',
    image: '/images/products/aegean-combed-bath-towel.webp',
  },
];
