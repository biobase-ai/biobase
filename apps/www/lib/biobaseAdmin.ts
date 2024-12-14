import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const biobaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export type SupabaseClient = typeof biobaseAdmin

export default biobaseAdmin
