/* El stage 3 consiste en adivinar el anime por el opening del anime. */

import AnimeAllTitlesMenu from "@/components/animeAllTitlesMenu/animeAllTitlesMenu";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { useDailyStore } from "@/store/daily-store";
import next from "next";

const Stage3Daily = ({
  title,
  url_video,
  next_stage,
}: {
  title: string;
  url_video: string;
  next_stage: number;
}) => {
  // Traer funcion para guardar estado

  const { setGameNumber } = useDailyStore();
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

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Guardamos la referencia de los 2 intervalos para poder cortalos cuando sea necesario
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ChangeVisualPiece = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Cambiar la pieza visual cada 10 segundos
    intervalRef.current = setInterval(() => {
      const randomNumberForPiece = Math.floor(Math.random() * 6);
      setIndividualPiece((prev) => {
        const newPiece = [...prev];
        for (let i = 0; i < newPiece.length; i++) {
          newPiece[i] = i === randomNumberForPiece;
        }
        return newPiece;
      });
    }, 10000);

    // Despues de pasra 1 minuto 30 segundos no se deberia mostrar ninguna pieza visual
    timeoutRef.current = setTimeout(() => {
      setIndividualPiece([false, false, false, false, false, false]);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 90000);
  };

  const handleVideoEnd = () => {
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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Reiniciar estados
    setIndividualPiece([false, false, false, false, false, true]);
    setIsCorrect("no_respondido");
    setIsReady(false);
  }, [title, url_video]);

  const handleReady = () => {
    setIsReady(true);
    ChangeVisualPiece();
  };

  const handleUserGuess = (guess: string) => {
    if (guess.toLowerCase() === title.toLowerCase()) {
      setIsCorrect(true);
      handleVideoEnd();
    } else {
      setIsCorrect(false);
    }
  };

  const [isReady, setIsReady] = useState(false);
  return (
    <section className=" w-[100%] h-full">
      <h2 className=" my-4 text-2xl font-bold text-white mb-4 text-center">
        Adivinar el anime por el opening.
      </h2>

      {isReady === true ? (
        <div className="relative">
          <ReactPlayer
            width="100%"
            height="250px"
            autoPlay={true}
            onEnded={() => {
              handleVideoEnd();
            }}
            className="my-8"
            src={url_video}
            config={{
              youtube: {
                color: "white",
              },
            }}
          />

          <div className="absolute inset-0 grid grid-cols-2 grid-rows-3">
            {individualPiece.map((piece, index) => (
              <div
                key={index}
                className={
                  piece
                    ? "transition-all duration-300 ease"
                    : "bg-[#1E293B] border border-gray-600 "
                }
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full bg-[#1E293B] my-4 rounded-2xl">
          ¿Estás listo para comenzar?
          <button
            onClick={() => handleReady()}
            className=" cursor-pointer h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Comenzar
          </button>
        </div>
      )}
      {isCorrect !== "no_respondido" && (
        <div className="flex flex-col justify-center items-center gap-4 mb-4">
          <p>El anime es: {title}</p>
          <button
            onClick={() => {
              setGameNumber(next_stage);
            }}
            className=" cursor-pointer h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Continuar
          </button>
        </div>
      )}

      <AnimeAllTitlesMenu onUserGuess={handleUserGuess} isCorrect={isCorrect} />
    </section>
  );
};

export default Stage3Daily;
