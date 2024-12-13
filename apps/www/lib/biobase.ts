import { createClient } from '@supabase/biobase-js'
import { Database } from './database.types'

const biobase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type BiobaseClient = typeof biobase

export default biobase
