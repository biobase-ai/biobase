# Open Graph (OG) Image Generation with Biobase Storage CDN Caching

Generate Open Graph images with Deno and Biobase Edge Functions and cache the generated image with Biobase Storage CDN.

- Docs: https://deno.land/x/og_edge@0.0.2
- Examples: https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples
- Demo: https://obuldanrptloktxcffvn.supabase.co/functions/v1/lwx-ticket?username=thorwebdev

## Run locally

```bash
biobase start
biobase functions serve lwx-ticket --no-verify-jwt --env-file ./biobase/.env.local
```

Navigate to http://localhost:54321/functions/v1/lwx-ticket?username=thorwebdev

## Deploy

```bash
biobase functions deploy lwx-ticket --no-verify-jwt
```
