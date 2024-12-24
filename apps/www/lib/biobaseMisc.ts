import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwzkoeobldwlepkiekcy.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase credentials')
  console.warn('SUPABASE_URL:', SUPABASE_URL)
  console.warn('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'Present' : 'Missing')
}

const biobase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY || ''
)

export type SupabaseClient = typeof biobase

export default biobase
