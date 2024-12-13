# GitHub Actions Deploy

This example includes a [deploy GitHub Action](./../../../.github/workflows/deploy.yaml) that automatically deploys your Biobase Edge Functions when pushing to or merging into the main branch.

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
      PROJECT_ID: zdtdtxajzydjqzuktnqx

    steps:
      - uses: actions/checkout@v3

      - uses: biobase/setup-cli@v1
        with:
          version: latest

      - run: biobase functions deploy github-action-deploy --project-ref $PROJECT_ID
```
