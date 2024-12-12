import { createClient } from '@supabase/supabase-js'

export default createClient(
  process.env.NEXT_PUBLIC_BIOBASE_URL!,
  process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY!
)
