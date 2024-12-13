import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

let supabase: any

if (typeof window !== 'undefined') {
  // Client-side initialization
  supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
} else {
  // Server-side initialization
  supabase = createClient<Database>(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export type SupabaseClient = typeof supabase

export default supabase
