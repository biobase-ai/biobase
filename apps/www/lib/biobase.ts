import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const biobase = createClient<Database>(
  process.env.NEXT_PUBLIC_BIOBASE_URL!,
  process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY!,
  {
    realtime: {
      params: {
        eventsPerSecond: 1000,
      },
    },
  }
)

export type SupabaseClient = typeof biobase

export default biobase
