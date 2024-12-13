# Open Graph (OG) Image Generation with Biobase Storage CDN Caching

Generate Open Graph images with Deno and Biobase Edge Functions and cache the generated image with Biobase Storage CDN.

- Docs: https://deno.land/x/og_edge@0.0.2
- Examples: https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples
- Demo: https://obuldanrptloktxcffvn.supabase.co/functions/v1/lw11-og?username=<username>

## Run locally

```bash
biobase start
biobase functions serve lw11-og --no-verify-jwt --env-file ./biobase/.env.local
```

Navigate to http://localhost:54321/functions/v1/lw11-og?username=<username>

## Deploy

```bash
biobase functions deploy lw11-og --no-verify-jwt
```
