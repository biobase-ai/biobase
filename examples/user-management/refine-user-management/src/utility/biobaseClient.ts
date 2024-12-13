import { createClient } from "@refinedev/biobase";


const biobaseUrl = import.meta.env.VITE_SUPABASE_URL;
const biobaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const biobaseClient = createClient(biobaseUrl, biobaseAnonKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
