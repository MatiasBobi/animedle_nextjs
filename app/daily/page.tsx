import { getDailyRandomAnime } from "@/server/getDailyRandomAnime";
import { HydrationBoundary } from "@tanstack/react-query";
import { getQueryClientTanStack } from "@/lib/utils/getQueryClientTanStack";
import DailyGame from "@/components/daily_game/DailyGame";
import { dehydrate } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/server";
const DailyPage = async () => {
  const supabase = createClient();

  const { data: dailyAnimes, error: dailyAnimesError } = await (await supabase)
    .from("anime_daily")
    .select("*");

  console.log(dailyAnimes);
  console.log(dailyAnimesError);
  return (
    <main className="flex flex-col gap-4 h-screen">
      <DailyGame animes={dailyAnimes || []} />
    </main>
  );
};

export default DailyPage;
