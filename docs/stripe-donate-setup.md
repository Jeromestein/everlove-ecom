# Stripe Donate Setup (Everlove)

This repo already has a donate page and API route wired to Stripe Checkout (`/api/stripe/donate`). Follow these steps next time to turn it on:

## 1) Configure keys (test first)
- In your `.env.local` (and Vercel/hosting env vars), add:
  - `STRIPE_SECRET_KEY=sk_test_…`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_…`
  - `STRIPE_WEBHOOKS_SIGNING_SECRET=whsec_…` (after webhook setup)
- Restart dev server after adding keys.

## 2) Validate amounts/currencies
- The donate form sends a numeric amount (defaults to USD) and supports `USD`, `EUR`, `GBP`. Edit `currencyOptions` in `src/app/(app)/donate/DonatePageClient.tsx` to change.
- Amount is sent as `amount * 100` to Stripe. Minimum is implicit (Stripe minimum per currency). Adjust front-end validation if you want a minimum (e.g., $5).

## 3) Stripe Checkout session flow
- Endpoint: `POST /api/stripe/donate` with body `{ amount, currency, frequency: "once"|"monthly", dedicate, honorName }`.
- Mode: `payment` for one-time, `subscription` for monthly. Metadata includes frequency, dedication flag, and honoree name.
- Redirects: `success_url` → `/donate?success=1`, `cancel_url` → `/donate?canceled=1`. Change these in `src/app/api/stripe/donate/route.ts` if needed.

## 4) Webhook (to confirm and log donations)
- Create an endpoint (suggested): `POST /api/stripe/webhooks`.
- Listen for:
  - `checkout.session.completed` (one-time)
  - `invoice.paid` / `customer.subscription.created` (recurring)
  - Optional: `customer.subscription.deleted` for cancellations
- Verify signatures with `STRIPE_WEBHOOKS_SIGNING_SECRET`.
- On success: mark donation in your DB/CMS, email receipt/acknowledgment, include metadata (frequency, dedicate, honorName).

## 5) Local webhook testing
- Install Stripe CLI and run: `pnpm stripe-webhooks` (already in package.json) or `stripe listen --forward-to localhost:3000/api/stripe/webhooks`.
- Copy the printed signing secret into `.env.local` as `STRIPE_WEBHOOKS_SIGNING_SECRET`.

## 6) Production checklist
- Swap test keys for live keys.
- Update webhook endpoint in Stripe Dashboard to your production URL (`https://your-domain.com/api/stripe/webhooks`) and use the new live signing secret.
- Confirm allowed currencies and bank/card support in your Stripe account.
- Add a clear refund/receipt note on the donate page footer text if required by your compliance team.

## 7) QA script
- One-time test (test card 4242 4242 4242 4242): complete flow, expect redirect to `/donate?success=1`, receipt email from Stripe.
- Cancel test: start checkout, click cancel, ensure `/donate?canceled=1` message shows.
- Recurring test: choose monthly, complete checkout, verify Stripe creates a subscription and webhook logs the event.
- Negative test: remove `STRIPE_SECRET_KEY` locally; expect the donate button to show an error message.

## 8) Where to adjust behavior
- Frontend: `src/app/(app)/donate/DonatePageClient.tsx` (preset amounts, currency list, success/cancel messaging).
- Backend: `src/app/api/stripe/donate/route.ts` (success/cancel URLs, metadata, mode, description, currency rules).

## 9) Security reminders
- Never expose `STRIPE_SECRET_KEY` to the client; only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is public.
- Use webhook signature verification; ignore unverified events.
- Log minimally; avoid logging full requests or PII.

## 10) When live
- Switch marketing CTA copy to mention live donations.
- Monitor Stripe Dashboard for failed payments and disputes.
- Keep an eye on webhook delivery logs for errors. If 500s appear, fix and replay events from Stripe.
