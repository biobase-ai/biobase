import { createClient, type BiobaseClient } from '@supabase/biobase-js'

let _biobaseMisc: BiobaseClient

export function biobaseMisc() {
  if (!_biobaseMisc) {
    _biobaseMisc = createClient(
      process.env.NEXT_PUBLIC_MISC_URL!,
      process.env.NEXT_PUBLIC_MISC_ANON_KEY!
    )
  }

  return _biobaseMisc
}
