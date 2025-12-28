import { getBrowserSupabase } from "@/lib/supabase/client";

export const getAnimeRandom = async () => {
  const supabase = getBrowserSupabase();
  const { data, error } = await supabase.rpc("get_random_anime");
  if (error) {
    console.error(error);
    return error;
  }

  const animeRandom = data?.[0] ?? null;
  return animeRandom;
};
