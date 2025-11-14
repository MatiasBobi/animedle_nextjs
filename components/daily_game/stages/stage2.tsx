/* El stage 2 consiste en adivinar el anime por su descripcion */

import AnimeAllTitlesMenu from "@/components/animeAllTitlesMenu/animeAllTitlesMenu";
import { useDailyStore } from "@/store/daily-store";
import { useState, useEffect } from "react";
const Stage2Daily = ({
  description,
  title,
}: {
  description: string;
  title: string;
}) => {
  const { setGameNumber } = useDailyStore();

  const [descriptionAnime, setDescriptionAnime] = useState<string>(description);
  const [isCorrect, setIsCorrect] = useState<boolean | string>("no_respondido");
  const [answered, setAnswered] = useState<boolean>(false);

  const cleanAnimeTitle = (str: string) => {
    return str.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?¿¡]/g, "");
  };

  useEffect(() => {
    const isDescriptionHasTitle = description.includes(cleanAnimeTitle(title));

    if (isDescriptionHasTitle) {
      const shortDescriptionWithoutTitle = description.replace(
        cleanAnimeTitle(title),
        ""
      );
      setDescriptionAnime(shortDescriptionWithoutTitle);
    }
  }, [description, title]);

  const handleGuess = (userGuess: string) => {
    setAnswered(true);
    if (userGuess.toLowerCase() === title.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Adivina el anime por su sinopsis
      </h2>
      <div className="my-4 md:hidden block ">
        <AnimeAllTitlesMenu onUserGuess={handleGuess} isCorrect={isCorrect} />
      </div>
      <div className="flex flex-col gap-2 p-4  bg-[#1E293B] rounded-2xl h-108 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-2 ">
        {answered === false ? (
          <p className="transition-all duration-300 ease-in-out">
            {descriptionAnime}...
          </p>
        ) : (
          <div className="flex items-center h-full justify-center transition-all duration-500 ease-in-out opacity-90 animate-fadeIn ">
            {isCorrect !== "no_respondido" && (
              <div className="flex flex-col gap-2 p-4 rounded-2xl mt-4">
                <p className="text-green-500 font-bold text-center">
                  El anime es: {title}
                </p>
                <button
                  onClick={() => {
                    setGameNumber(3);
                  }}
                  className=" cursor-pointer h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="my-4">
        {answered === false ? (
          <p>Anime: {title?.[0]}</p>
        ) : (
          <p>Anime: {title}</p>
        )}
      </div>

      <div className="hidden md:block">
        <AnimeAllTitlesMenu onUserGuess={handleGuess} isCorrect={isCorrect} />
      </div>
    </section>
  );
};

export default Stage2Daily;
