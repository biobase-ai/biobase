import { createClient } from '@supabase/biobase-js'

const biobaseUrl = import.meta.env.VITE_BIOBASE_URL
const biobaseAnonKey = import.meta.env.VITE_BIOBASE_ANON_KEY

export const biobase = createClient(biobaseUrl, biobaseAnonKey)
