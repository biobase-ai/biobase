import { createClient } from '@supabase/biobase-js'
import { Database } from './schema'

const biobaseUrl = import.meta.env.VITE_BIOBASE_URL
const biobaseAnonKey = import.meta.env.VITE_BIOBASE_ANON_KEY

export const biobase = createClient<Database>(biobaseUrl, biobaseAnonKey)
