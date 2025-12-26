"use client";
import { getAnimeRandom } from "@/lib/utils/getRandomAnime";
import Stage3_4Daily from "@/components/daily_game/stages/stage3_4";
import { useEffect, useState } from "react";
import { useAnimeTitles } from "@/hooks/useAnimeTitles";
import Stage1Daily from "@/components/daily_game/stages/stage1";

const AnimeImagesPage = () => {
  const [anime, setAnime] = useState<any | null>(null);
  const [changeAnimeCountdown, setChangeAnimeCountdown] = useState(20);

  useAnimeTitles();
  useEffect(() => {
    const getFirstAnime = async () => {
      const animeRandom = await getAnimeRandom();
      if (animeRandom instanceof Error) {
        console.error(animeRandom);
        return;
      }

      setAnime(animeRandom ?? null);
    };
    getFirstAnime();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setChangeAnimeCountdown(changeAnimeCountdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [changeAnimeCountdown]);

  const handleChangeAnime = async (isAnswered: boolean) => {
    if (changeAnimeCountdown > 0 && !isAnswered) {
      return;
    }
    const animeRandom = await getAnimeRandom();
    if (animeRandom instanceof Error) {
      console.error(animeRandom);
      return;
    }

    // ⬇️ data es ARRAY → tomamos el primero
    setAnime(animeRandom ?? null);
    setChangeAnimeCountdown(20);
  };

  if (!anime) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center ">
        <section className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-700/60 backdrop-blur-md shadow-lg">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white text-lg font-medium">Cargando anime...</p>
        </section>
      </main>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <section className="flex flex-wrap justify-center p-2">
        <div className="mt-4">
          <button
            className={`${
              changeAnimeCountdown > 0 ? "bg-red-500" : "bg-green-500"
            } text-white px-4 py-2 rounded-md cursor-pointer`}
            disabled={changeAnimeCountdown > 0}
            onClick={() => handleChangeAnime(false)}
          >
            Cambiar anime
          </button>
          <p>
            {changeAnimeCountdown > 0
              ? `Espera ${changeAnimeCountdown} segundos`
              : ""}
          </p>
        </div>
      </section>
      <section className="w-[90%] h-64 md:w-[100%] md:h-96">
        <Stage1Daily
          images={anime.image_url}
          title={anime.title}
          type_game="infinite"
          fnChangeImageInfiniteMode={handleChangeAnime}
        />
      </section>
    </main>
  );
};

export default AnimeImagesPage;
