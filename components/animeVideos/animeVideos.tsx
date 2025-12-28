"use client";

import { getAnimeRandom } from "@/lib/utils/getRandomAnime";
import Stage3_4Daily from "@/components/daily_game/stages/stage3_4";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useAnimeTitles } from "@/hooks/useAnimeTitles";

const Countdown = React.memo(({ value }: { value: number }) => {
  return <p>{value > 0 ? `Espera ${value} segundos` : ""}</p>;
});
Countdown.displayName = "Countdown";

const OpeningsTrivia = ({
  type_game,
}: {
  type_game: "openings" | "endings";
}) => {
  const [animeVideo, setAnimeVideo] = useState<any | null>(null);
  const [type] = useState(type_game);
  const [changeAnimeCountdown, setChangeAnimeCountdown] = useState(20);

  useAnimeTitles();

  const GetRandomVideoFromAnimesVideos = (anime: any) => {
    if (!anime) return "";

    if (type_game === "openings" && anime.openings) {
      const openings = anime.openings.split("|");
      return openings[Math.floor(Math.random() * openings.length)].trim();
    }

    if (type_game === "endings" && anime.endings) {
      const endings = anime.endings.split("|");
      return endings[Math.floor(Math.random() * endings.length)].trim();
    }

    return "";
  };

  // Aca memorizo la URL
  const videoUrl = useMemo(() => {
    if (!animeVideo) return "";
    return GetRandomVideoFromAnimesVideos(animeVideo);
  }, [animeVideo, type_game]);

  useEffect(() => {
    if (changeAnimeCountdown <= 0) return;

    const interval = setInterval(() => {
      setChangeAnimeCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [changeAnimeCountdown]);

  const handleChangeAnime = useCallback(
    async (isCorrect: boolean) => {
      if (changeAnimeCountdown > 0 && !isCorrect) return;

      const animeRandom = await getAnimeRandom();
      if (!(animeRandom instanceof Error)) {
        const extractVideoFromAnime =
          GetRandomVideoFromAnimesVideos(animeRandom);
        setAnimeVideo({
          title: animeRandom.title,
          video: extractVideoFromAnime,
        });
        setChangeAnimeCountdown(20);
      }
    },
    [changeAnimeCountdown]
  );

  useEffect(() => {
    const getFirstAnime = async () => {
      const animeRandom = await getAnimeRandom();
      if (animeRandom instanceof Error) {
        console.error(animeRandom);
        return;
      }
      const extractVideoFromAnime = GetRandomVideoFromAnimesVideos(animeRandom);
      setAnimeVideo({ title: animeRandom.title, video: extractVideoFromAnime });
    };
    getFirstAnime();
  }, []);

  // Memoizar el className del botón
  const buttonClassName = useMemo(() => {
    return `${
      changeAnimeCountdown > 0 ? "bg-red-500" : "bg-green-500"
    } text-white px-4 py-2 rounded-md cursor-pointer`;
  }, [changeAnimeCountdown]);

  if (!animeVideo) {
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
    <main className="flex flex-col items-center justify-center gap-1 w-full h-full">
      <section className="mt-2 flex flex-row items-center justify-center gap-4">
        <div>
          <button
            className={buttonClassName}
            disabled={changeAnimeCountdown > 0}
            onClick={() => handleChangeAnime(true)}
          >
            Cambiar anime
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-4 w-90 h-64 md:w-180 md:h-96">
        {type_game === "openings" ? (
          <Stage3_4Daily
            title={animeVideo.title}
            url_video={animeVideo.video}
            type_stat="opening_ok"
            type_game="infinite"
            fnChangeAnimeOnInfiniteMode={handleChangeAnime}
          />
        ) : (
          <Stage3_4Daily
            title={animeVideo.title}
            url_video={animeVideo.video}
            type_stat="ending_ok"
            type_game="infinite"
            fnChangeAnimeOnInfiniteMode={handleChangeAnime}
          />
        )}
      </section>
    </main>
  );
};

export default React.memo(OpeningsTrivia);
