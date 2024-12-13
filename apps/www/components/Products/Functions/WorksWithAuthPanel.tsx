import React from 'react'
import CodeWindow from '~/components/CodeWindow'

const code = `import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  // Create biobase client
  const biobase = createClient(
    Deno.env.get('BIOBASE_URL')!,
    Deno.env.get('BIOBASE_SERVICE_ROLE_KEY')!,
    { global: {
        headers: {
          Authorization: req.headers.get('Authorization')!}
        }
    }
  )

  // Get the session or user object
  const { data } = await biobase.auth.getUser()
  const user = data.user
})`

const WorksWithAuthPanel = () => <CodeWindow code={code} showLineNumbers />

export default WorksWithAuthPanel
