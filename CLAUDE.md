# GLASSSKIN Storefront

GLASSSKIN is a Next.js 14 App Router ecommerce storefront for skincare. It
uses TypeScript, Tailwind, Supabase for database/auth, and Stripe for
payments. The production-readiness program is tracked in
`docs/production-readiness-plan.md`; Phase 0 is complete and Phase 1 is the
next phase.

## Non-Negotiable Rules

- No mock or fixture data may be reachable when `NODE_ENV=production`.
- The client must never be trusted for money, inventory, orders, promotion
  eligibility, or fulfilment state. These operations run on the server or a
  verified webhook only.
- Every migration that creates customer or order data must enable RLS and add
  the intended policies in the same migration.
- Validate every API input with Zod. Unauthenticated and money-related
  endpoints must be rate limited.
- Secrets must not enter client bundles, logs, or URLs. Do not derive trusted
  values from request headers. Service-role Supabase clients are server-only.
- Cash on delivery is a supported payment method. Its order lifecycle must
  remain separate from prepaid Stripe payment states.

## Verification

Run these before declaring a phase complete:

```sh
npm run lint
npm run build
npm test
```

`npm test` becomes mandatory once the test suite is introduced in Phase 13.

## RLS Audit Checklist

To be completed alongside the commerce-schema migration. Every customer,
address, cart, order, order item, reservation, payment, shipment, review,
wishlist, or alert table must permit customers to access only their own rows.
Inventory, promotions, fulfilment, and payment mutations use server-only
service-role code.

## Decisions Log

- 2026-08-27: Cash on delivery will be implemented.
- 2026-08-27: Legal and third-party service settings use clearly marked
  placeholders until business details and credentials are supplied.
