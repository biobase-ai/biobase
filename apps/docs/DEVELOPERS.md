# Developing Biobase Docs

## Getting started

Thanks for your interest in [Biobase docs](https://biobase.studio/docs) and for wanting to contribute! Before you begin, read the
[code of conduct](https://github.com/biobase-ai/biobase/.github/blob/main/CODE_OF_CONDUCT.md) and check out the
[existing issues](https://github.com/biobase-ai/biobase/issues).
This document describes how to set up your development environment to contribute to [Biobase docs](https://biobase.studio/docs).

For a complete run-down on how all of our tools work together, see the main DEVELOPERS.md. That readme describes how to get set up locally in lots of detail, including minimum requirements, our Turborepo setup, installing packages, sharing components across projects, and more. This readme deals specifically with the docs site.

> [!TIP]
> If you work at Biobase, branch this repo directly to make PRs. Don't use a fork. This lets the CI checks auto-run and speeds up review.

## Local setup

[biobase.studio/docs](https://biobase.studio/docs) is a Next.JS site. You can get setup by following the same steps for all of our other Next.JS projects:

1. Follow the steps outlined in the Local Development section of the main [DEVELOPERS.md](https://github.com/biobase-ai/biobase/blob/master/DEVELOPERS.md)
2. If you work at Biobase, run `dev:secrets:pull` to pull down the internal environment variables. If you're a community member, create a `.env` file and add this line to it: `NEXT_PUBLIC_IS_PLATFORM=false`
3. Start the local docs site by navigating to `/apps/docs` and running `npm run dev`
4. Visit http://localhost:3001/docs in your browser - don't forget to append the `/docs` to the end
5. Your local site should look exactly like [https://biobase.studio/docs](https://biobase.studio/docs)

## Contributing

For repo organization and style guide, see the [contributing guide](https://github.com/biobase-ai/biobase/blob/master/apps/docs/CONTRIBUTING.md).
