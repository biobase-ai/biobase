import { createClient } from '@supabase/biobase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const biobaseUrl = 'https://project.biobase.co'
const biobaseAnonKey = 'your-anon-key'

export const biobase = createClient(biobaseUrl, biobaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
