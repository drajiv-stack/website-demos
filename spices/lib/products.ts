export type SpiceCategory = 'Whole' | 'Ground' | 'Seeds' | 'Blends';

export interface ProductSpec {
  grade: string;
  packaging: string;
  moq: string;
  leadTime: string;
  hsCode: string;
}

export interface SpiceProduct {
  slug: string;
  name: string;
  botanicalName: string;
  category: SpiceCategory;
  originRegion: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
  specs: ProductSpec;
  rfqPlaceholder: string;
}

export const COMPANY = {
  name: 'Elakkaya Spice Exports',
  shortName: 'Elakkaya',
  tagline: 'Whole & Ground Spices from Kerala',
  location: 'Willingdon Island, Kochi, Kerala 682003, India [fictional]',
  processingUnit: 'Idukki Road, Thodupuzha, Kerala 685584, India [fictional]',
  email: 'exports@elakkaya-spices.example',
  portOfLoading: 'Kochi',
} as const;

export const PRODUCTS: SpiceProduct[] = [
  {
    slug: 'black-pepper',
    name: 'Malabar Black Pepper',
    botanicalName: 'Piper nigrum',
    category: 'Whole',
    originRegion: 'Idukki High Ranges',
    description:
      'Sun-cured on raised bamboo mats across the Idukki hills, gravity-sorted for bold berry density and steam-washed before container sealing in Kochi.',
    images: [
      {
        src: '/images/products/black-pepper-1.webp',
        alt: 'Macro heap of whole Malabar black peppercorns on dark wood in warm side light',
      },
      {
        src: '/images/products/black-pepper-2.webp',
        alt: 'Black peppercorns pouring from a stainless steel scoop into a clean jute export sack',
      },
    ],
    specs: {
      grade: 'Bold Whole Berry & Coarse Ground',
      packaging: '25 kg kraft paper or poly-lined jute bags†',
      moq: '2,000 kg†',
      leadTime: '14–18 days†',
      hsCode: '0904',
    },
    rfqPlaceholder: 'e.g. Malabar Black Pepper, 14 MT, 25 kg kraft bags',
  },
  {
    slug: 'green-cardamom',
    name: 'Alleppey Green Cardamom',
    botanicalName: 'Elettaria cardamomum',
    category: 'Whole',
    originRegion: 'Cardamom Hills Reserve',
    description:
      'Hand-picked at three-quarter ripeness in misty Udumbanchola estates and slow-cured within hours to lock in deep parrot-green colour and sweet camphoraceous aroma.',
    images: [
      {
        src: '/images/products/green-cardamom-1.webp',
        alt: 'Close-up of plump uniform green cardamom pods on natural cream linen',
      },
      {
        src: '/images/products/green-cardamom-2.webp',
        alt: 'Hands holding a brass bowl of green cardamom pods with a blurred Kerala drying yard behind',
      },
    ],
    specs: {
      grade: 'Extra-Bold Whole Pods & Decorticated Seeds',
      packaging: '5 kg barrier pouches in 20 kg master cartons†',
      moq: '500 kg†',
      leadTime: '10–15 days†',
      hsCode: '0908',
    },
    rfqPlaceholder: 'e.g. Alleppey Green Cardamom, 2 MT, 20 kg cartons',
  },
  {
    slug: 'turmeric',
    name: 'Alleppey Finger Turmeric',
    botanicalName: 'Curcuma longa',
    category: 'Ground',
    originRegion: 'Wayanad & Erode Tracts',
    description:
      'Heirloom deep-orange rhizomes steam-cooked, sun-dried to a clean metallic snap and cold-milled into vibrant aromatic powder with zero added colourants.',
    images: [
      {
        src: '/images/products/turmeric-1.webp',
        alt: 'Whole dried turmeric finger rhizomes stacked next to golden turmeric powder on dark slate',
      },
      {
        src: '/images/products/turmeric-2.webp',
        alt: 'Macro texture of bright golden turmeric powder with a dark wooden spoon',
      },
    ],
    specs: {
      grade: 'Polished Whole Fingers & Fine Milled Powder',
      packaging: '25 kg multi-wall kraft bags with barrier liner†',
      moq: '3,000 kg†',
      leadTime: '14–20 days†',
      hsCode: '0910',
    },
    rfqPlaceholder: 'e.g. Alleppey Turmeric Powder, 18 MT, 25 kg kraft bags',
  },
  {
    slug: 'dried-chilli',
    name: 'Byadgi & Teja Red Chilli',
    botanicalName: 'Capsicum annuum',
    category: 'Blends',
    originRegion: 'South Indian Plateau',
    description:
      'Deep-crimson wrinkled Byadgi pods for natural paprika colour alongside fiery Teja chillies, cold-stored at harvest and supplied whole, crushed or custom-blended.',
    images: [
      {
        src: '/images/products/dried-chilli-1.webp',
        alt: 'Macro heap of deep crimson dried Byadgi red chillies with wrinkled skins',
      },
      {
        src: '/images/products/dried-chilli-2.webp',
        alt: 'Dried red Teja chillies and crushed chilli flakes in warm warehouse light',
      },
    ],
    specs: {
      grade: 'Whole Stemless Pods, Crushed Flakes & Custom Blends',
      packaging: '15 kg compressed bales or 25 kg kraft bags†',
      moq: '3,000 kg†',
      leadTime: '14–21 days†',
      hsCode: '0904',
    },
    rfqPlaceholder: 'e.g. Crushed Red Chilli Blend, 15 MT, 25 kg kraft bags',
  },
  {
    slug: 'cloves',
    name: 'Hand-Picked Whole Cloves',
    botanicalName: 'Syzygium aromaticum',
    category: 'Whole',
    originRegion: 'Southern Western Ghats',
    description:
      'Unopened pink-gold flower buds harvested from high hill gardens in Kottayam and sun-dried on coir mats to preserve whole crowns and warm clove oil.',
    images: [
      {
        src: '/images/products/cloves-1.webp',
        alt: 'Macro heap of whole dried cloves on warm dark wood in golden sunlight',
      },
      {
        src: '/images/products/cloves-2.webp',
        alt: 'Whole cloves inspected on a natural surface',
      },
    ],
    specs: {
      grade: 'Hand-Picked Whole Crown Buds & Ground',
      packaging: '20 kg poly-lined cartons or 25 kg new jute bags†',
      moq: '1,000 kg†',
      leadTime: '12–18 days†',
      hsCode: '0907',
    },
    rfqPlaceholder: 'e.g. Hand-Picked Whole Cloves, 5 MT, 20 kg cartons',
  },
  {
    slug: 'nutmeg-mace',
    name: 'Periyar Nutmeg & Mace',
    botanicalName: 'Myristica fragrans',
    category: 'Seeds',
    originRegion: 'Periyar River Basin',
    description:
      'River-valley nutmeg cured on slatted racks for six weeks and acoustically sorted alongside hand-flattened scarlet mace blades.',
    images: [
      {
        src: '/images/products/nutmeg-mace-1.webp',
        alt: 'Whole nutmeg kernels and scarlet mace arils on dark wood',
      },
      {
        src: '/images/products/nutmeg-mace-2.webp',
        alt: 'Close-up of dried nutmeg and mace spice blades',
      },
    ],
    specs: {
      grade: 'Sound Whole Kernels & Scarlet Mace Blades',
      packaging: '25 kg kraft bags (nutmeg) or 10 kg cartons (mace)†',
      moq: '1,000 kg†',
      leadTime: '14–18 days†',
      hsCode: '0908',
    },
    rfqPlaceholder: 'e.g. Whole Nutmeg Kernels, 5 MT, 25 kg bags',
  },
  {
    slug: 'cassia-cinnamon',
    name: 'Malabar Cassia & Cinnamon',
    botanicalName: 'Cinnamomum verum & cassia',
    category: 'Whole',
    originRegion: 'Western Ghats Foothills',
    description:
      'Mature hill bark cured into warm mahogany quills, precision-cut sticks and fragrant bakery-grade ground cinnamon.',
    images: [
      {
        src: '/images/products/cassia-cinnamon-1.webp',
        alt: 'Bundles of dried cassia cinnamon quills tied with natural jute twine',
      },
      {
        src: '/images/products/cassia-cinnamon-2.webp',
        alt: 'Close-up texture of cassia cinnamon bark pieces and ground cinnamon',
      },
    ],
    specs: {
      grade: 'Whole Split Quills, Cut Sticks & Fine Ground',
      packaging: '20 kg telescopic master cartons or 25 kg kraft bags†',
      moq: '2,000 kg†',
      leadTime: '14–18 days†',
      hsCode: '0906',
    },
    rfqPlaceholder: 'e.g. Ground Cassia Cinnamon, 10 MT, 25 kg kraft bags',
  },
  {
    slug: 'dry-ginger',
    name: 'Cochin Unbleached Ginger',
    botanicalName: 'Zingiber officinale',
    category: 'Ground',
    originRegion: 'Wayanad Uplands',
    description:
      'Lightly hand-peeled Cochin ginger sun-dried without bleaching for a bright lemon-citrus top note, offered as whole hands, tea cuts or fine powder.',
    images: [
      {
        src: '/images/products/dry-ginger-1.webp',
        alt: 'Pale unbleached dried Cochin ginger rhizomes on coarse jute fabric',
      },
      {
        src: '/images/products/dry-ginger-2.webp',
        alt: 'Dried ginger slices and fine ground ginger powder close-up',
      },
    ],
    specs: {
      grade: 'Unbleached Whole Hands, Tea Cuts & Powder',
      packaging: '25 kg new jute or multi-wall kraft bags†',
      moq: '2,000 kg†',
      leadTime: '14–18 days†',
      hsCode: '0910',
    },
    rfqPlaceholder: 'e.g. Cochin Dry Ginger Tea Cuts, 8 MT, 25 kg kraft bags',
  },
];

export function getProductBySlug(slug: string): SpiceProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const FARM_TO_PORT_STEPS = [
  {
    step: '01',
    title: 'Estate Harvest',
    line: 'Hand-picked at peak volatile oil maturity across the Western Ghats.',
    image: '/images/story/step-sourcing.webp',
    alt: 'Farmer hands harvesting fresh green pepper spikes from vines in the misty hills of Idukki, Kerala',
  },
  {
    step: '02',
    title: 'Optical Grading',
    line: 'Gravity-separated and colour-sorted by berry density and size.',
    image: '/images/story/step-sorting.webp',
    alt: 'Hands sorting sun-dried black peppercorns on a woven tray in a clean processing shed',
  },
  {
    step: '03',
    title: 'Steam & Lab',
    line: 'Steam-sterilised and screened lot by lot before release.',
    image: '/images/story/step-lab.webp',
    alt: 'Laboratory technician in gloves inspecting spice samples in petri dishes and test tubes',
  },
  {
    step: '04',
    title: 'Kochi Loading',
    line: 'Sealed in moisture-locked liners at Vallarpadam port within 14 days†.',
    image: '/images/story/step-port.webp',
    alt: 'Plain unbranded jute and woven spice sacks stacked on pallets beside a shipping container at port',
  },
] as const;
