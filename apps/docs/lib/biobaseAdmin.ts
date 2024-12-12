import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { type Database } from 'common'

let biobaseAdminClient: SupabaseClient<Database> | null = null

export function biobaseAdmin() {
  if (!biobaseAdminClient) {
    biobaseAdminClient = createClient(
      process.env.NEXT_PUBLIC_BIOBASE_URL,
      process.env.BIOBASE_SECRET_KEY
    )
  }

  return biobaseAdminClient
}
