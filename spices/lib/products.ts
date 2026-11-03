export type SpiceCategory = 'Whole' | 'Ground' | 'Seeds' | 'Blends';

export interface ProductSpec {
  grade: string;
  moisture: string;
  volatileOil: string;
  origin: string;
  moq: string;
  packaging: string;
  hsCode: string;
  leadTime: string;
  incoterms: string;
  portOfLoading: string;
  extraLabel?: string;
  extraValue?: string;
}

export interface SpiceProduct {
  slug: string;
  name: string;
  botanicalName: string;
  category: SpiceCategory;
  tags: SpiceCategory[];
  featured: boolean;
  shortSummary: string;
  description: string;
  gradesAvailable: string[];
  harvestWindow: string;
  sterilisationMethod: string;
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
  specs: ProductSpec;
  rfqPlaceholder: string;
}

export const COMPANY = {
  name: 'Elakkaya Spice Exports',
  shortName: 'Elakkaya',
  tagline: 'Whole & Ground Spices from the High Ranges of Kerala',
  location: 'Willingdon Island, Kochi, Kerala 682003, India [fictional]',
  processingUnit: 'Idukki Road, Thodupuzha, Kerala 685584, India [fictional]',
  email: 'exports@elakkaya-spices.example',
  portOfLoading: 'Kochi (INCOK)',
  markets: ['United Arab Emirates', 'United Kingdom', 'United States'],
} as const;

export const PRODUCTS: SpiceProduct[] = [
  {
    slug: 'black-pepper',
    name: 'Malabar Black Pepper',
    botanicalName: 'Piper nigrum L.',
    category: 'Whole',
    tags: ['Whole', 'Ground'],
    featured: true,
    shortSummary:
      'High-piperine Malabar Garbled (MG1), 500 g/L and 550 g/L steam-sterilised lots from Idukki smallholder vines.',
    description:
      'Harvested at full maturity from shade-grown panniyur and karimunda vines across the Idukki high ranges, our black pepper is sun-dried on raised bamboo mats, gravity-tabled, colour-sorted and steam-sterilised before packing. Every export lot is accompanied by a full Certificate of Analysis covering bulk density, moisture, piperine, aflatoxin and pesticide residue panels.',
    gradesAvailable: [
      'Malabar Garbled 1 (MG1)',
      '500 g/L Bulk Density (500 GL)',
      '550 g/L Extra Bold (550 GL)',
      '600 g/L Tellicherry Garbled Extra Bold (TGEB)',
      'Steam-Sterilised Ground (30–60 Mesh)',
    ],
    harvestWindow: 'December – March (main crop)',
    sterilisationMethod: 'Continuous HTST dry saturated steam (validated 5-log reduction)',
    images: [
      {
        src: '/images/products/black-pepper-1.webp',
        alt: 'Macro heap of whole Malabar Garbled black peppercorns on dark wood in warm side light',
        caption: 'Malabar Garbled 550 g/L lot — uniform 4.2–4.8 mm bold berries (sample figure)',
      },
      {
        src: '/images/products/black-pepper-2.webp',
        alt: 'Black peppercorns pouring from a stainless steel scoop into a clean jute export sack',
        caption: 'Pre-shipment lot sampling into food-grade poly-lined jute bags',
      },
    ],
    specs: {
      grade: 'Malabar Garbled MG1 / 500 GL / 550 GL (sample figure)',
      moisture: 'Max 11.0% w/w (sample figure)',
      volatileOil: '2.5% – 3.8% v/w; Piperine 4.5% – 5.8% (sample figure)',
      origin: 'Idukki & Wayanad districts, Kerala, India',
      moq: '2,000 kg (LCL) / 14,000 kg per 20\' FCL (sample figure)',
      packaging: '25 kg multi-wall kraft paper bags or 25 kg / 50 kg new jute bags with food-grade LDPE liner',
      hsCode: '0904',
      leadTime: '14 – 18 days from order confirmation & artwork sign-off (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Extraneous Matter',
      extraValue: 'Max 0.5% w/w; Light berries max 2.0% (sample figure)',
    },
    rfqPlaceholder: 'e.g. Black pepper 550 GL steam-sterilised, 14 MT, 25 kg kraft bags',
  },
  {
    slug: 'green-cardamom',
    name: 'Alleppey Green Cardamom',
    botanicalName: 'Elettaria cardamomum Maton',
    category: 'Whole',
    tags: ['Whole', 'Seeds'],
    featured: true,
    shortSummary:
      'Kiln-cured 7–8 mm and 8 mm+ extra-bold green pods from the Cardamom Hills Reserve in Idukki.',
    description:
      'Picked by hand at the three-quarter ripe stage across the misty slopes of Udumbanchola and Peermade, our green cardamom is cured within 6 hours in temperature-controlled indirect-flue chambers to lock in its natural parrot-green colour and 1,8-cineole aroma. Graded on precision rotary sieves and packed under nitrogen-flushed barrier liners for Middle East and European buyers.',
    gradesAvailable: [
      'AGEB — Alleppey Green Extra Bold (8 mm+, ≥ 435 g/L)',
      'AGB — Alleppey Green Bold (7 – 8 mm, ≥ 415 g/L)',
      'AGS — Alleppey Green Superior (6.5 – 7.5 mm, ≥ 385 g/L)',
      'Decorticated Cardamom Seeds (≥ 600 g/L)',
    ],
    harvestWindow: 'August – February (multiple pickings)',
    sterilisationMethod: 'Low-temperature indirect curing + UV/ozone surface sanitation',
    images: [
      {
        src: '/images/products/green-cardamom-1.webp',
        alt: 'Close-up of plump uniform 7 to 8 mm green cardamom pods on natural cream linen',
        caption: 'AGEB 7.5–8.5 mm lot — deep green colour retention (sample figure)',
      },
      {
        src: '/images/products/green-cardamom-2.webp',
        alt: 'Hands holding a brass bowl of green cardamom pods with a blurred Kerala drying yard behind',
        caption: 'Freshly cured pods inspected for split percentage and liter weight',
      },
    ],
    specs: {
      grade: 'AGEB 8 mm+ / AGB 7–8 mm / Decorticated Seeds (sample figure)',
      moisture: 'Max 10.5% w/w (sample figure)',
      volatileOil: '5.5% – 7.5% v/w (sample figure)',
      origin: 'Cardamom Hills (Idukki), Kerala, India',
      moq: '500 kg air/sea LCL / 5,000 kg container load (sample figure)',
      packaging: '5 kg × 4 vacuum/nitrogen-flushed barrier pouches in 20 kg master corrugated cartons',
      hsCode: '0908',
      leadTime: '10 – 15 days from order confirmation (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark, CIP Dubai Airport',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Thrips / Splits',
      extraValue: 'Open/split pods max 3.0%; Blacks/immature max 1.0% (sample figure)',
    },
    rfqPlaceholder: 'e.g. Green cardamom AGB 7–8 mm, 2 MT, 5 kg × 4 cartons CIF Jebel Ali',
  },
  {
    slug: 'turmeric',
    name: 'Alleppey Finger & Ground Turmeric',
    botanicalName: 'Curcuma longa L.',
    category: 'Ground',
    tags: ['Ground', 'Whole'],
    featured: true,
    shortSummary:
      'High-curcumin (5.0%–6.2% sample figure) polished fingers and cryogenic-milled powder free of Sudan dyes and lead chromate.',
    description:
      'Sourced from heirloom Alleppey and Pragati rhizome clusters in Wayanad and neighbouring Erode tracts, our turmeric is steam-cooked, sun-dried to a clean metallic snap, and double-polished without artificial colourants. For food manufacturers and private-label packers, we mill whole fingers on chilled hammer-and-pin lines to preserve volatile turmerones and deliver uniform 60–80 mesh powder.',
    gradesAvailable: [
      'Alleppey Finger Turmeric — High Curcumin (5.0% – 6.2%)',
      'Madras / Erode Polished Fingers (3.0% – 4.0% Curcumin)',
      'Steam-Sterilised Ground Turmeric (60 Mesh / 80 Mesh)',
      'Mother Rhizome Bulbs (Splits & Whole)',
    ],
    harvestWindow: 'January – April',
    sterilisationMethod: 'Steam sterilisation prior to or post milling per buyer spec',
    images: [
      {
        src: '/images/products/turmeric-1.webp',
        alt: 'Whole dried turmeric finger rhizomes stacked next to golden turmeric powder on dark slate',
        caption: 'Unadulterated Alleppey fingers and 60-mesh cryogenic-milled powder',
      },
      {
        src: '/images/products/turmeric-2.webp',
        alt: 'Macro texture of bright golden turmeric powder with a dark wooden spoon',
        caption: 'Fine 60-mesh ground turmeric — tested free of Sudan I–IV and lead chromate',
      },
    ],
    specs: {
      grade: 'Alleppey High-Curcumin Fingers & 60–80 Mesh Powder (sample figure)',
      moisture: 'Max 10.0% w/w (sample figure)',
      volatileOil: '3.5% – 5.0% v/w; Curcuminoid content 5.0% – 6.2% HPLC (sample figure)',
      origin: 'Wayanad, Kerala & Erode belt, South India',
      moq: '3,000 kg (LCL) / 18,000 kg per 20\' FCL (sample figure)',
      packaging: '25 kg multi-wall kraft bags with food-grade liner or 25 kg HDPE-lined PP bags',
      hsCode: '0910',
      leadTime: '14 – 20 days from order confirmation (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Acid-Insoluble Ash',
      extraValue: 'Max 1.0% w/w; Lead < 1.5 ppm; Chromate negative (sample figure)',
    },
    rfqPlaceholder: 'e.g. Ground turmeric 5% curcumin steam-sterilised, 18 MT, 25 kg kraft bags',
  },
  {
    slug: 'dried-chilli',
    name: 'Byadgi & Teja Dried Red Chilli (Whole & Crushed Blends)',
    botanicalName: 'Capsicum annuum L.',
    category: 'Blends',
    tags: ['Blends', 'Whole', 'Ground'],
    featured: true,
    shortSummary:
      'Custom ASTA-colour and Scoville-heat lots: wrinkled high-colour Byadgi, high-pungency S17 Teja, crushed flakes and custom blends.',
    description:
      'We supply whole stemless and with-stem red chillies alongside custom-blended crushed flakes and ground chilli engineered to exact ASTA colour (80–160 ASTA) and Scoville heat (15,000–75,000 SHU) targets. Every lot is cold-stored at 4 °C prior to processing and screened by LC-MS/MS for aflatoxin B1/total, ochratoxin A, Sudan dyes and EU/FDA pesticide MRL compliance.',
    gradesAvailable: [
      'Byadgi Kaddi / Dabbi Whole (110 – 150 ASTA, low heat)',
      'S17 Teja Whole Stemless (55,000 – 75,000 SHU, high heat)',
      'Custom Blend Ground Chilli (calibrated ASTA + SHU to buyer spec)',
      'Crushed Chilli Flakes (3 – 5 mm, controlled seed ratio 15% – 25%)',
    ],
    harvestWindow: 'January – May (cold-stored year-round)',
    sterilisationMethod: 'HTST steam treatment with colour-retention cooling',
    images: [
      {
        src: '/images/products/dried-chilli-1.webp',
        alt: 'Macro heap of deep crimson dried Byadgi red chillies with wrinkled skins',
        caption: 'High-ASTA wrinkled Byadgi pods — cold-stored to prevent colour fade',
      },
      {
        src: '/images/products/dried-chilli-2.webp',
        alt: 'Dried red Teja chillies and crushed chilli flakes in warm warehouse light',
        caption: 'S17 Teja high-pungency lot — available whole, stemless, crushed or blended',
      },
    ],
    specs: {
      grade: 'Byadgi (110–150 ASTA) / S17 Teja (55k–75k SHU) / Custom Blends (sample figure)',
      moisture: 'Max 10.5% w/w (sample figure)',
      volatileOil: 'Capsaicinoids 0.15% – 0.55% HPLC; Colour 80 – 150 ASTA (sample figure)',
      origin: 'South Indian growing tracts, processed & blended in Kerala',
      moq: '3,000 kg (LCL) / 12,000 kg whole or 16,000 kg ground per 20\' FCL (sample figure)',
      packaging: '10 kg / 15 kg compressed bales (whole) or 25 kg kraft bags with barrier liner (ground/flakes)',
      hsCode: '0904',
      leadTime: '14 – 21 days from order confirmation (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Mycotoxin Guarantee',
      extraValue: 'Aflatoxin B1 < 5 ppb, Total < 10 ppb; Ochratoxin A < 15 ppb (sample figure)',
    },
    rfqPlaceholder: 'e.g. Crushed chilli blend 100 ASTA / 35,000 SHU, 15 MT, 25 kg kraft bags',
  },
  {
    slug: 'cloves',
    name: 'Hand-Picked Whole Cloves',
    botanicalName: 'Syzygium aromaticum (L.) Merr. & L.M.Perry',
    category: 'Whole',
    tags: ['Whole', 'Ground'],
    featured: false,
    shortSummary:
      'Reddish-brown unopened flower buds from Kottayam and Kanyakumari hill gardens, high eugenol oil content.',
    description:
      'Harvested just as the calyx turns pink-gold before petals open, our South Indian hill cloves are sun-dried on clean coir mats for 4–5 days until crisp and aromatic. Hand-picked (HPS) grades deliver ≥ 95% headless/whole crown integrity and rich eugenol essential oil levels ideal for spice packers, bakery blends and extraction houses.',
    gradesAvailable: [
      'Hand-Picked Selected (HPS) Whole Buds (< 2% stems)',
      'CG1 Standard Export Whole Cloves',
      'Steam-Sterilised Ground Cloves (50 Mesh)',
    ],
    harvestWindow: 'January – April',
    sterilisationMethod: 'Gentle low-residence steam treatment preserving volatile eugenol',
    images: [
      {
        src: '/images/products/cloves-1.webp',
        alt: 'Macro heap of whole dried cloves on warm dark wood in golden sunlight',
        caption: 'HPS grade — plump reddish-brown buds with intact crowns',
      },
      {
        src: '/images/products/cloves-2.webp',
        alt: 'Whole cloves inspected on a natural surface for stem and headless percentage',
        caption: 'Gravity-separated and hand-sorted to < 2% clove stems (sample figure)',
      },
    ],
    specs: {
      grade: 'HPS Hand-Picked Selected / CG1 Export Standard (sample figure)',
      moisture: 'Max 11.0% w/w (sample figure)',
      volatileOil: '15.0% – 18.5% v/w (Eugenol ≥ 80% of oil) (sample figure)',
      origin: 'Southern Western Ghats (Kerala & Kanyakumari hills), India',
      moq: '1,000 kg (LCL) / 10,000 kg per 20\' FCL (sample figure)',
      packaging: '20 kg corrugated cartons with poly liner or 25 kg new jute bags',
      hsCode: '0907',
      leadTime: '12 – 18 days from order confirmation (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Headless / Stems',
      extraValue: 'Headless cloves max 4.0%; Stems & mother cloves max 2.0% (sample figure)',
    },
    rfqPlaceholder: 'e.g. Whole cloves HPS grade, 5 MT, 20 kg cartons FOB Kochi',
  },
  {
    slug: 'nutmeg-mace',
    name: 'Kalady Nutmeg Kernels & Crimson Mace',
    botanicalName: 'Myristica fragrans Houtt.',
    category: 'Seeds',
    tags: ['Seeds', 'Whole', 'Ground'],
    featured: false,
    shortSummary:
      'Periyar river-basin nutmeg kernels (ABCD & sound unassorted) and whole crimson-amber mace blades.',
    description:
      'Grown in the humid homestead agro-forests along the Periyar and Chalakudy river basins in central Kerala, our nutmeg is cured on slatted drying racks for 6 weeks before mechanical cracking and acoustic sorting to eliminate worm-damaged or mouldy kernels. Mace arils are flattened and shade-dried to preserve their bright scarlet-amber hue.',
    gradesAvailable: [
      'Nutmeg Without Shell — ABCD Sound Assorted (80–110 count/lb)',
      'Nutmeg In-Shell — Bold Whole',
      'Whole Red/Amber Mace Blades (Grade 1)',
      'Ground Nutmeg / Ground Mace (Steam-Sterilised, 40–60 Mesh)',
    ],
    harvestWindow: 'June – October (peak), year-round secondary pickings',
    sterilisationMethod: 'HTST steam sterilisation + mandatory aflatoxin B1/total clearance',
    images: [
      {
        src: '/images/products/nutmeg-mace-1.webp',
        alt: 'Whole nutmeg kernels and scarlet mace arils on dark wood',
        caption: 'Periyar valley nutmeg kernels with natural crimson mace aril',
      },
      {
        src: '/images/products/nutmeg-mace-2.webp',
        alt: 'Close-up of dried nutmeg and mace spice blades',
        caption: 'Sound ABCD kernels — acoustically sorted and tested for aflatoxin',
      },
    ],
    specs: {
      grade: 'ABCD Sound Kernels (80–110/lb) & Grade 1 Whole Mace Blades (sample figure)',
      moisture: 'Max 9.5% w/w (nutmeg) / Max 10.0% w/w (mace) (sample figure)',
      volatileOil: '7.0% – 11.0% v/w (nutmeg) / 10.0% – 14.0% v/w (mace) (sample figure)',
      origin: 'Ernakulam, Thrissur & Kottayam districts, Kerala, India',
      moq: '1,000 kg (LCL) / 13,500 kg per 20\' FCL (sample figure)',
      packaging: '25 kg kraft paper bags (nutmeg) / 10 kg barrier cartons (mace)',
      hsCode: '0908',
      leadTime: '14 – 18 days from order confirmation (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Aflatoxin Compliance',
      extraValue: 'EU regulated limit: B1 < 5 ppb, Total < 10 ppb verified per lot (sample figure)',
    },
    rfqPlaceholder: 'e.g. Nutmeg without shell ABCD grade, 5 MT + Whole Mace 500 kg',
  },
  {
    slug: 'cassia-cinnamon',
    name: 'Malabar Cassia & Cinnamon Quills',
    botanicalName: 'Cinnamomum cassia & Cinnamomum verum',
    category: 'Whole',
    tags: ['Whole', 'Ground', 'Blends'],
    featured: false,
    shortSummary:
      'High-cinnamaldehyde split cassia quills, cigarette-cut tubes, broken bark and fine bakery-grade ground cinnamon.',
    description:
      'Selected from mature hill plantations and cured to a warm mahogany curl, our cassia and true cinnamon lots are graded by bark thickness, volatile oil content and coumarin specification. We supply whole split quills, precision-cut 8 cm sticks for retail packers, and high-aroma 60-mesh ground cinnamon for industrial bakeries and beverage blenders.',
    gradesAvailable: [
      'Split Cassia Quills — Whole Export Grade (30–40 cm)',
      'Cut Sticks / Cigarette Quills (8 cm / 10 cm uniform)',
      'Cleaned Cassia Broken Bark ( Milling Grade)',
      'Steam-Sterilised Ground Cinnamon (60 Mesh, 2.0%+ Volatile Oil)',
    ],
    harvestWindow: 'May – September',
    sterilisationMethod: 'Dry steam sterilisation + metal detection (Fe 1.0 mm, Non-Fe 1.2 mm, SS 1.5 mm)',
    images: [
      {
        src: '/images/products/cassia-cinnamon-1.webp',
        alt: 'Bundles of dried cassia cinnamon quills tied with natural jute twine',
        caption: 'Uniform cut quills and whole split bark rolls',
      },
      {
        src: '/images/products/cassia-cinnamon-2.webp',
        alt: 'Close-up texture of cassia cinnamon bark pieces and ground cinnamon',
        caption: 'High-oil bark pieces selected for industrial milling and extraction',
      },
    ],
    specs: {
      grade: 'Whole Split Quills / 8 cm Cut Sticks / 60 Mesh Ground (sample figure)',
      moisture: 'Max 11.5% w/w (sample figure)',
      volatileOil: '1.8% – 3.2% v/w (Cinnamaldehyde ≥ 75%) (sample figure)',
      origin: 'Western Ghats foothills, South India',
      moq: '2,000 kg (LCL) / 7,500 kg whole or 15,000 kg ground per 20\' FCL (sample figure)',
      packaging: '10 kg / 20 kg telescopic master cartons (quills) or 25 kg kraft bags (ground)',
      hsCode: '0906',
      leadTime: '14 – 18 days from order confirmation (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Microbiological Spec',
      extraValue: 'TPC < 10,000 CFU/g; Salmonella absent in 25 g; E. coli < 10 CFU/g (sample figure)',
    },
    rfqPlaceholder: 'e.g. Cassia cinnamon 60 mesh ground steam-sterilised, 10 MT, 25 kg bags',
  },
  {
    slug: 'dry-ginger',
    name: 'Cochin Unbleached Dry Ginger (Whole, Slices & Powder)',
    botanicalName: 'Zingiber officinale Roscoe',
    category: 'Ground',
    tags: ['Ground', 'Whole', 'Blends'],
    featured: false,
    shortSummary:
      'Lemon-warm Cochin ginger rhizomes with pungent gingerol bite — whole unbleached hands, kibbled cuts for tea bags and fine powder.',
    description:
      'Cochin dry ginger from Wayanad and Idukki is prized worldwide for its bright citrus top-note and low fibre content compared to fibrous African origins. We peel the outer cork skin lightly by hand, sun-dry without sulphur bleaching, and process into whole hands, 2–4 mm tea-bag kibbled cuts, or free-flowing 60-mesh ginger powder.',
    gradesAvailable: [
      'NUGC — Non-Bleached Unassorted Good Cochin (Whole Hands)',
      'Tea-Bag Cut / Kibbled Dry Ginger (2 – 4 mm dust-free)',
      'Steam-Sterilised Ground Ginger Powder (60 Mesh)',
      'Custom Chai & Bakery Spice Blend Base (Ginger + Cardamom + Cassia)',
    ],
    harvestWindow: 'December – March',
    sterilisationMethod: 'HTST steam treatment + sifter & rare-earth magnetic separation (12,000 Gauss)',
    images: [
      {
        src: '/images/products/dry-ginger-1.webp',
        alt: 'Pale unbleached dried Cochin ginger rhizomes on coarse jute fabric',
        caption: 'NUGC unbleached whole Cochin ginger — sulphur-free sun drying',
      },
      {
        src: '/images/products/dry-ginger-2.webp',
        alt: 'Dried ginger slices and fine ground ginger powder close-up',
        caption: 'Kibbled 2–4 mm tea cuts and 60-mesh steam-sterilised powder',
      },
    ],
    specs: {
      grade: 'NUGC Unbleached Whole / 2–4 mm Kibbled / 60 Mesh Powder (sample figure)',
      moisture: 'Max 10.5% w/w (sample figure)',
      volatileOil: '1.8% – 2.8% v/w; Total Gingerols 1.2% – 1.8% HPLC (sample figure)',
      origin: 'Wayanad & Idukki districts, Kerala, India',
      moq: '2,000 kg (LCL) / 12,000 kg whole or 16,000 kg ground per 20\' FCL (sample figure)',
      packaging: '25 kg new jute bags (whole) or 25 kg multi-wall kraft bags with poly liner (cuts/powder)',
      hsCode: '0910',
      leadTime: '14 – 18 days from order confirmation (sample figure)',
      incoterms: 'FOB Kochi (INCOK), CIF Jebel Ali / Felixstowe / Newark',
      portOfLoading: 'Kochi (INCOK)',
      extraLabel: 'Sulphur Dioxide (SO2)',
      extraValue: '< 10 ppm (unbleached, naturally sun-dried) (sample figure)',
    },
    rfqPlaceholder: 'e.g. Cochin dry ginger 2–4 mm tea cut steam-sterilised, 8 MT, 25 kg kraft bags',
  },
];

export function getProductBySlug(slug: string): SpiceProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const EXPORT_ROUTES = [
  {
    id: 'jebel-ali',
    port: 'Jebel Ali',
    country: 'United Arab Emirates',
    code: 'AEJEA',
    transitDays: '6 – 9 days sea freight (sample figure)',
    frequency: 'Weekly direct sailings ex-Kochi',
    buyers: 'GCC foodservice, spice re-export hubs & pulse/spice packers',
  },
  {
    id: 'felixstowe',
    port: 'Felixstowe',
    country: 'United Kingdom',
    code: 'GBFXT',
    transitDays: '22 – 26 days sea freight (sample figure)',
    frequency: 'Weekly via Colombo / Suez mainline services',
    buyers: 'UK retail private-label packers, herb & seasoning manufacturers',
  },
  {
    id: 'newark',
    port: 'New York / Newark',
    country: 'United States',
    code: 'USEWR',
    transitDays: '28 – 34 days sea freight (sample figure)',
    frequency: 'Weekly US East Coast container services',
    buyers: 'ASTA-grade spice importers, oleoresin extractors & food brands',
  },
] as const;

export const FARM_TO_PORT_STEPS = [
  {
    step: '01',
    title: 'Farm-Gate Sourcing',
    subtitle: 'Idukki & Wayanad High Ranges · 700–1,400 m elevation (sample figure)',
    description:
      'Every purchase lot is logged at collection centres in Nedumkandam, Adimali and Kalpetta with farmer group code, harvest week and field moisture reading. No anonymous market-yard commingling.',
    metric: '100% lot-coded to taluk & harvest week (sample figure)',
    image: '/images/story/step-sourcing.webp',
    alt: 'Farmer hands harvesting fresh green pepper spikes from vines in the misty hills of Idukki, Kerala',
  },
  {
    step: '02',
    title: 'Cleaning, Grading & Steam Sterilisation',
    subtitle: 'Thodupuzha Processing Line · Continuous HTST Steam',
    description:
      'Raw spice passes through destoners, gravity separators, optical colour sorters and 12,000-Gauss rare-earth magnets before validated dry-saturated steam sterilisation and rapid conditioned cooling.',
    metric: '5-log microbial reduction · < 0.2% extraneous matter (sample figure)',
    image: '/images/story/step-sorting.webp',
    alt: 'Hands sorting sun-dried black peppercorns on a woven tray in a clean processing shed',
  },
  {
    step: '03',
    title: 'Lot-by-Lot Laboratory Clearance',
    subtitle: 'In-House Physical/Chemical Lab + ISO 17025 Third-Party Panels',
    description:
      'Composite samples drawn per ASTA / ISO 948 sampling plans are tested for moisture, volatile oil, bulk density, aflatoxin B1/G1/B2/G2, ochratoxin A, 500+ pesticide residues by LC-MS/MS and Salmonella in 25 g.',
    metric: '48-hour COA turnaround before container stuffing (sample figure)',
    image: '/images/story/step-lab.webp',
    alt: 'Laboratory technician in gloves inspecting spice samples in petri dishes and test tubes',
  },
  {
    step: '04',
    title: 'Barrier Packing & Port Dispatch',
    subtitle: 'Willingdon Island & ICTT Vallarpadam, Kochi (INCOK)',
    description:
      'Cleared lots are packed in 25 kg multi-wall kraft bags or food-grade poly-lined jute sacks, palletised with desiccant blankets, and stuffed into inspected dry containers 45 km from our plant.',
    metric: '14–18 day typical FOB dispatch lead time (sample figure)',
    image: '/images/story/step-port.webp',
    alt: 'Plain unbranded jute and woven spice sacks stacked on pallets beside a shipping container at port',
  },
] as const;

export const QUALITY_PARAMETERS = [
  {
    parameter: 'Moisture Content',
    method: 'ASTA Method 2.0 / ISO 939 (Dean & Stark Toluene Distillation)',
    typicalLimit: '≤ 10.0% – 11.5% w/w depending on spice (sample figure)',
    frequency: 'Every incoming & outgoing lot',
  },
  {
    parameter: 'Aflatoxin B1 & Total (B1+B2+G1+G2)',
    method: 'Immunoaffinity column clean-up + HPLC-FLD (AOAC 991.31)',
    typicalLimit: 'B1 < 5.0 µg/kg (ppb); Total < 10.0 µg/kg (EU/UK limit, sample figure)',
    frequency: 'Every export lot (mandatory for pepper, chilli, nutmeg, turmeric, ginger)',
  },
  {
    parameter: 'Multi-Residue Pesticides (500+ molecules)',
    method: 'QuEChERS extraction + GC-MS/MS & LC-MS/MS (SANTE guideline)',
    typicalLimit: 'Compliant with EU Reg. 396/2005, UK GB MRLs & US EPA tolerances (sample figure)',
    frequency: 'Every export lot prior to container sealing',
  },
  {
    parameter: 'Salmonella spp. & E. coli',
    method: 'ISO 6579-1 (Salmonella in 25 g / 375 g) & ISO 16649-2 (β-glucuronidase E. coli)',
    typicalLimit: 'Salmonella: Absent in 25 g (or 375 g for US FDA lots); E. coli < 10 CFU/g (sample figure)',
    frequency: 'Every steam-sterilised batch',
  },
  {
    parameter: 'Volatile Oil & Active Markers',
    method: 'ASTA 5.0 Hydro-distillation; HPLC for Piperine, Curcumin & Capsaicinoids',
    typicalLimit: 'Pepper ≥ 2.5% v/w; Cardamom ≥ 5.5% v/w; Turmeric Curcumin ≥ 5.0% (sample figure)',
    frequency: 'Every incoming raw lot & finished batch',
  },
  {
    parameter: 'Adulterants & Forbidden Dyes',
    method: 'LC-MS/MS for Sudan I–IV, Para Red, Rhodamine B; ICP-MS for Lead/Chromate',
    typicalLimit: 'Not Detected (LOQ 0.01 mg/kg); Lead < 1.5 mg/kg (sample figure)',
    frequency: 'Every turmeric, chilli & mace lot',
  },
] as const;
