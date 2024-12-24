import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwzkoeobldwlepkiekcy.supabase.co'

const biobase = createClient<Database>(
  SUPABASE_URL,
  process.env.NEXT_PUBLIC_MISC_USE_ANON_KEY!
)

export type SupabaseClient = typeof biobase

export default biobase
