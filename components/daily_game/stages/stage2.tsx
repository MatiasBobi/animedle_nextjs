/* El stage 2 consiste en adivinar el anime por su descripcion */

import { useState } from "react";
const Stage2Daily = ({
  description,
  title,
}: {
  description: string;
  title: string;
}) => {
  const [descriptionAnime, setDescriptionAnime] = useState<string>(description);
  const [userGuess, setUserGuess] = useState<string>("");
  const [showHint, setShowHint] = useState("");

  const cleanAnimeTitle = (str: string) => {
    return str.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?¿¡]/g, "");
  };
  const isDescriptionHasTitle = description.includes(cleanAnimeTitle(title));

  if (isDescriptionHasTitle) {
    const shortDescriptionWithoutTitle = description.replace(
      cleanAnimeTitle(title),
      ""
    );
    setDescriptionAnime(shortDescriptionWithoutTitle);
  }
  const getRandomHint = () => {
    const randomIndex = Math.floor(Math.random() * title.length);
    return title[randomIndex];
  };

  const handleShowHint = () => {
    setShowHint(`${title[0]}`);
    
  };
  return (
    <>
      <div className="flex flex-col gap-2 p-4 bg-[#1E293B] rounded-2xl h-108 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-2">
        <p>{descriptionAnime}...</p>

      </div>
      <p className="mt-4">Anime: {showHint} _</p>
      <div className="mt-4 relative w-80">
        <input
          placeholder="Adivina el anime..."
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="w-full h-16 bg-[#1E293B] rounded-2xl p-4 pr-28 text-white outline-none"
        />
        <button className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Adivinar
        </button>
      </div>
    </>
  );
};

export default Stage2Daily;
