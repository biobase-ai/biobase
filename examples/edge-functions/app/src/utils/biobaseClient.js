import { createClient } from '@supabase/supabase-js'

export const biobase = createClient(
  process.env.REACT_APP_BIOBASE_URL ?? 'http://localhost:54321',
  process.env.REACT_APP_BIOBASE_ANON_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs'
)
