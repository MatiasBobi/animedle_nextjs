import DailyGame from "@/components/daily_game/DailyGame";

import DailyCompleted from "@/components/daily_game/next_day/dailyCompleted";

import { createClient } from "@/lib/supabase/server";

const DailyPage = async () => {
  const supabase = createClient();

  // Traemos el usuario actual
  const user = await (await supabase).auth.getUser();
  const userId = user?.data?.user?.id;

  if (!userId) {
    return (
      <main className="flex flex-col gap-4 h-screen">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-2xl text-red-500">Usuario no autenticado</p>
        </div>
      </main>
    );
  }

  // Traemos todos los animes diarios
  const { data: dailyAnimes, error: dailyAnimesError } = await (await supabase)
    .from("anime_daily")
    .select("*");

  if (dailyAnimesError || !dailyAnimes || dailyAnimes.length === 0) {
    return (
      <main className="flex flex-col gap-4 h-screen">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-2xl text-red-500">
            Error al obtener los animes diarios
          </p>
        </div>
      </main>
    );
  }

  // Obtener la fecha del anime diario actual
  const dailyAnimeDate = new Date(dailyAnimes[0].display_date).getTime();

  //  Obtener los datos del usuario
  let { data: DailyUserData } = await (await supabase)
    .from("user_data")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Si no existe el registro, lo vamos a crear
  if (!DailyUserData) {
    const { data: newUserData } = await (
      await supabase
    )
      .from("user_data")
      .insert({
        user_id: userId,
        last_daily_table: new Date(0).toISOString(), // nunca jugó
        current_stage: 1,
        daily_completed: false,
        game1_status: 2,
        game2_status: 2,
        game3_status: 2,
        game4_status: 2,
        game5_status: 2,
      })
      .select("*")
      .single();

    DailyUserData = newUserData;
  }

  // Aca vamos a verificar si necesitamos actualizar o resetear el progreso del usuario
  const userLastDailyTime = new Date(DailyUserData.last_daily_table).getTime();

  const isSameDaily = userLastDailyTime >= dailyAnimeDate;

  // Si la fecha es menor a la actual del danime diario reseteamos en supabase
  if (!isSameDaily) {
    const { data: updatedUserData } = await (
      await supabase
    )
      .from("user_data")
      .update({
        current_stage: 1,
        last_daily_table: new Date().toISOString(),
        daily_completed: false,
        game1_status: 2,
        game2_status: 2,
        game3_status: 2,
        game4_status: 2,
        game5_status: 2,
      })
      .eq("user_id", userId)
      .select("*")
      .single();

    DailyUserData = updatedUserData;
  }

  if (isSameDaily && DailyUserData.daily_completed) {
    return <DailyCompleted dailyAnimeTime={dailyAnimeDate} />;
  }

  return (
    <main className="flex flex-col gap-4 h-screen">
      <DailyGame
        animes={dailyAnimes}
        current_stage={DailyUserData.current_stage}
        stepsInfo={[
          DailyUserData.game1_status,
          DailyUserData.game2_status,
          DailyUserData.game3_status,
          DailyUserData.game4_status,
          DailyUserData.game5_status,
        ]}
      />
    </main>
  );
};

export default DailyPage;
