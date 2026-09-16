export interface SeedCategory {
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface SeedVariant {
  code?: string;
  sizeLabel: string;
  shape?: string;
  color?: string;
  unitPrice: number;
  dozenPrice: number;
  wholesalePrice: number;
  stock?: number;
}

export interface SeedProduct {
  sku: string;
  name: string;
  slug: string;
  description: string;
  material: string;
  categorySlug: string;
  mainImage: string;
  images?: string[];
  hasLogoOption: boolean;
  logoPriceExtra?: number;
  allowCustomSize: boolean;
  variants: SeedVariant[];
}

export const CATEGORIES_DATA: SeedCategory[] = [
  {
    name: "Bases de Torta MDF",
    slug: "bases-mdf",
    description: "Bases de corte láser en MDF 3mm laminado lavable blanco y wengué en variedad de formas y tamaños.",
    order: 1,
  },
  {
    name: "Minibases",
    slug: "minibases",
    description: "Minibases para porciones individuales, cheesecakes y postres en packs por 10 unidades.",
    order: 2,
  },
  {
    name: "Bases Rectangulares",
    slug: "bases-rectangulares",
    description: "Bases rectangulares de alta resistencia para tortas familiares e institucionales.",
    order: 3,
  },
  {
    name: "Bases con Diseños",
    slug: "bases-disenos",
    description: "Bases decorativas con siluetas de luna, corazones, flores y trébol.",
    order: 4,
  },
  {
    name: "Toppers para Pastel",
    slug: "toppers",
    description: "Toppers decorativos en acrílico espejado y MDF con vinil para cumpleaños y ocasiones especiales.",
    order: 5,
  },
  {
    name: "Apliques de Acrílico",
    slug: "apliques",
    description: "Apliques decorativos cortados a láser para detalles finos de repostería.",
    order: 6,
  },
  {
    name: "Cajas y Empaques",
    slug: "cajas",
    description: "Cajas de acetato con cinta decorativa, cajas de cartulina y cajas doradas para cupcakes.",
    order: 7,
  },
  {
    name: "Complementos y Utensilios",
    slug: "complementos",
    description: "Esferas decorativas, boquillas de repostería, mangas desechables, moldes y pirotinas.",
    order: 8,
  },
];

export const PRODUCTS_DATA: SeedProduct[] = [
  // 1. BASES MDF 3MM RIZADAS
  {
    sku: "BASE-MDF-RIZADA",
    name: "Base de Torta MDF 3mm — Forma Rizada",
    slug: "base-torta-mdf-rizada",
    description: "Base decorativa con borde rizado cortado a láser en MDF 3mm de alta densidad. Disponible en acabado Blanco laminado o Wengué oscuro. Apta para tortas pesadas y personalización con logo grabado.",
    material: "MDF 3mm laminado",
    categorySlug: "bases-mdf",
    mainImage: "/logo.jpg",
    hasLogoOption: true,
    logoPriceExtra: 0.20,
    allowCustomSize: true,
    variants: [
      { code: "BBRI-10", sizeLabel: "10 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.20, dozenPrice: 0.16, wholesalePrice: 0.14 },
      { code: "BBRI-12", sizeLabel: "12 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.26, dozenPrice: 0.21, wholesalePrice: 0.18 },
      { code: "BBRI-13", sizeLabel: "13 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.30, dozenPrice: 0.25, wholesalePrice: 0.21 },
      { code: "BBRI-15", sizeLabel: "15 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.44, dozenPrice: 0.36, wholesalePrice: 0.31 },
      { code: "BBRI-17", sizeLabel: "17 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.55, dozenPrice: 0.46, wholesalePrice: 0.39 },
      { code: "BBRI-18", sizeLabel: "18 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.62, dozenPrice: 0.52, wholesalePrice: 0.45 },
      { code: "BBRI-20", sizeLabel: "20 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.75, dozenPrice: 0.64, wholesalePrice: 0.55 },
      { code: "BBRI-22", sizeLabel: "22 cm", shape: "Rizada", color: "Blanco", unitPrice: 0.85, dozenPrice: 0.72, wholesalePrice: 0.61 },
      { code: "BBRI-24", sizeLabel: "24 cm", shape: "Rizada", color: "Blanco", unitPrice: 1.05, dozenPrice: 0.90, wholesalePrice: 0.80 },
      { code: "BBRI-25", sizeLabel: "25 cm", shape: "Rizada", color: "Blanco", unitPrice: 1.15, dozenPrice: 1.00, wholesalePrice: 0.86 },
      { code: "BBRI-27", sizeLabel: "27 cm", shape: "Rizada", color: "Blanco", unitPrice: 1.35, dozenPrice: 1.16, wholesalePrice: 1.01 },
      { code: "BBRI-30", sizeLabel: "30 cm", shape: "Rizada", color: "Blanco", unitPrice: 1.65, dozenPrice: 1.40, wholesalePrice: 1.25 },
      { code: "BBRI-32", sizeLabel: "32 cm", shape: "Rizada", color: "Blanco", unitPrice: 1.85, dozenPrice: 1.58, wholesalePrice: 1.34 },
      { code: "BBRI-35", sizeLabel: "35 cm", shape: "Rizada", color: "Blanco", unitPrice: 2.30, dozenPrice: 1.96, wholesalePrice: 1.75 },
      { code: "BBRI-40", sizeLabel: "40 cm", shape: "Rizada", color: "Blanco", unitPrice: 3.00, dozenPrice: 2.56, wholesalePrice: 2.22 },
    ],
  },
  // 2. BASES MDF FORMAS CLÁSICAS (Redonda, Cuadrada, Ondulada, Estrella, Corazón, Punta Redonda)
  {
    sku: "BASE-MDF-REDONDA",
    name: "Base de Torta MDF 3mm — Forma Redonda Clásica",
    slug: "base-torta-mdf-redonda",
    description: "Borde circular puro cortado a láser en MDF 3mm de alta resistencia. Acabado blanco lavable o wengué oscuro. Compatible con grabado láser de marca.",
    material: "MDF 3mm laminado",
    categorySlug: "bases-mdf",
    mainImage: "/logo.jpg",
    hasLogoOption: true,
    logoPriceExtra: 0.20,
    allowCustomSize: true,
    variants: [
      { code: "BBRE-15", sizeLabel: "15 cm", shape: "Redonda", color: "Blanco", unitPrice: 0.44, dozenPrice: 0.36, wholesalePrice: 0.31 },
      { code: "BBRE-18", sizeLabel: "18 cm", shape: "Redonda", color: "Blanco", unitPrice: 0.62, dozenPrice: 0.52, wholesalePrice: 0.45 },
      { code: "BBRE-20", sizeLabel: "20 cm", shape: "Redonda", color: "Blanco", unitPrice: 0.75, dozenPrice: 0.64, wholesalePrice: 0.55 },
      { code: "BBRE-25", sizeLabel: "25 cm", shape: "Redonda", color: "Blanco", unitPrice: 1.15, dozenPrice: 1.00, wholesalePrice: 0.86 },
      { code: "BBRE-30", sizeLabel: "30 cm", shape: "Redonda", color: "Blanco", unitPrice: 1.65, dozenPrice: 1.40, wholesalePrice: 1.25 },
      { code: "BBRE-35", sizeLabel: "35 cm", shape: "Redonda", color: "Blanco", unitPrice: 2.30, dozenPrice: 1.96, wholesalePrice: 1.75 },
    ],
  },
  {
    sku: "BASE-MDF-CUADRADA",
    name: "Base de Torta MDF 3mm — Forma Cuadrada",
    slug: "base-torta-mdf-cuadrada",
    description: "Base cuadrada con esquinas rectas perfectas en MDF 3mm. Ideal para tortas cuadradas y estructuras modernas.",
    material: "MDF 3mm laminado",
    categorySlug: "bases-mdf",
    mainImage: "/logo.jpg",
    hasLogoOption: true,
    logoPriceExtra: 0.20,
    allowCustomSize: true,
    variants: [
      { code: "BBC-15", sizeLabel: "15 cm", shape: "Cuadrada", color: "Blanco", unitPrice: 0.44, dozenPrice: 0.36, wholesalePrice: 0.31 },
      { code: "BBC-20", sizeLabel: "20 cm", shape: "Cuadrada", color: "Blanco", unitPrice: 0.75, dozenPrice: 0.64, wholesalePrice: 0.55 },
      { code: "BBC-25", sizeLabel: "25 cm", shape: "Cuadrada", color: "Blanco", unitPrice: 1.15, dozenPrice: 1.00, wholesalePrice: 0.86 },
      { code: "BBC-30", sizeLabel: "30 cm", shape: "Cuadrada", color: "Blanco", unitPrice: 1.65, dozenPrice: 1.40, wholesalePrice: 1.25 },
      { code: "BBC-35", sizeLabel: "35 cm", shape: "Cuadrada", color: "Blanco", unitPrice: 2.30, dozenPrice: 1.96, wholesalePrice: 1.75 },
    ],
  },
  {
    sku: "BASE-MDF-CORAZON",
    name: "Base de Torta MDF 3mm — Forma Corazón",
    slug: "base-torta-mdf-corazon",
    description: "Silueta de corazón en corte láser MDF 3mm. Especial para tortas de aniversario, San Valentín y fechas románticas.",
    material: "MDF 3mm laminado",
    categorySlug: "bases-mdf",
    mainImage: "/logo.jpg",
    hasLogoOption: true,
    logoPriceExtra: 0.20,
    allowCustomSize: true,
    variants: [
      { code: "BBCO-15", sizeLabel: "15 cm", shape: "Corazón", color: "Blanco", unitPrice: 0.44, dozenPrice: 0.36, wholesalePrice: 0.31 },
      { code: "BBCO-20", sizeLabel: "20 cm", shape: "Corazón", color: "Blanco", unitPrice: 0.75, dozenPrice: 0.64, wholesalePrice: 0.55 },
      { code: "BBCO-25", sizeLabel: "25 cm", shape: "Corazón", color: "Blanco", unitPrice: 1.15, dozenPrice: 1.00, wholesalePrice: 0.86 },
      { code: "BBCO-30", sizeLabel: "30 cm", shape: "Corazón", color: "Blanco", unitPrice: 1.65, dozenPrice: 1.40, wholesalePrice: 1.25 },
    ],
  },
  // 3. MINIBASES CHEESECAKE
  {
    sku: "MINIBASES-PACK",
    name: "Minibases para Cheesecake y Postres (Pack 10 Unidades)",
    slug: "minibases-cheesecake-pack-10",
    description: "Pack de 10 unidades de minibases individuales. Disponibles en forma rizada, cuadrada o circular.",
    material: "MDF 3mm laminado",
    categorySlug: "minibases",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "MBR-10", sizeLabel: "10 cm (Pack 10 unds)", shape: "Rizada", color: "Blanco", unitPrice: 2.20, dozenPrice: 2.00, wholesalePrice: 1.80 },
      { code: "MBR-12", sizeLabel: "12 cm (Pack 10 unds)", shape: "Rizada", color: "Blanco", unitPrice: 3.30, dozenPrice: 3.00, wholesalePrice: 2.70 },
      { code: "MBR-15", sizeLabel: "15 cm (Pack 10 unds)", shape: "Rizada", color: "Blanco", unitPrice: 4.40, dozenPrice: 4.00, wholesalePrice: 3.60 },
      { code: "MBCU-10", sizeLabel: "10 cm (Pack 10 unds)", shape: "Cuadrada", color: "Blanco", unitPrice: 2.20, dozenPrice: 2.00, wholesalePrice: 1.80 },
      { code: "MBCI-10", sizeLabel: "10 cm (Pack 10 unds)", shape: "Circular", color: "Blanco", unitPrice: 2.20, dozenPrice: 2.00, wholesalePrice: 1.80 },
    ],
  },
  // 4. BASES RECTANGULARES
  {
    sku: "BASE-MDF-RECTANGULAR",
    name: "Base de Torta MDF 3mm — Rectangular",
    slug: "base-torta-mdf-rectangular",
    description: "Bases rectangulares reforzadas. Ideales para tortas rectangulares de brazo gitano, pasteles de plancha o banquetes.",
    material: "MDF 3mm laminado",
    categorySlug: "bases-rectangulares",
    mainImage: "/logo.jpg",
    hasLogoOption: true,
    logoPriceExtra: 0.20,
    allowCustomSize: true,
    variants: [
      { code: "BBRT-30X15", sizeLabel: "30x15 cm", shape: "Rectangular", color: "Blanco", unitPrice: 0.75, dozenPrice: 0.65, wholesalePrice: 0.55 },
      { code: "BBRT-30X20", sizeLabel: "30x20 cm", shape: "Rectangular", color: "Blanco", unitPrice: 1.00, dozenPrice: 0.88, wholesalePrice: 0.75 },
      { code: "BBRT-30X25", sizeLabel: "30x25 cm", shape: "Rectangular", color: "Blanco", unitPrice: 1.25, dozenPrice: 1.10, wholesalePrice: 0.94 },
      { code: "BBRT-25X35", sizeLabel: "25x35 cm", shape: "Rectangular", color: "Blanco", unitPrice: 1.45, dozenPrice: 1.29, wholesalePrice: 1.09 },
      { code: "BBRT-30X40", sizeLabel: "30x40 cm", shape: "Rectangular", color: "Blanco", unitPrice: 1.95, dozenPrice: 1.77, wholesalePrice: 1.50 },
      { code: "BBRT-30X45", sizeLabel: "30x45 cm", shape: "Rectangular", color: "Blanco", unitPrice: 2.20, dozenPrice: 1.98, wholesalePrice: 1.69 },
      { code: "BBRT-35X45", sizeLabel: "35x45 cm", shape: "Rectangular", color: "Blanco", unitPrice: 2.60, dozenPrice: 2.31, wholesalePrice: 1.98 },
    ],
  },
  // 5. BASES CON DISEÑOS ESPECIALES
  {
    sku: "BASE-MDF-DISENOS",
    name: "Base de Torta MDF — Diseños Especiales (Luna, Flores, Trébol)",
    slug: "base-torta-mdf-disenos-especiales",
    description: "Bases decorativas temáticas: Base Luna (BBL), Base Flores (BBF) y Base Trébol (BBT).",
    material: "MDF 3mm laminado",
    categorySlug: "bases-disenos",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "BBL-15", sizeLabel: "15 cm", shape: "Luna", color: "Blanco", unitPrice: 0.50, dozenPrice: 0.45, wholesalePrice: 0.41 },
      { code: "BBL-18", sizeLabel: "18 cm", shape: "Luna", color: "Blanco", unitPrice: 0.72, dozenPrice: 0.65, wholesalePrice: 0.59 },
      { code: "BBL-20", sizeLabel: "20 cm", shape: "Luna", color: "Blanco", unitPrice: 0.90, dozenPrice: 0.80, wholesalePrice: 0.72 },
      { code: "BBL-25", sizeLabel: "25 cm", shape: "Luna", color: "Blanco", unitPrice: 1.40, dozenPrice: 1.25, wholesalePrice: 1.13 },
      { code: "BBL-30", sizeLabel: "30 cm", shape: "Luna", color: "Blanco", unitPrice: 1.95, dozenPrice: 1.75, wholesalePrice: 1.58 },
    ],
  },
  // 6. TOPPERS
  {
    sku: "TOPPER-ACRILICO-MDF",
    name: "Topper para Torta en Acrílico y MDF + Vinil",
    slug: "topper-torta-acrilico-mdf",
    description: "Toppers decorativos de felicitación y números (códigos TAC001 al TAC016, TAB, TAR, TAV). Disponibles en acabado acrílico espejado dorado/plateado o MDF con vinil.",
    material: "Acrílico espejado / MDF Vinil",
    categorySlug: "toppers",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "TAC-6", sizeLabel: "6 cm (Acrílico)", shape: "Acrílico", unitPrice: 0.65, dozenPrice: 0.55, wholesalePrice: 0.47 },
      { code: "TAC-10", sizeLabel: "10 cm (Acrílico)", shape: "Acrílico", unitPrice: 0.95, dozenPrice: 0.80, wholesalePrice: 0.72 },
      { code: "TAC-15", sizeLabel: "15 cm (Acrílico)", shape: "Acrílico", unitPrice: 1.20, dozenPrice: 1.00, wholesalePrice: 0.90 },
      { code: "TAC-20", sizeLabel: "20 cm (Acrílico)", shape: "Acrílico", unitPrice: 1.75, dozenPrice: 1.50, wholesalePrice: 1.28 },
      { code: "TAC-25", sizeLabel: "25 cm (Acrílico)", shape: "Acrílico", unitPrice: 2.60, dozenPrice: 2.25, wholesalePrice: 1.91 },
      { code: "TMC-15", sizeLabel: "15 cm (MDF + Vinil)", shape: "MDF Vinil", unitPrice: 1.00, dozenPrice: 0.85, wholesalePrice: 0.72 },
      { code: "TMC-20", sizeLabel: "20 cm (MDF + Vinil)", shape: "MDF Vinil", unitPrice: 1.45, dozenPrice: 1.25, wholesalePrice: 1.06 },
    ],
  },
  {
    sku: "TOPPER-NUMERO-MDF",
    name: "Topper Número MDF 15cm Personalizado (1 al 10)",
    slug: "topper-numero-mdf-personalizado",
    description: "Topper números One, Two, Three... Ten (códigos TMDF001 al TMDF010) cortados a láser en MDF.",
    material: "MDF 3mm",
    categorySlug: "toppers",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "TMDF-15", sizeLabel: "15 cm", shape: "Números 1-10", unitPrice: 2.80, dozenPrice: 2.50, wholesalePrice: 2.25 },
    ],
  },
  // 7. APLIQUES
  {
    sku: "APLIQUES-ACRILICO",
    name: "Apliques de Acrílico Decorativos",
    slug: "apliques-acrilico-decorativos",
    description: "Apliques en acrílico miniatura cortados con láser para costados y decoraciones de tortas.",
    material: "Acrílico brillante",
    categorySlug: "apliques",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "APL-4", sizeLabel: "4 cm", shape: "Aplique", unitPrice: 0.45, dozenPrice: 0.40, wholesalePrice: 0.35 },
      { code: "APL-5", sizeLabel: "5 cm", shape: "Aplique", unitPrice: 0.55, dozenPrice: 0.50, wholesalePrice: 0.45 },
      { code: "APL-6", sizeLabel: "6 cm", shape: "Aplique", unitPrice: 0.65, dozenPrice: 0.60, wholesalePrice: 0.52 },
      { code: "APL-10", sizeLabel: "10 cm", shape: "Aplique", unitPrice: 2.20, dozenPrice: 2.00, wholesalePrice: 1.80 },
      { code: "APL-15", sizeLabel: "15 cm", shape: "Aplique", unitPrice: 2.80, dozenPrice: 2.50, wholesalePrice: 2.20 },
    ],
  },
  // 8. CAJAS DE ACETATO Y CUPCAKES
  {
    sku: "CAJA-ACETATO-BLANCA",
    name: "Caja de Acetato con Tapa Blanca e Incluye Cinta",
    slug: "caja-acetato-tapa-blanca",
    description: "Caja transparente de acetato de alta claridad con base y tapa blanca. Incluye cinta decorativa de colores a elección.",
    material: "Acetato y Cartón rígido blanco",
    categorySlug: "cajas",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "CAB-17X20", sizeLabel: "17 cm ancho x 20 cm alto", shape: "Cilindro/Caja", unitPrice: 1.25, dozenPrice: 1.13, wholesalePrice: 0.90 },
      { code: "CAB-21X24", sizeLabel: "21.5 cm ancho x 24 cm alto", shape: "Cilindro/Caja", unitPrice: 1.75, dozenPrice: 1.58, wholesalePrice: 1.26 },
      { code: "CAB-25X31", sizeLabel: "25.3 cm ancho x 31 cm alto", shape: "Cilindro/Caja", unitPrice: 2.35, dozenPrice: 2.16, wholesalePrice: 1.94 },
      { code: "CAB-31X28", sizeLabel: "31.2 cm ancho x 28 cm alto", shape: "Cilindro/Caja", unitPrice: 2.80, dozenPrice: 2.55, wholesalePrice: 2.29 },
      { code: "CAB-35X25", sizeLabel: "35.2 cm ancho x 25 cm alto", shape: "Cilindro/Caja", unitPrice: 3.85, dozenPrice: 3.55, wholesalePrice: 3.20 },
    ],
  },
  {
    sku: "CAJA-CUPCAKES-CARTULINA",
    name: "Caja de Cartulina Blanca para Cupcakes",
    slug: "caja-cartulina-cupcakes",
    description: "Caja de fácil armado con separadores para 2, 4 o 6 cupcakes.",
    material: "Cartulina blanca reforzada",
    categorySlug: "cajas",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "CC2C", sizeLabel: "2 Cupcakes (16*9*7.5 cm)", shape: "2 servicios", unitPrice: 0.30, dozenPrice: 0.25, wholesalePrice: 0.22 },
      { code: "CC4C", sizeLabel: "4 Cupcakes (16*16*7.5 cm)", shape: "4 servicios", unitPrice: 0.40, dozenPrice: 0.35, wholesalePrice: 0.30 },
      { code: "CC6C", sizeLabel: "6 Cupcakes (24*16*7.5 cm)", shape: "6 servicios", unitPrice: 0.50, dozenPrice: 0.45, wholesalePrice: 0.38 },
    ],
  },
  {
    sku: "CAJA-CUPCAKES-DORADA",
    name: "Caja para Cupcakes Acabado Dorado",
    slug: "caja-cupcakes-dorado",
    description: "Caja elegante con acabado metalizado dorado para presentación premium de cupcakes.",
    material: "Cartulina laminada dorada",
    categorySlug: "cajas",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "CCD2C", sizeLabel: "2 Cupcakes Dorada (16*9*7.5 cm)", shape: "2 servicios", unitPrice: 0.35, dozenPrice: 0.30, wholesalePrice: 0.26 },
      { code: "CCD4C", sizeLabel: "4 Cupcakes Dorada (16*16*7.5 cm)", shape: "4 servicios", unitPrice: 0.45, dozenPrice: 0.40, wholesalePrice: 0.35 },
      { code: "CCD6C", sizeLabel: "6 Cupcakes Dorada (24*16*7.5 cm)", shape: "6 servicios", unitPrice: 0.60, dozenPrice: 0.55, wholesalePrice: 0.48 },
    ],
  },
  {
    sku: "CAJA-KIT-TORTA-CUPCAKES",
    name: "Caja Kit Torta + 5 Cupcakes + Cinta",
    slug: "caja-kit-torta-cupcakes-cinta",
    description: "Caja combinada con capacidad para 5 cupcakes y 1 mini torta de 10cm. Incluye cinta decorativa surtida.",
    material: "Cartulina y ventana de acetato",
    categorySlug: "cajas",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "CKT5C", sizeLabel: "Kit Torta 10cm + 5 Cupcakes", shape: "Kit", unitPrice: 1.50, dozenPrice: 1.36, wholesalePrice: 1.20 },
    ],
  },
  // 9. COMPLEMENTOS: ESFERAS Y UTENSILIOS
  {
    sku: "ESFERAS-DECORATIVAS-PACK",
    name: "Esferas Decorativas Plásticas para Pastel (Pack 20 Unidades)",
    slug: "esferas-decorativas-plasticas-pack-20",
    description: "Pack de 20 esferas decorativas en 4 tamaños variados (2, 2.5, 3 y 4 cm). Disponibles en Dorado, Plateado, Rosa, Rojo, Azul, Verde, Blanco y Fucsia.",
    material: "Plástico decorativo",
    categorySlug: "complementos",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "EDPD20", sizeLabel: "Pack 20 pzs (Dorado)", shape: "Esferas 2/2.5/3/4cm", color: "Dorado", unitPrice: 1.65, dozenPrice: 1.46, wholesalePrice: 1.30 },
      { code: "EDPP20", sizeLabel: "Pack 20 pzs (Plateado)", shape: "Esferas 2/2.5/3/4cm", color: "Plateado", unitPrice: 1.65, dozenPrice: 1.46, wholesalePrice: 1.30 },
      { code: "EDPRS20", sizeLabel: "Pack 20 pzs (Rosa)", shape: "Esferas 2/2.5/3/4cm", color: "Rosa", unitPrice: 1.65, dozenPrice: 1.46, wholesalePrice: 1.30 },
      { code: "EDPR20", sizeLabel: "Pack 20 pzs (Rojo)", shape: "Esferas 2/2.5/3/4cm", color: "Rojo", unitPrice: 1.65, dozenPrice: 1.46, wholesalePrice: 1.30 },
      { code: "SEAS", sizeLabel: "Set Esferas + Abanico Surtido", shape: "Set Surtido", unitPrice: 3.30, dozenPrice: 3.00, wholesalePrice: 2.70 },
    ],
  },
  {
    sku: "MANGAS-DESECHABLES-PACK",
    name: "Mangas Plásticas Desechables para Repostería (Pack 100 Unidades)",
    slug: "mangas-plasticas-desechables-pack-100",
    description: "Mangas de repostería desechables de alta resistencia y flexibilidad. Pack por 100 piezas.",
    material: "Plástico grado alimenticio",
    categorySlug: "complementos",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "MPD25", sizeLabel: "25 cm (Pack 100 pzs)", shape: "25 cm", unitPrice: 1.70, dozenPrice: 1.50, wholesalePrice: 1.35 },
      { code: "MPD30", sizeLabel: "30 cm (Pack 100 pzs)", shape: "30 cm", unitPrice: 2.05, dozenPrice: 1.85, wholesalePrice: 1.65 },
      { code: "MPD35", sizeLabel: "35 cm (Pack 100 pzs)", shape: "35 cm", unitPrice: 2.50, dozenPrice: 2.25, wholesalePrice: 2.00 },
    ],
  },
  {
    sku: "PIROTINAS-BLANCAS-PACK",
    name: "Pirotinas Color Entero Blanco (Pack 100 Unidades)",
    slug: "pirotinas-blancas-pack-100",
    description: "Pirotinas blancas aptas para horneado en diferentes números (#6, #7, #8 y #10).",
    material: "Papel antigrasa para horneado",
    categorySlug: "complementos",
    mainImage: "/logo.jpg",
    hasLogoOption: false,
    allowCustomSize: false,
    variants: [
      { code: "PB6001", sizeLabel: "Pirotina #6 (Pack 100 pzs)", shape: "Ancho 2.5cm, Alto 1.75cm", unitPrice: 0.60, dozenPrice: 0.50, wholesalePrice: 0.45 },
      { code: "PB7001", sizeLabel: "Pirotina #7 (Pack 100 pzs)", shape: "Ancho 3cm, Alto 2cm", unitPrice: 0.70, dozenPrice: 0.60, wholesalePrice: 0.52 },
      { code: "PB8001", sizeLabel: "Pirotina #8 (Pack 100 pzs)", shape: "Ancho 3.5cm, Alto 2.25cm", unitPrice: 0.75, dozenPrice: 0.65, wholesalePrice: 0.58 },
      { code: "PB1001", sizeLabel: "Pirotina #10 (Pack 100 pzs)", shape: "Ancho 5cm, Alto 3.5cm", unitPrice: 0.90, dozenPrice: 0.80, wholesalePrice: 0.70 },
      { code: "PDE001", sizeLabel: "Pirotina Cupcake Día Especial #10", shape: "Diseño Especial 100 pzs", unitPrice: 1.35, dozenPrice: 1.20, wholesalePrice: 1.05 },
    ],
  },
];
