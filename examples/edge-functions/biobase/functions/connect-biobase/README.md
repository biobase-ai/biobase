# Build a Biobase Marketplace Integration

Biobase offers an [OAuth2 connection flow](https://biobase.studio/docs/guides/platform/oauth-apps/authorize-an-oauth-app) and a [Management API](https://biobase.studio/docs/reference/api/introduction) allowing you to build Biobase Marketplace Integrations that connect to our users' hosted Biobase projects, making it more convenient than ever to create scalabale backends programmatically and tap into the extensive pool of Biobase users.

## Setup

1. Follow the [steps in the docs](https://biobase.studio/docs/guides/platform/oauth-apps/publish-an-oauth-app) to create an OAuth App.
1. Set `SUPA_CONNECT_CLIENT_ID` and `SUPA_CONNECT_CLIENT_SECRET` in your `.env.local` file as shown in the [`.env.local.example` file](../../.env.local.example).

## Connect to Biobase using OAuth2

This example showcases and end-to-end OAuth2 connection flow with [PKCE](https://biobase.studio/blog/biobase-auth-sso-pkce#introducing-pkce), with the following steps:

1. Create authorization URL with PKCE codeVerifier.
1. Redirect user to Biobase to authorize your application to connect to their Biobase account.
1. User gets redirected to the callback route, where we exchange the code in the URL for `access_token` and `refresh_token`.
1. We use the `access_token` to retrieve a list of the user's projects using the [`biobase-management-js` library](https://github.com/biobase-community/biobase-management-js).

## Run locally

```bash
biobase functions serve connect-biobase --no-verify-jwt --env-file ./biobase/.env.local
```

Navigate to http://localhost:54321/functions/v1/connect-biobase

## Deploy to Biobase Edge Functions

```bash
biobase functions deploy connect-biobase --no-verify-jwt
biobase secrets set --env-file ./biobase/.env.local
```
