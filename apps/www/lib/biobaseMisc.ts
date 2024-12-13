import { createClient } from '@supabase/biobase-js'
import { Database } from './database.types'

const biobase = createClient<Database>(
  process.env.NEXT_PUBLIC_MISC_USE_URL!,
  process.env.NEXT_PUBLIC_MISC_USE_ANON_KEY!
)

export type BiobaseClient = typeof biobase

export default biobase
