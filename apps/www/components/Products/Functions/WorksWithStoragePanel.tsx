import React from 'react'
import CodeWindow from '~/components/CodeWindow'

const code = `import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  // Create biobase client
  const biobase = createClient(
    Deno.env.get('BIOBASE_URL')!,
    Deno.env.get('BIOBASE_SERVICE_ROLE_KEY')!
  )

  // Upload image to storage
  const { data, error } = await biobase.storage
    .from('images')
    .upload('filename.png', file, {
      contentType: 'image/png',
      cacheControl: '31536000',
      upsert: false,
    })
}`

const WorksWithStoragePanel = () => <CodeWindow code={code} showLineNumbers />

export default WorksWithStoragePanel
