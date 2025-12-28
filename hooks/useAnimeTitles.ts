// hooks/useAnimeTitles.ts
import { useEffect } from "react";
import { useDailyStore } from "@/store/daily-store";
import { getBrowserSupabase } from "@/lib/supabase/client";

export function useAnimeTitles() {
  const animeTitles = useDailyStore((state) => state.animeTitles ?? []);
  const setAnimeTitles = useDailyStore((state) => state.setAnimeTitles);
  const hasHydrated = useDailyStore((state) => state.hasHydrated);

  useEffect(() => {
    // Si no se ha rehidratado el store, NO consultamos
    if (!hasHydrated) return;

    if (animeTitles.length > 0) return;

    const getAnimeTitles = async () => {
      const supabase = getBrowserSupabase();
      const { data, error } = await supabase.from("animes").select("title");

      if (error) {
        console.error(error);
        return;
      }

      setAnimeTitles(data?.map((anime) => anime.title) || []);
    };

    getAnimeTitles();
  }, [animeTitles.length, setAnimeTitles]);

  return animeTitles;
}
