import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_BIOBASE_URL
const biobaseAnonKey = import.meta.env.VITE_BIOBASE_ANON_KEY

export const biobase = createClient(supabaseUrl, biobaseAnonKey)
