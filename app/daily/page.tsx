import DailyGame from "@/components/daily_game/DailyGame";
import { createClient } from "@/lib/supabase/server";
import { useDailyStore } from "@/store/daily-store";
const DailyPage = async () => {
  const supabase = createClient();

  const { data: dailyAnimes, error: dailyAnimesError } = await (await supabase)
    .from("anime_daily")
    .select("*");

  const {data: animeTitles, error: AnimesTitlesError} = await (await supabase).from("anime").select("title");

  const setAnimeTitles = useDailyStore(state => state.setAnimeTitles)

  if(!AnimesTitlesError) {
    setAnimeTitles(animeTitles?.map(anime => anime.title))
  }

  return (
    <main className="flex flex-col gap-4 h-screen">
      <DailyGame animes={dailyAnimes || []} />
    </main>
  );
};

export default DailyPage;
