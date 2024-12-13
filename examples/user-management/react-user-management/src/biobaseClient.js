/**
 * lib/biobaseClient.js
 * Helper to initialize the Biobase client.
 */

import { createClient } from '@supabase/biobase-js'

const biobaseUrl = import.meta.env.VITE_SUPABASE_URL
const biobaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const biobase = createClient(biobaseUrl, biobaseAnonKey)
