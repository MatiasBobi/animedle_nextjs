"use client";

import { getAnimeRandom } from "@/lib/utils/getRandomAnime";
import Stage3_4Daily from "@/components/daily_game/stages/stage3_4";
import { useEffect, useState } from "react";
import { useAnimeTitles } from "@/hooks/useAnimeTitles";

const OpeningsTrivia = () => {
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

  const handleChangeAnime = async () => {
    if (changeAnimeCountdown > 0) {
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
    return <p>Cargando...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <div className="mt-4">
        <button
          className={`${
            changeAnimeCountdown > 0 ? "bg-red-500" : "bg-green-500"
          } text-white px-4 py-2 rounded-md cursor-pointer`}
          disabled={changeAnimeCountdown > 0}
          onClick={handleChangeAnime}
        >
          Cambiar anime
        </button>
        <p>
          {changeAnimeCountdown > 0
            ? `Espera ${changeAnimeCountdown} segundos`
            : ""}
        </p>
      </div>
      <section className="flex flex-col  gap-4 w-90 h-64 md:w-180 md:h-96">
        <Stage3_4Daily
          title={anime.title}
          url_video={anime.openings || ""}
          type_game="infinite"
          type_stat="opening_ok"
        />
      </section>
    </main>
  );
};

export default OpeningsTrivia;
