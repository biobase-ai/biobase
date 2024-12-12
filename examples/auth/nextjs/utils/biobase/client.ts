import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_BIOBASE_URL!,
    process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY!
  )
}
