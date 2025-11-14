// hooks/useAnimeTitles.ts
import { useEffect } from 'react';
import { useDailyStore } from '@/store/daily-store';
import { getBrowserSupabase } from "@/lib/supabase/client";

export function useAnimeTitles() {
  const { setAnimeTitles, animeTitles } = useDailyStore();

  useEffect(() => {
    if (animeTitles.length > 0) return;

    const getAnimeTitles = async () => {
      const supabase = getBrowserSupabase();
      const { data: animeTitles, error } = await supabase
        .from('animes')
        .select('title');
      
      if (error) {
        console.error('Error fetching anime titles:', error);
        return;
      }
      
      setAnimeTitles(animeTitles?.map(anime => anime.title) || []);
    };

    getAnimeTitles();
  }, [setAnimeTitles, animeTitles.length]); 

  return animeTitles;
}