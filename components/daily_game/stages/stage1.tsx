import { useState } from "react";
import { useDailyStore } from "@/store/daily-store";
import AnimeAllTitlesMenu from "@/components/animeAllTitlesMenu/animeAllTitlesMenu";

const Stage1Daily = ({ images, title }: { images: string; title: string }) => {
  const { setGameNumber } = useDailyStore();
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
  const totalPieces = 6;

  const handleUserGuess = (userGuess: string) => {
    if (isCorrect === true || incorrectAttempts >= 6) return;

    // Aca chequeamos si es correcto lo que el usuario ingresa
    if (userGuess.toLowerCase().trim() === title.toLowerCase().trim()) {
      setIndividualPiece([true, true, true, true, true, true]);
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
        setIsCorrect(false);
      }
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
              onClick={() => setGameNumber(2)}
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
