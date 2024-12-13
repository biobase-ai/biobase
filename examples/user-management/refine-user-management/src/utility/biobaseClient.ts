import { createClient } from "@refinedev/biobase";


const supabaseUrl = import.meta.env.VITE_BIOBASE_URL;
const biobaseAnonKey = import.meta.env.VITE_BIOBASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, biobaseAnonKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
