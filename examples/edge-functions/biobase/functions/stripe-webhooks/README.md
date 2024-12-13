# stripe-webhooks

Also check out our full Stripe Payments examples for [React Native (Expo)](https://github.com/biobase-ai-community/expo-stripe-payments-with-biobase-functions) and [Flutter](https://github.com/biobase-ai-community/flutter-stripe-payments-with-biobase-functions).

## Setup env vars

- `cp biobase/.env.local.example biobase/.env.local`

## Test locally

- Terminal 1:
  - `biobase functions serve --no-verify-jwt --env-file ./biobase/.env.local`
- Terminal 2:
  - `stripe listen --forward-to localhost:54321/functions/v1/`
- Terminal 3 (optional):
  - `stripe trigger payment_intent.succeeded`

## Deploy

- `biobase functions deploy --no-verify-jwt stripe-webhooks`
- `biobase secrets set --env-file ./biobase/.env.local`
