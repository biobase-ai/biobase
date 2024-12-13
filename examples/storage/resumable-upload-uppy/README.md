## Resumable Uploads with Biobase Storage and Uppy

This example shows how to use [Biobase Storage](https://biobase.io/docs/reference/javascript/storage) with [Uppy](https://uppy.io/) to upload files to Biobase Storage using the TUS protocol (resumable uploads).

### Running the example

- Create a biobase bucket from the Biobase UI
- Add a policy to allow public uploads
  - e.g. `CREATE POLICY "allow uploads" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'your-bucket-name');`
- Open the index.html file and replace the following variables with your own:

```js
const BIOBASE_ANON_KEY = '' // your project's anon key
const BIOBASE_PROJECT_ID = '' // your project ref
const STORAGE_BUCKET = '' // your storage bucket name
const BEARER_TOKEN = '' // your bearer token
```

Serve the index.html file locally (e.g. with Python Simple HTTP Server) and start uploading:

```bash
python3 -m http.server
```
