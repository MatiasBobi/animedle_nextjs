"use client";
import { createClient } from "@/lib/supabase/server";
import { useDailyStore } from "@/store/daily-store";
import { useState } from "react";
const AnimeAllTitlesMenu = ({
  onUserGuess,
  isCorrect,
  isTitleAvailable = true,
}: {
  onUserGuess: (userGuess: string) => void;
  isCorrect: boolean | string;
  isTitleAvailable?: boolean;
}) => {
  const [userGuess, setUserGuess] = useState<string>("");
  const [isExpansible, setIsExpansible] = useState<boolean>(false);

  const { animeTitles } = useDailyStore();

  const handleGuess = () => {
    onUserGuess(userGuess);
    setUserGuess("");
  };

  const handleSelectAnime = (animeTitle: string) => {
    setUserGuess(animeTitle);
    setIsExpansible(false);
  };

  const filterAnimeTitlesByUserGuess = animeTitles?.filter((animeTitle) =>
    animeTitle?.toLowerCase().includes(userGuess?.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="relative w-[100%]">
        <input
          placeholder="Adivina el anime..."
          value={userGuess}
          disabled={isCorrect === "no_respondido" ? false : true}
          onChange={(e) => setUserGuess(e.target.value)}
          onFocus={() => setIsExpansible(true)}
          onBlur={() => setIsExpansible(false)}
          className="w-full h-16 bg-[#1E293B] rounded-2xl p-4 pr-28 text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGuess();
            }
          }}
        />
        <button
          disabled={isCorrect === "no_respondido" ? false : true}
          onClick={handleGuess}
          className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Adivinar
        </button>
        {isCorrect === "no_respondido" ? null : (
          <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 transp h-full w-full flex justify-center items-center bg-[#1E293B]/75">
            {isCorrect === true ? (
              <p className="text-2xl text-green-500 font-bold text-center">
                Correcto!
              </p>
            ) : (
              <p className="text-2xl text-red-500 font-bold text-center">
                Incorrecto!
              </p>
            )}
          </div>
        )}
      </div>

      {isExpansible && isTitleAvailable && (
        <div className="max-h-40 w-80 overflow-y-auto absolute bottom-0 translate-y-full md:-translate-y-1 md:bottom-full border-gray-600 rounded-lg shadow-lg z-50 transform [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          {filterAnimeTitlesByUserGuess.map((animeTitle, index) => (
            <div
              key={index}
              onClick={() => {
                handleSelectAnime(animeTitle);
              }}
              onMouseDown={(e) => e.preventDefault()}
              className="text-white py-4 px-2 bg-[#3d3e5c] cursor-pointer hover:bg-[#2a2b46]"
            >
              {animeTitle}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeAllTitlesMenu;
