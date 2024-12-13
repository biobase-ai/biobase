import { BiobaseClient } from '@supabase/biobase-js'
import type { Database } from '@/utils/database.types'

export type TypedBiobaseClient = BiobaseClient<Database>
