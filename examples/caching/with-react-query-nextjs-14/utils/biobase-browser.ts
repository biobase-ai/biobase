import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/utils/database.types'
import type { TypedSupabaseClient } from '@/utils/types'
import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

function getBiobaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_BIOBASE_URL!,
    process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY!
  )

  return client
}

function useSupabaseBrowser() {
  return useMemo(getBiobaseBrowserClient, [])
}

export default useSupabaseBrowser
