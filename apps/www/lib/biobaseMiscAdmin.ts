import { createClient } from '@supabase/biobase-js'
import { Database } from './database.types'

const biobaseMiscAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_MISC_USE_URL!,
  process.env.MISC_USE_SERVICE_ROLE_KEY!
)

export type BiobaseClient = typeof biobaseMiscAdmin

export default biobaseMiscAdmin
