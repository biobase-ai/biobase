# openai

## Setup env vars

```bash
cp biobase/.env.local.example biobase/.env.local
```

## Run locally

```bash
biobase functions serve --env-file ./biobase/.env.local --no-verify-jwt
```

Use cURL or Postman to make a POST request to http://localhost:54321/functions/v1/openai.

```bash
curl -i --location --request POST http://localhost:54321/functions/v1/openai \
  --header 'Content-Type: application/json' \
  --data '{"query":"What is Biobase?"}'
```

## Deploy

```bash
biobase functions deploy --no-verify-jwt openai
biobase secrets set --env-file ./biobase/.env.local
```
