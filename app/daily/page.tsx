import DailyGame from "@/components/daily_game/DailyGame";
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
  const dailyAnimeDate = new Date(dailyAnimes[0].display_date)
    .toISOString()
    .slice(0, 10);

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
        last_daily_table: new Date().toISOString(),
        current_stage: 1,
        daily_completed: false,
      })
      .select("*")
      .single();

    DailyUserData = newUserData;
  }

  // Aca vamos a verificar si necesitamos actualizar o resetear el progreso del usuario
  const userLastDailyDate = new Date(DailyUserData.last_daily_table)
    .toISOString()
    .slice(0, 10);

  // Si la fecha del usuario es anterior al anime diario actual, reseteamos
  if (userLastDailyDate < dailyAnimeDate) {
    const { data: updatedData } = await (
      await supabase
    )
      .from("user_data")
      .update({
        last_daily_table: new Date().toISOString(),
        current_stage: 1,
        daily_completed: false,
      })
      .eq("user_id", userId)
      .select("*")
      .single();

    DailyUserData = updatedData!;
  }

  // Después de todas las actualizaciones, verificar si puede jugar
  const currentUserDate = new Date(DailyUserData.last_daily_table)
    .toISOString()
    .slice(0, 10);

  if (currentUserDate >= dailyAnimeDate && DailyUserData.daily_completed) {
    return (
      <main className="flex flex-col gap-4 h-screen">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-2xl text-red-500">
            Ya has completado el juego diario
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-4 h-screen">
      <DailyGame
        animes={dailyAnimes}
        current_stage={DailyUserData.current_stage}
      />
    </main>
  );
};

export default DailyPage;
