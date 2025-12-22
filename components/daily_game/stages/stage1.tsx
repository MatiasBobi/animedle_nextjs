import { useEffect, useState } from "react";
import { useDailyStore } from "@/store/daily-store";
import AnimeAllTitlesMenu from "@/components/animeAllTitlesMenu/animeAllTitlesMenu";
import { DailyProgressType, useDailyProgress } from "@/hooks/useDailyProgress";

const Stage1Daily = ({
  images,
  title,
  type_stat,
  game_status,
  type_game,
  fnChangeImageInfiniteMode,
}: {
  images: string;
  title: string;
  type_stat?: DailyProgressType;
  game_status?: string;
  type_game: "daily" | "infinite";
  fnChangeImageInfiniteMode?: (isAnswered: boolean) => void;
}) => {
  // Traemos el hook para poder updatear en la base de datos
  const { updateStat } = useDailyProgress();

  // State para el numero de juego
  const { setGameNumber, updateStepInfo } = useDailyStore();

  // Estados para el juego
  const [incorrectAttempts, setIncorrectAttempts] = useState(1);
  const [individualPiece, setIndividualPiece] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isCorrect, setIsCorrect] = useState<boolean | string>("no_respondido");

  useEffect(() => {
    setIncorrectAttempts(1);
    setIndividualPiece([true, false, false, false, false, false]);
  }, [title]);
  const handleUserGuess = (userGuess: string) => {
    if (isCorrect === true || incorrectAttempts >= 6) return;

    // Aca chequeamos si es correcto lo que el usuario ingresa
    if (userGuess.toLowerCase().trim() === title.toLowerCase().trim()) {
      setIndividualPiece([true, true, true, true, true, true]);
      if (type_game === "daily") {
        updateStepInfo(0, 1);
        updateStat(type_stat, true, 2, false, game_status);
      }
      setIsCorrect(true);
    } else {
      // Lógica para intento incorrecto
      const newAttempts = incorrectAttempts + 1;
      setIncorrectAttempts(newAttempts);

      setIndividualPiece((prev) => {
        const newPieces = [...prev];
        newPieces[incorrectAttempts] = true;
        return newPieces;
      });

      if (newAttempts === 6) {
        if (type_game === "daily") {
          updateStepInfo(0, 0);
          updateStat(type_stat, false, 2, false, game_status);
        }
        setIsCorrect(false);
      }
    }
  };
  const handleContinue = () => {
    if (type_game === "daily") {
      setGameNumber(2);
    }
    if (type_game === "infinite") {
      setIsCorrect("no_respondido");
      setIndividualPiece([true, false, false, false, false, false]);
      fnChangeImageInfiniteMode?.(true);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="md:hidden block">
        <AnimeAllTitlesMenu
          isCorrect={isCorrect}
          onUserGuess={handleUserGuess}
        />
      </div>
      <div className="mt-2 md:mt-0">
        <div className="relative md:w-76 md:h-96 inline-block max-w-full">
          <img
            src={images || ""}
            alt="Anime to guess"
            className="max-w-full h-max md:w-76 md:h-96 object-contain"
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
      </div>

      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="font-bold mt-4">Intentos {incorrectAttempts}/6</p>
        {isCorrect !== "no_respondido" ? (
          <>
            <p>El anime es: {title}</p>
            <button
              onClick={() => handleContinue()}
              className="p-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Continuar
            </button>
          </>
        ) : null}
      </div>

      <div className="hidden md:block">
        <AnimeAllTitlesMenu
          isCorrect={isCorrect}
          onUserGuess={handleUserGuess}
        />
      </div>
    </div>
  );
};

export default Stage1Daily;
