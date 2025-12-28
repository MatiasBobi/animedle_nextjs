/* El stage 3 consiste en adivinar el anime por el opening del anime. */

import AnimeAllTitlesMenu from "@/components/animeAllTitlesMenu/animeAllTitlesMenu";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { useDailyStore } from "@/store/daily-store";
import { DailyProgressType, useDailyProgress } from "@/hooks/useDailyProgress";

const Stage3_4Daily = ({
  title,
  type_stat,
  url_video,
  next_stage,
  game_status,
  type_game,
  fnChangeAnimeOnInfiniteMode,
}: {
  title: string;
  type_stat?: DailyProgressType;
  url_video: string;
  next_stage?: number;
  game_status?: string;
  type_game: "daily" | "infinite";
  fnChangeAnimeOnInfiniteMode?: (isCorrect: boolean) => void;
}) => {
  // Traemos el hook para poder updatear en la base de datos
  const { updateStat } = useDailyProgress();
  // Traer funcion para guardar estado

  const { setGameNumber, updateStepInfo } = useDailyStore();
  // Declaracion si es correcto y las piezas individuales.
  const [individualPiece, setIndividualPiece] = useState([
    false,
    false,
    false,
    false,
    false,
    true,
  ]);
  const [isCorrect, setIsCorrect] = useState<boolean | string>("no_respondido");

  // Manejo de errores y fallback de  los videos
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Guardamos la referencia de los 2 intervalos para poder cortalos cuando sea necesario
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gameEndedRef = useRef(false);
  // Referencias para el estado de la reproduccion del video

  const ChangeVisualPiece = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Cambiar la pieza visual cada 10 segundos
    intervalRef.current = setInterval(() => {
      if (gameEndedRef.current) return;
      const randomNumberForPiece = Math.floor(Math.random() * 6);
      setIndividualPiece((prev) => {
        const newPiece = [...prev];
        for (let i = 0; i < newPiece.length; i++) {
          newPiece[i] = i === randomNumberForPiece;
        }
        return newPiece;
      });
    }, 10000);
  };

  const handleVideoEnd = () => {
    gameEndedRef.current = true;

    setIndividualPiece([false, false, false, false, false, false]);
    // Limpiamos todos los intervalos
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    // Limpiamos todo si el componente cambia

    gameEndedRef.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Reiniciar estados
    setIndividualPiece([false, false, false, false, false, false]);
    setIsCorrect("no_respondido");

    setIsReady(false);
  }, [title, url_video]);

  const handleReady = () => {
    setIsReady(true);
    ChangeVisualPiece();
  };

  const handleUserGuess = (guess: string) => {
    if (guess.toLowerCase() === title.toLowerCase()) {
      // Actualizamos la estadistica en la base de datos
      if (type_game === "daily") {
        updateStepInfo(type_stat === "opening_ok" ? 2 : 3, 1);
        if (type_stat && game_status && next_stage) {
          updateStat(type_stat, true, next_stage, false, game_status);
        }
      }
      setIsCorrect(true);
      handleVideoEnd();
    } else {
      // Actualizamos la estadistica en la base de datos
      if (type_game === "daily") {
        updateStepInfo(type_stat === "opening_ok" ? 2 : 3, 0);
        if (type_stat && game_status && next_stage) {
          updateStat(type_stat, false, next_stage, false, game_status);
        }
      }
      setIsCorrect(false);
    }
  };
  const handleContinue = () => {
    if (type_game === "daily") {
      setGameNumber(next_stage ?? 5);
      setIsCorrect("no_respondido");
    }
    if (type_game === "infinite") {
      setIsCorrect("no_respondido");
      fnChangeAnimeOnInfiniteMode?.(true);
      setIndividualPiece([false, false, false, false, false, true]);
    }
  };

  const [isReady, setIsReady] = useState(false);

  return (
    <section className="w-full h-full">
      <h2 className="my-4 text-2xl font-bold text-white text-center">
        Adivinar el anime por el{" "}
        {type_stat === "opening_ok" ? "opening" : "ending"}
      </h2>

      {!isReady ? (
        <div className="flex flex-col items-center justify-center h-full bg-[#1E293B] my-4 rounded-2xl">
          ¿Estás listo para comenzar?
          <button
            onClick={handleReady}
            className="h-12 px-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Comenzar
          </button>
        </div>
      ) : (
        <div className="relative w-full max-w-4xl mx-auto aspect-video mb-4">
          <ReactPlayer
            className="absolute top-0 left-0"
            width="100%"
            height="100%"
            playsInline
            src={url_video}
            playing={isPlaying}
            controls={false}
            onEnded={() => {
              handleVideoEnd();
              setIsPlaying(false);
            }}
            preload="auto"
            loop={false}
            onReady={() => {
              setShowPlayer(true);
              setIsPlaying(true);
            }}
            onWaiting={() => {
              console.log("buffering…");
              // Puedes mostrar un mensaje de carga aquí
            }}
            onError={(e) => {
              console.error("video error", e);
              // Puedes gestionar errores aquí
            }}
            onLoad={() => setIsReady(true)}
          />
          {!showPlayer && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1E293B] text-white">
              Cargando opening…
            </div>
          )}

          {isReady && isCorrect === "no_respondido" && (
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 z-20 pointer-events-none">
              {individualPiece.map((piece, index) => (
                <div
                  key={index}
                  className={
                    piece
                      ? "transition-all duration-300 ease"
                      : "bg-[#1E293B] border border-gray-600"
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {isCorrect !== "no_respondido" && (
        <div className="flex flex-col justify-center items-center gap-4 mb-4">
          <p>El anime es: {title}</p>
          <button
            onClick={handleContinue}
            className="h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Continuar
          </button>
        </div>
      )}

      <AnimeAllTitlesMenu onUserGuess={handleUserGuess} isCorrect={isCorrect} />
    </section>
  );
};

export default Stage3_4Daily;
