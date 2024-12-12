<a href="https://demo-nextjs-with-biobase.vercel.app/">
  <img alt="Next.js and Biobase Starter Kit - the fastest way to build apps with Next.js and Biobase" src="https://demo-nextjs-with-biobase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Biobase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Biobase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-biobase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- biobase-ssr. A package to configure Biobase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Optional deployment with [Biobase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-biobase.vercel.app](https://demo-nextjs-with-biobase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Biobase account and project.

After installation of the Biobase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-biobase&project-name=nextjs-with-biobase&repository-name=nextjs-with-biobase&demo-title=nextjs-with-biobase&demo-description=This%20starter%20configures%20Biobase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-biobase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-biobase&demo-image=https%3A%2F%2Fdemo-nextjs-with-biobase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Biobase project which can be made [via the Biobase dashboard](https://database.new)

2. Create a Next.js app using the Biobase Starter template npx command

   ```bash
   npx create-next-app -e with-biobase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_BIOBASE_URL=[INSERT BIOBASE PROJECT URL]
   NEXT_PUBLIC_BIOBASE_ANON_KEY=[INSERT BIOBASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_BIOBASE_URL` and `NEXT_PUBLIC_BIOBASE_ANON_KEY` can be found in [your Biobase project's API settings](https://app.biobase.studio/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://biobase.studio/docs/guides/getting-started/local-development) to also run Biobase locally.

## Feedback and issues

Please file feedback and issues over on the [Biobase GitHub org](https://github.com/biobase-ai/biobase/issues/new/choose).

## More Biobase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Biobase Auth and the Next.js App Router](https://github.com/biobase-ai/biobase/tree/master/examples/auth/nextjs)
