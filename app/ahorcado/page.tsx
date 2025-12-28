"use client";
import Stage5Daily from "@/components/daily_game/stages/stage5";
import { getAnimeRandom } from "@/lib/utils/getRandomAnime";
import { AnimeDaily } from "@/types/daily_types";
import { useEffect, useState } from "react";
const AhorcaditoPage = () => {
  const [anime, setAnime] = useState<AnimeDaily | null>(null);

  const handleChangeAnime = async () => {
    const animeRandom = await getAnimeRandom();
    if (animeRandom instanceof Error) {
      return;
    }
    setAnime(animeRandom);
  };
  useEffect(() => {
    const getFirstAnime = async () => {
      const animeRandom = await getAnimeRandom();
      if (animeRandom instanceof Error) {
        console.error(animeRandom);
        return;
      }
      setAnime(animeRandom);
    };
    getFirstAnime();
  }, []);

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
      <section className="mt-4 flex flex-row items-center justify-center gap-4 w-[90%] md:w-[50%] ">
        <Stage5Daily
          title={anime?.title || ""}
          type_game="infinite"
          fnChangeAnimeAnimeOnInfiniteMode={handleChangeAnime}
        />
      </section>
    </main>
  );
};

export default AhorcaditoPage;
