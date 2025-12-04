import DailyGame from "@/components/daily_game/DailyGame";
import { createClient } from "@/lib/supabase/server";

const DailyPage = async () => {
  const supabase = createClient();

  // Traemos el usuario actual
  const user = await (await supabase).auth.getUser();

  // Traemos todos los animes diarios.
  const { data: dailyAnimes, error: dailyAnimesError } = await (await supabase)
    .from("anime_daily")
    .select("*");

  // Si hay algun problema, mostramos un error.
  if (dailyAnimesError) {
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

  // Traemos la data del usuario para chequear el ultimo dia que jugo y si ya jugo en el dia comprobar si ya lo completo.
  const { data: DailyUserData } = await (await supabase)
    .from("user_data")
    .select("*")
    .single();

  // Extraemos el stage actual que tiene almacenado el usuario en la tabla.
  const current_stage = DailyUserData?.current_stage;
  // SI el jugador ya termino el juego, devolvemos lo siguiente
  if (DailyUserData?.daily_completed) {
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

  // Vamos a crear las fechas para poder comparar si la fecha que tiene registrada el usuario en su user_data sea menor que la de los anime daily. Vamos a comparar con getTime() Ya que la fecha del anime_daily es a las 12m en punto osea:
  // 2025-12-04 00:00:00+00 <--------- FECHA DE EJEMPLO de la fecha de los animes diarios.
  // 2025-12-02 20:58:55.989+00 <--------- FECHA DE EJEMPLO de la ultima vez que jugo el usuario.
  // Si la fecha del usuario es menor a la de la fecha de los animes diarios, debe dejar jugar el juego.

  const dailyAnimeDate = new Date(dailyAnimes[0].display_date).getTime();
  const userLastDailyDate = new Date(DailyUserData?.last_daily_table).getTime();

  if (userLastDailyDate >= dailyAnimeDate && DailyUserData?.daily_completed) {
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

  const { error } = await (
    await supabase
  )
    .from("user_data")
    .update({
      last_daily_table: new Date().toISOString(),
    })
    .eq("user_id", user?.data?.user?.id);

  return (
    <main className="flex flex-col gap-4 h-screen">
      <DailyGame animes={dailyAnimes || []} current_stage={current_stage} />
    </main>
  );
};

export default DailyPage;
