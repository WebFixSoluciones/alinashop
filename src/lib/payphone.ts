/**
 * Payphone Ecuador - Integración Oficial API v3 (Botón & Cajita de Pagos)
 * Soporta pagos seguros con tarjetas Visa / Mastercard en dólares estadounidenses (USD)
 */

export const PAYPHONE_CONFIG = {
  // Token Bearer oficial asignado a la tienda
  token:
    process.env.PAYPHONE_TOKEN ||
    "WEHCg_JHrCa7XalF8VfDlY2Hfaig3u0gveJxmMrTAkTdC2KyD5cvKvWCUnH_3xp76RczIK9_s2lieSmNpKh8yK1T1PBpq4rTLp1PvQpHzjZTOOZ0Ou_R4_n6FF1hxOBHoQo-DuIFp-hqdWvWyze3HzR_tIv5A9FFrssSn99RSF74_Ep8JToCuQDbyHqDSX4MnPRjasxgATC737-PeppXjt8XFzuFSBeQ60KcFkKvES-cwRVe5AhhpdsOGkeQka3aUXM2hHS82FrztHbzDdW65a_8mAiC2a86N872YAtMdIdrW1GJxzYbhOHZZLk4q0BBb5NuWYjloHUKe3toMOLIGTQykYk",

  // Tienda ID (storeId) configurado en Payphone Developer
  storeId:
    process.env.PAYPHONE_STORE_ID ||
    "bf4a1bdc-5696-464c-b6b4-ed9abef31ebf",

  // Identificador y Client ID
  appId: process.env.PAYPHONE_APP_ID || "5bBY14UlbEWezfcBJNbvA",
  clientId: process.env.PAYPHONE_CLIENT_ID || "AOCbs3hpka4jQlLQzq0sg",
  secretKey: process.env.PAYPHONE_SECRET_KEY || "QKad5umha0KKigQLDhyQNA",
  encryptionKey: process.env.PAYPHONE_ENCRYPTION_KEY || "cc592df324d94732b6facac3c3dec21b",

  // Endpoints oficiales Payphone
  prepareEndpoint: "https://pay.payphonetodoesposible.com/api/button/Prepare",
  confirmEndpoint: "https://pay.payphonetodoesposible.com/api/button/V2/Confirm",
};

export interface PreparePayphoneParams {
  orderId: string;
  orderNumber: string;
  amount: number; // en dólares, ej: 25.50
  clientEmail?: string;
  clientPhone?: string;
  responseUrl: string;
}

export interface PreparePayphoneResult {
  success: boolean;
  paymentId?: string;
  payUrl?: string;
  payWithCard?: string;
  payWithPayPhone?: string;
  error?: string;
}

export interface ConfirmPayphoneResult {
  success: boolean;
  approved: boolean;
  transactionStatus?: string;
  statusCode?: number;
  transactionId?: number | string;
  clientTransactionId?: string;
  cardBrand?: string;
  lastDigits?: string;
  authorizationCode?: string;
  amount?: number;
  message?: string;
}

/**
 * Prepara la transacción en Payphone y retorna el link de cobro seguro
 */
export async function preparePayphonePayment(
  params: PreparePayphoneParams
): Promise<PreparePayphoneResult> {
  try {
    const { orderNumber, amount, responseUrl } = params;

    // Payphone exige montos en centavos como enteros exactos
    const totalCents = Math.round(Number(amount) * 100);

    if (isNaN(totalCents) || totalCents <= 0) {
      return { success: false, error: "El monto a pagar debe ser mayor a 0." };
    }

    const payload = {
      amount: totalCents,
      amountWithoutTax: totalCents,
      amountWithTax: 0,
      tax: 0,
      service: 0,
      tip: 0,
      currency: "USD",
      storeId: PAYPHONE_CONFIG.storeId,
      clientTransactionId: orderNumber,
      responseUrl: responseUrl,
    };

    const res = await fetch(PAYPHONE_CONFIG.prepareEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PAYPHONE_CONFIG.token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg =
        data?.message || data?.error || `Error ${res.status}: Fallo al conectar con Payphone`;
      console.error("[Payphone Prepare Error]:", data);
      return { success: false, error: errMsg };
    }

    // Payphone retorna paymentId y los links de pago directo
    const payUrl = data.payWithCard || data.payUrl || data.payWithPayPhone;

    return {
      success: true,
      paymentId: data.paymentId,
      payUrl: payUrl,
      payWithCard: data.payWithCard,
      payWithPayPhone: data.payWithPayPhone,
    };
  } catch (error: any) {
    console.error("[Payphone Prepare Exception]:", error);
    return {
      success: false,
      error: error?.message || "Excepción de red al contactar a Payphone",
    };
  }
}

/**
 * Confirma una transacción en Payphone mediante la API v2 Confirm
 * Se debe ejecutar dentro de la ventana de 5 minutos tras el pago
 */
export async function confirmPayphonePayment(
  id: number | string,
  clientTxId: string
): Promise<ConfirmPayphoneResult> {
  try {
    const payload = {
      id: Number(id),
      clientTxId: String(clientTxId),
    };

    const res = await fetch(PAYPHONE_CONFIG.confirmEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PAYPHONE_CONFIG.token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[Payphone Confirm Error]:", data);
      return {
        success: false,
        approved: false,
        message: data?.message || "Transacción no aprobada o no encontrada",
      };
    }

    // statusCode 3 = Aprobada (Approved)
    const isApproved =
      data.transactionStatus === "Approved" ||
      data.statusCode === 3 ||
      String(data.transactionStatus).toLowerCase() === "approved";

    return {
      success: true,
      approved: isApproved,
      transactionStatus: data.transactionStatus,
      statusCode: data.statusCode,
      transactionId: data.transactionId,
      clientTransactionId: data.clientTransactionId,
      cardBrand: data.cardBrand,
      lastDigits: data.lastDigits,
      authorizationCode: data.authorizationCode,
      amount: data.amount ? Number(data.amount) / 100 : undefined,
      message: data.message,
    };
  } catch (error: any) {
    console.error("[Payphone Confirm Exception]:", error);
    return {
      success: false,
      approved: false,
      message: error?.message || "Excepción de red al confirmar pago con Payphone",
    };
  }
}
