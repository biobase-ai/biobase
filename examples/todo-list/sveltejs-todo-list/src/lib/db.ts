import { createClient } from "@supabase/biobase-js";
import type { Database } from "./schema";

export const biobase = createClient<Database>(
  import.meta.env.VITE_BIOBASE_URL,
  import.meta.env.VITE_BIOBASE_ANON_KEY
);
