export interface PopupPromotion {
  enabled: boolean;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl?: string;
}

export interface NavbarPromotionItem {
  id: string;
  icon: "truck" | "gift" | "sparkles" | "credit-card" | "tag";
  text: string;
  highlight?: string;
  linkUrl?: string;
}

export interface PromotionsConfig {
  popup: PopupPromotion;
  ticker: {
    enabled: boolean;
    intervalSeconds: number;
    messages: NavbarPromotionItem[];
  };
}

const DEFAULT_PROMOTIONS: PromotionsConfig = {
  popup: {
    enabled: true,
    badge: "OFERTA MAYORISTA ALINA SHOP",
    title: "¡Precios de Fábrica en Bases MDF & Toppers!",
    description:
      "Aprovecha hasta 25% de ahorro en docenas y bases con corte láser de alta densidad. Personaliza gratis o graba el logotipo de tu marca pastelera.",
    buttonText: "Ver Catálogo Completo",
    buttonUrl: "/catalogo",
    imageUrl: "/images/products/bases-mdf/base-mdf-blanco-wengue.png",
  },
  ticker: {
    enabled: true,
    intervalSeconds: 4,
    messages: [
      {
        id: "msg_1",
        icon: "truck",
        text: "Envíos asegurados a todo el Ecuador por Servientrega y LaarCourier",
        highlight: "todo el Ecuador",
        linkUrl: "/rastreo",
      },
      {
        id: "msg_2",
        icon: "tag",
        text: "Por la compra de la docena obtén precios mayoristas de fábrica",
        highlight: "precios mayoristas",
        linkUrl: "/catalogo",
      },
      {
        id: "msg_3",
        icon: "sparkles",
        text: "Personaliza tus bases con el logo de tu pastelería por solo +$0.20",
        highlight: "logo de tu pastelería",
        linkUrl: "/catalogo?categoria=bases-mdf",
      },
      {
        id: "msg_4",
        icon: "credit-card",
        text: "Pagos 100% seguros con tarjetas Visa, Mastercard o WhatsApp",
        highlight: "Payphone y WhatsApp",
        linkUrl: "/checkout",
      },
    ],
  },
};

// Variable persistente en memoria durante la ejecución de Node.js
let currentPromotions: PromotionsConfig = JSON.parse(JSON.stringify(DEFAULT_PROMOTIONS));

export function getPromotionsConfig(): PromotionsConfig {
  return currentPromotions;
}

export function updatePromotionsConfig(updates: Partial<PromotionsConfig>): PromotionsConfig {
  if (updates.popup) {
    currentPromotions.popup = {
      ...currentPromotions.popup,
      ...updates.popup,
    };
  }

  if (updates.ticker) {
    currentPromotions.ticker = {
      ...currentPromotions.ticker,
      ...updates.ticker,
      messages: updates.ticker.messages || currentPromotions.ticker.messages,
    };
  }

  return currentPromotions;
}
