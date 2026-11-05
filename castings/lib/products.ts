export interface CastingProduct {
  slug: string;
  partNumber: string;
  name: string;
  material: 'Stainless Steel' | 'Carbon Steel' | 'Ductile Iron' | 'Aluminium';
  materialGrade: string;
  process: 'Investment Cast' | 'Sand Cast' | 'CNC Turned';
  weight: string;
  moq: string;
  leadTime: string;
  hsCode: string;
  summary: string;
  images: {
    src: string;
    alt: string;
  }[];
  specPdf: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  line: string;
  image: string;
  alt: string;
}

export const COMPANY = {
  name: 'Kinesis Cast & Machine Works',
  shortName: 'Kinesis',
  city: 'Rajkot',
  state: 'Gujarat',
  country: 'India',
  port: 'Mundra (INMUN)',
  destPorts: 'Hamburg · Houston',
  address: 'Plot 412, GIDC Metoda Industrial Estate, Kalavad Road, Rajkot 360021, Gujarat, India [fictional]',
  email: 'rfq@kinesiscast-demo.example',
};

export const PRODUCTS: CastingProduct[] = [
  {
    slug: 'ss316-valve-body',
    partNumber: 'KCM-VB-316',
    name: 'Flanged Ball Valve Body',
    material: 'Stainless Steel',
    materialGrade: '316 Stainless Steel',
    process: 'Investment Cast',
    weight: '6.8 kg†',
    moq: '200 pcs†',
    leadTime: '28 days† FOB Mundra',
    hsCode: '8481',
    summary:
      'Silica-sol investment-cast valve housing with five-axis CNC-machined sealing bores and raised-face flanges for European fluid-control OEMs.',
    images: [
      {
        src: '/images/products/ss316-valve-body-1.webp',
        alt: 'Precision CNC-machined 316 stainless steel flanged ball valve body on dark graphite',
      },
      {
        src: '/images/products/ss316-valve-body-2.webp',
        alt: 'Close-up of machined sealing bore and bolt circle on stainless valve casting',
      },
    ],
    specPdf: '/spec-sheets/ss316-valve-body.pdf',
  },
  {
    slug: 'closed-pump-impeller',
    partNumber: 'KCM-PI-316L',
    name: 'Closed-Vane Pump Impeller',
    material: 'Stainless Steel',
    materialGrade: '316L Stainless Steel',
    process: 'Investment Cast',
    weight: '4.2 kg†',
    moq: '150 pcs†',
    leadTime: '28 days† FOB Mundra',
    hsCode: '8413',
    summary:
      'Ceramic-core investment casting with smooth hydraulic passages, dynamically balanced and CNC-bored for chemical and marine transfer pumps.',
    images: [
      {
        src: '/images/products/closed-pump-impeller-1.webp',
        alt: 'Investment-cast stainless steel closed-vane centrifugal pump impeller',
      },
      {
        src: '/images/products/closed-pump-impeller-2.webp',
        alt: 'CNC-turned hub bore and keyway on stainless pump impeller',
      },
    ],
    specPdf: '/spec-sheets/closed-pump-impeller.pdf',
  },
  {
    slug: 'weld-neck-flange',
    partNumber: 'KCM-WN-300',
    name: 'High-Pressure Weld-Neck Flange',
    material: 'Stainless Steel',
    materialGrade: 'Forged 316L Stainless',
    process: 'CNC Turned',
    weight: '8.9 kg†',
    moq: '300 pcs†',
    leadTime: '21 days† CIF Hamburg',
    hsCode: '7307',
    summary:
      'Near-net blank precision turned on twin-spindle CNC lathes with serrated spiral gasket seating and chamfered weld bevel.',
    images: [
      {
        src: '/images/products/weld-neck-flange-1.webp',
        alt: 'CNC-turned stainless steel high-pressure weld-neck flange showing raised face',
      },
      {
        src: '/images/products/weld-neck-flange-2.webp',
        alt: 'Drilled bolt circle and tapered hub on stainless weld-neck flange',
      },
    ],
    specPdf: '/spec-sheets/weld-neck-flange.pdf',
  },
  {
    slug: 'ductile-iron-bracket',
    partNumber: 'KCM-DB-400',
    name: 'Heavy Chassis Mounting Bracket',
    material: 'Ductile Iron',
    materialGrade: 'GGG40 Ductile Iron',
    process: 'Sand Cast',
    weight: '18.4 kg†',
    moq: '150 pcs†',
    leadTime: '25 days† CIF Hamburg',
    hsCode: '7325',
    summary:
      'Resin-sand ductile iron structural bracket with four-axis milled datum pads and precision-reamed dowel pin bores for off-highway axles.',
    images: [
      {
        src: '/images/products/ductile-iron-bracket-1.webp',
        alt: 'Heavy-duty ductile iron chassis mounting bracket with milled datum pads',
      },
      {
        src: '/images/products/ductile-iron-bracket-2.webp',
        alt: 'Precision bored mounting holes on ductile iron structural casting',
      },
    ],
    specPdf: '/spec-sheets/ductile-iron-bracket.pdf',
  },
  {
    slug: 'aluminium-actuator-housing',
    partNumber: 'KCM-AH-356',
    name: 'Pneumatic Actuator Housing',
    material: 'Aluminium',
    materialGrade: 'Heat-Treated Aluminium',
    process: 'Sand Cast',
    weight: '2.6 kg†',
    moq: '400 pcs†',
    leadTime: '21 days† FOB Mundra',
    hsCode: '8481',
    summary:
      'Solution-treated aluminium shell casting with honed internal cylinder bore and anodized exterior for quarter-turn valve automation.',
    images: [
      {
        src: '/images/products/aluminium-actuator-housing-1.webp',
        alt: 'Precision machined aluminium pneumatic actuator body with cooling fins',
      },
      {
        src: '/images/products/aluminium-actuator-housing-2.webp',
        alt: 'Honed internal cylinder bore on cast aluminium actuator housing',
      },
    ],
    specPdf: '/spec-sheets/aluminium-actuator-housing.pdf',
  },
  {
    slug: 'tractor-linkage-yoke',
    partNumber: 'KCM-TY-414',
    name: 'Three-Point Hitch Linkage Yoke',
    material: 'Carbon Steel',
    materialGrade: 'Quenched Alloy Steel',
    process: 'Investment Cast',
    weight: '7.1 kg†',
    moq: '250 pcs†',
    leadTime: '25 days† FOB Mundra',
    hsCode: '7326',
    summary:
      'Heat-treated alloy steel investment casting with broached internal splines and induction-hardened cross-pin bores for agricultural drivelines.',
    images: [
      {
        src: '/images/products/tractor-linkage-yoke-1.webp',
        alt: 'Quenched and tempered alloy steel tractor linkage yoke casting',
      },
      {
        src: '/images/products/tractor-linkage-yoke-2.webp',
        alt: 'CNC-machined clevis ears and pin bore on steel linkage yoke',
      },
    ],
    specPdf: '/spec-sheets/tractor-linkage-yoke.pdf',
  },
  {
    slug: 'ss316-marine-deck-fitting',
    partNumber: 'KCM-MF-316L',
    name: 'Mirror-Passivated Mooring Fairlead',
    material: 'Stainless Steel',
    materialGrade: 'Marine 316L Stainless',
    process: 'Investment Cast',
    weight: '3.4 kg†',
    moq: '200 pcs†',
    leadTime: '24 days† CIF Hamburg',
    hsCode: '7325',
    summary:
      'Lost-wax cast marine deck hardware with electropolished hawser surfaces and CNC-milled counterbored mounting base for salt-spray service.',
    images: [
      {
        src: '/images/products/ss316-marine-deck-fitting-1.webp',
        alt: 'Electropolished 316L stainless steel marine mooring fairlead',
      },
      {
        src: '/images/products/ss316-marine-deck-fitting-2.webp',
        alt: 'Counterbored mounting base on stainless marine deck casting',
      },
    ],
    specPdf: '/spec-sheets/ss316-marine-deck-fitting.pdf',
  },
  {
    slug: 'machined-shaft-coupling',
    partNumber: 'KCM-SC-1045',
    name: 'Keyed Flanged Shaft Coupling',
    material: 'Carbon Steel',
    materialGrade: 'Black-Oxide Carbon Steel',
    process: 'CNC Turned',
    weight: '5.3 kg†',
    moq: '300 pcs†',
    leadTime: '18 days† FOB Mundra',
    hsCode: '8483',
    summary:
      'Precision-turned and ground carbon steel drive coupling with broached keyway and black-oxide corrosion protection for industrial gearboxes.',
    images: [
      {
        src: '/images/products/machined-shaft-coupling-1.webp',
        alt: 'Precision CNC-turned carbon steel flanged shaft coupling with keyway',
      },
      {
        src: '/images/products/machined-shaft-coupling-2.webp',
        alt: 'Ground bore and broached keyseat on steel drive coupling',
      },
    ],
    specPdf: '/spec-sheets/machined-shaft-coupling.pdf',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Pattern',
    line: 'Automated wax injection into aluminium dies with 0.1 mm repeatability.',
    image: '/images/process/step-01-pattern.webp',
    alt: 'Precision wax pattern assembly for investment casting in Rajkot',
  },
  {
    step: '02',
    title: 'Shell',
    line: 'Robotic zircon slurry dipping in climate-controlled drying tunnels.',
    image: '/images/process/step-02-shell.webp',
    alt: 'Robotic ceramic shell dipping line for lost-wax castings',
  },
  {
    step: '03',
    title: 'Pour',
    line: 'Induction melting at 1,620 °C with optical spectro verification.',
    image: '/images/process/step-03-pour.webp',
    alt: 'Molten stainless steel pouring from induction furnace into pre-heated ceramic shells',
  },
  {
    step: '04',
    title: 'Machine',
    line: 'Five-axis CNC milling and turning performed in a single fixture.',
    image: '/images/process/step-04-machine.webp',
    alt: 'Five-axis CNC machining centre finishing a stainless steel valve casting',
  },
  {
    step: '05',
    title: 'Inspect',
    line: 'Bridge CMM coordinate probing holding critical bores to ±0.03 mm†.',
    image: '/images/process/step-05-inspect.webp',
    alt: 'Coordinate measuring machine ruby probe inspecting a machined bore',
  },
  {
    step: '06',
    title: 'Pack',
    line: 'VCI anti-corrosion barrier wrap packed in heat-treated export crates.',
    image: '/images/process/step-06-pack.webp',
    alt: 'Export-packed machined castings in seaworthy wooden crates ready for Mundra port',
  },
];
