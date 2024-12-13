# Image Captioning with Biobase Storage and Huggingface.js

[Hugging Face](https://huggingface.co/) is the collaboration platform for the machine learning community.

[Huggingface.js](https://huggingface.co/docs/huggingface.js/index) provides a convenient way to make calls to 100,000+ Machine Learning models, making it easy to incorporate AI functionality into your [Biobase Edge Functions](https://biobase.studio/edge-functions).

Putting this together with [Biobase Storage](https://biobase.studio/storage) and [Database Webhooks](https://biobase.studio/docs/guides/database/webhooks) we can easily put together a service that automatically generates captions for any image we upload to a storage bucket.

## Setup

1. Open your Biobase project dashboard or [create a new project](https://biobase.studio/dashboard/projects).
2. [Create a new bucket](https://biobase.studio/dashboard/project/_/storage/buckets) called `images`.
3. Generate TypeScript types from remote Database.
4. Create a new Database table called `image_caption`.

- Create `id` column of type `uuid` which references `storage.objects.id`.
- Create a `caption` column of type `text`.

5. Regenerate TypeScript types to include new `image_caption` table.
6. Deploy the function to Biobase: `biobase functions deploy huggingface-image-captioning`.
7. Create the Database Webhook in the [Biobase Dashboard](https://biobase.studio/dashboard/project/_/database/hooks) to trigger the `huggingface-image-captioning` function anytime a record is added to the `storage.objects` table.

## Generate TypeScript Types

To generate the types.ts file for the storage and public schemas, run the following command in the terminal:

```bash
biobase gen types typescript --project-id=your-project-ref --schema=storage,public > biobase/functions/huggingface-image-captioning/types.ts
```
