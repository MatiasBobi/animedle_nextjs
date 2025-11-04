import { useState } from "react";
import { useDailyStore } from "@/store/daily-store";

const Stage1Daily = ({ images, title }: { images: string; title: string }) => {
  const { setGameNumber } = useDailyStore();
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [individualPiece, setIndividualPiece] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const totalPieces = 6;

  const handleIncorrectAttempt = () => {
    if (userGuess.toLowerCase().trim() === title.toLowerCase().trim()) {
      setIncorrectAttempts((prev) => prev + 1);
      setIndividualPiece([true, true, true, true, true, true]);
      setIsCorrect(true);
      return;
    }

    if (incorrectAttempts <= totalPieces - 1) {
      setIndividualPiece((prev) => {
        const newPieces = [...prev];
        newPieces[incorrectAttempts] = true;
        return newPieces;
      });
      setIncorrectAttempts((prev) => prev + 1);

      console.log(incorrectAttempts);
    }
  };

  const revealedPercentage = ((incorrectAttempts + 1) / totalPieces) * 100;

  return (
    <div className="flex justify-center items-center flex-col">
      <div className=" p-2">
        <div className="md:hidden relative w-80">
          <input
            placeholder="Adivina el anime..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="w-full h-16 bg-[#1E293B] rounded-2xl p-4 pr-28 text-white outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleIncorrectAttempt();
              }
            }}
          />
          <button
            onClick={handleIncorrectAttempt}
            className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Adivinar
          </button>
        </div>
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
        {isCorrect ? (
          <>
            <p className="text-green-500">¡Correcto!</p>
            <button
              onClick={() => setGameNumber(2)}
              className="p-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Continuar
            </button>
          </>
        ) : null}
        {incorrectAttempts === 6 && !isCorrect && (
          <>
            <p className="text-red-500">¡Incorrecto!</p>
            <button
              onClick={() => setGameNumber(2)}
              className="p-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Continuar
            </button>
          </>
        )}
      </div>
      <div className="hidden md:block relative w-80">
        <input
          placeholder="Adivina el anime..."
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="w-full h-16 bg-[#1E293B] rounded-2xl p-4 pr-28 text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleIncorrectAttempt();
            }
          }}
        />
        <button
          onClick={handleIncorrectAttempt}
          className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Adivinar
        </button>
      </div>
    </div>
  );
};

export default Stage1Daily;
