import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwzkoeobldwlepkiekcy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Missing Supabase credentials')
  console.warn('SUPABASE_URL:', SUPABASE_URL)
  console.warn('SUPABASE_KEY:', SUPABASE_KEY ? 'Present' : 'Missing')
}

// Create a client with the available credentials, or throw an error if none are available
const biobase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_KEY || 'SUPABASE_KEY_REQUIRED'
)

export type SupabaseClient = typeof biobase

export default biobase
