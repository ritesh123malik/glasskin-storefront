import Stripe from "stripe";

/**
 * Returns a Stripe instance. Call this inside a route handler, not at module
 * top-level, so the missing-key error only triggers at request time
 * (avoids crashing the build if STRIPE_SECRET_KEY is not set yet).
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY environment variable. " +
        "Copy .env.local.example → .env.local and add your Stripe test key."
    );
  }

  // Singleton across hot-reloads in dev
  const g = globalThis as unknown as { __stripe?: Stripe };
  if (!g.__stripe) {
    g.__stripe = new Stripe(key, {
      apiVersion: "2026-07-29.dahlia",
      typescript: true,
    });
  }
  return g.__stripe;
}
