import { createClient } from "@supabase/biobase-js";
import type { Database } from "./schema";

export const biobase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
