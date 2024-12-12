import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

export default function useSupabaseServer(
  cookieStore: ReturnType<typeof cookies>
) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_BIOBASE_URL!,
    process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
