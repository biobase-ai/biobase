import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Create a biobase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_BIOBASE_URL!,
    process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY!
  )
}