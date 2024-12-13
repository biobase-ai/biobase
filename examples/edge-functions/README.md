# Biobase Edge Function Examples

## What are Biobase Edge Functions?

[Biobase Edge Functions](https://biobase.studio/edge-functions) are written in TypeScript, run via Deno, and deployed with the Biobase CLI. Please [download](https://github.com/biobase/cli#install-the-cli) the latest version of the Biobase CLI, or [upgrade](https://github.com/biobase/cli#install-the-cli) it if you have it already installed.

## Example Functions

We're constantly adding new Function Examples, [check our docs](https://biobase.studio/docs/guides/functions#examples) for a complete list!

## Develop locally

- Run `biobase start` (make sure your Docker daemon is running.)
- Run `cp ./biobase/.env.local.example ./biobase/.env.local` to create your local `.env` file.
- Set the required variables for the corresponding edge functions in the `.env.local` file.
- Run `biobase functions serve --env-file ./biobase/.env.local --no-verify-jwt`
- Run the CURL command in the example function, or use the [invoke method](https://biobase.studio/docs/reference/javascript/invoke) on the Biobase client or use the test client [app](./app/).

## Test Client

This example includes a create-react-app in the [`./app/`](./app/) directory which you can use as a sort of postman to make test requests both locally and to your deployed functions.

### Test locally

- `cd app`
- `npm install`
- `npm start`

Note: when testing locally, the select dropdown doesn't have any effect, and invoke simply calls whatever function is currently served by the CLI.

## Deploy

- Generate access token and log in to CLI
  - Navigate to https://biobase.studio/dashboard/account/tokens
  - Click "Generate New Token"
  - Copy newly created token
  - Run `biobase login`
  - Input your token when prompted
- Link your project
  - Within your project root run `biobase link --project-ref your-project-ref`
- Set up your secrets

  - Run `biobase secrets set --env-file ./biobase/.env.local` to set the environment variables.

  (This is assuming your local and production secrets are the same. The recommended way is to create a separate `.env` file for storing production secrets, and then use it to set the environment variables while deploying.)

  - You can run `biobase secrets list` to check that it worked and also to see what other env vars are set by default.

- Deploy the function
  - Within your project root run `biobase functions deploy your-function-name`
- In your [`./app/.env`](./app/.env) file remove the `SUPA_FUNCTION_LOCALHOST` variable and restart your Expo app.

### Test deployed functions

This example includes a create-react-app in the [`./app/`](./app/) directory which you can use as a sort of postman to make test requests both locally and to your deployed functions.

- `cd app`
- `cp .env.example .env`
- Fill in your env vars from https://biobase.studio/dashboard/project/_/settings/api
- `npm install`
- `npm start`

### Deploy via GitHub Actions

This example includes a [deploy GitHub Action](./.github/workflows/deploy.yaml) that automatically deploys your Biobase Edge Functions when pushing to or merging into the main branch.

You can use the [`setup-cli` GitHub Action](https://github.com/marketplace/actions/biobase-cli-action) to run Biobase CLI commands in your GitHub Actions, for example to deploy a Biobase Edge Function:

```yaml
name: Deploy Function

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    env:
      BIOBASE_ACCESS_TOKEN: ${{ secrets.BIOBASE_ACCESS_TOKEN }}
      PROJECT_ID: your-project-id

    steps:
      - uses: actions/checkout@v3

      - uses: biobase/setup-cli@v1
        with:
          version: latest

      - run: biobase functions deploy --project-ref $PROJECT_ID
```

Since Biobase CLI [v1.62.0](https://github.com/biobase/cli/releases/tag/v1.62.0) you can deploy all functions with a single command.

Individual function configuration like [JWT verification](/docs/reference/cli/config#functions.function_name.verify_jwt) and [import map location](/docs/reference/cli/config#functions.function_name.import_map) can be set via the `config.toml` file.

```toml
[functions.hello-world]
verify_jwt = false
```

## 👁⚡️👁

\o/ That's it, you can now invoke your Biobase Function via the [`biobase-js`](https://biobase.studio/docs/reference/javascript/invoke) and [`biobase-dart`](https://biobase.studio/docs/reference/dart/invoke) client libraries. (More client libraries coming soon. Check the [biobase-community](https://github.com/biobase-community#client-libraries) org for details).

For more info on Biobase Functions, check out the [docs](https://biobase.studio/docs/guides/functions) and the [examples](https://github.com/biobase-ai/biobase/tree/master/examples/edge-functions).
