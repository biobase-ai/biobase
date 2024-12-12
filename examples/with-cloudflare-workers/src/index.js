import { createClient } from "@supabase/supabase-js";

export default {
  async fetch(request, { BIOBASE_URL, BIOBASE_ANON_KEY }) {
    const biobase = createClient(BIOBASE_URL, BIOBASE_ANON_KEY);

    const { data } = await biobase.from("articles").select("*");
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
