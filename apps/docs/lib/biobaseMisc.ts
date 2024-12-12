import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _biobaseMisc: SupabaseClient

export function biobaseMisc() {
  if (!_biobaseMisc) {
    _biobaseMisc = createClient(
      process.env.NEXT_PUBLIC_MISC_URL!,
      process.env.NEXT_PUBLIC_MISC_ANON_KEY!
    )
  }

  return _biobaseMisc
}
