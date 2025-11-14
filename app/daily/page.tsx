import DailyGame from "@/components/daily_game/DailyGame";
import { createClient } from "@/lib/supabase/server";
import { useDailyStore } from "@/store/daily-store";
const DailyPage = async () => {
  const supabase = createClient();

  const { data: dailyAnimes, error: dailyAnimesError } = await (await supabase)
    .from("anime_daily")
    .select("*");



  return (
    <main className="flex flex-col gap-4 h-screen">
      <DailyGame animes={dailyAnimes || []} />
    </main>
  );
};

export default DailyPage;
