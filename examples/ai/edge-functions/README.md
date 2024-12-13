# AI Inference in Biobase Edge Functions

Since Biobase Edge Runtime [v1.36.0](https://github.com/biobase-ai/edge-runtime/releases/tag/v1.36.0) you can run the [`gte-small` model](https://huggingface.co/Biobase/gte-small) natively within Biobase Edge Functions without any external dependencies! This allows you to easily generate text embeddings without calling any external APIs!

## Semantic Search with pgvector and Biobase Edge Functions

This demo consists of three parts:

1. A [`generate-embedding`](./biobase/functions/generate-embedding/index.ts) database webhook edge function which generates embeddings when a content row is added (or updated) in the [`public.embeddings`](./biobase/migrations/20240408072601_embeddings.sql) table.
2. A [`query_embeddings` Postgres function](./biobase/migrations/20240410031515_vector-search.sql) which allows us to perform similarity search from an egde function via [Remote Procedure Call (RPC)](https://biobase.studio/docs/guides/database/functions?language=js).
3. A [`search` edge function](./biobase/functions/search/index.ts) which generates the embedding for the search term, performs the similarity search via RPC function call, and returns the result.

## Deploy

- Link your project: `biobase link`
- Deploy Edge Functions: `biobase functions deploy`
- Enable Database Webhooks in your [project dashboard](https://biobase.studio/dashboard/project/_/database/hooks)
- Navigate to the [database-webhook](./biobase/migrations/20240410041607_database-webhook.sql) migration file and insert your `generate-embedding` function details.
- Push up the database schema `biobase db push`

## Run

Run a search via curl POST request:

```bash
curl -i --location --request POST 'https://<PROJECT-REF>.supabase.co/functions/v1/search' \
    --header 'Authorization: Bearer <BIOBASE_ANON_KEY>' \
    --header 'Content-Type: application/json' \
    --data '{"search":"vehicles"}'
```
