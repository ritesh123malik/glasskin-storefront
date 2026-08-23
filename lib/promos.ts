// Server-side promo code registry — never exposed to the client bundle.
// All discount validation happens in /api/checkout-session only.

export interface PromoCode {
  code: string;
  description: string;
  /** Percentage off (0–100). Only "percent" type supported for now. */
  percentOff: number;
  /** Minimum order subtotal (INR paise) to apply this code */
  minSubtotal?: number;
}

export const PROMO_CODES: Record<string, PromoCode> = {
  WELCOME10: {
    code: "WELCOME10",
    description: "10% off your first order",
    percentOff: 10,
  },
  GLOW15: {
    code: "GLOW15",
    description: "15% off orders above ₹2,000",
    percentOff: 15,
    minSubtotal: 200000, // 2000 INR in paise
  },
  RITUAL20: {
    code: "RITUAL20",
    description: "20% off gift sets",
    percentOff: 20,
    minSubtotal: 400000, // 4000 INR in paise
  },
};

export function lookupPromo(code: string): PromoCode | null {
  return PROMO_CODES[code.toUpperCase()] ?? null;
}
