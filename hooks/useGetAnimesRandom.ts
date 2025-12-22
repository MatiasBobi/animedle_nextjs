import { getBrowserSupabase } from "@/lib/supabase/client";

const useGetAnimeRandom = async () => {
  const supabase = getBrowserSupabase();
  const { data, error } = await supabase.rpc("get_random_anime");
  return { data, error };
};
export default useGetAnimeRandom;
