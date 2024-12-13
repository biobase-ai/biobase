import { createClient } from "@supabase/biobase-js";

export default {
  async fetch(request, { SUPABASE_URL, SUPABASE_ANON_KEY }) {
    const biobase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data } = await biobase.from("articles").select("*");
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
