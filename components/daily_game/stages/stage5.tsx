/* El stage 5 consiste en adivinar el anime estilo ahorcadito */
"use client";
import { DailyProgressType, useDailyProgress } from "@/hooks/useDailyProgress";
import AnimeAllTitlesMenu from "@/components/animeAllTitlesMenu/animeAllTitlesMenu";
import { useState } from "react";
import { useDailyStore } from "@/store/daily-store";
const Stage5Daily = ({
  title,
  type_game,
  type_stat,
  fnChangeAnimeAnimeOnInfiniteMode,
  stepinfo,
}: {
  title: string;
  type_game: "daily" | "infinite";
  type_stat?: DailyProgressType;
  fnChangeAnimeAnimeOnInfiniteMode?: () => void;
  stepinfo?: number[];
}) => {
  // Funcion para actualizar la estadistica del usuario
  const { updateStat } = useDailyProgress();

  const { updateStepInfo } = useDailyStore();
  const [visibleLetter, setVisibleLetter] = useState<string[]>([
    "|",
    "?",
    "!",
    "#",
    "$",
    "%",
    "&",
    "/",
    "(",
    ")",
    "¡",
    "¿",
    "^",
    "~",
  ]);
  const [isCorrect, setIsCorrect] = useState<boolean | string>("no_respondido");
  const [finishGame, setFinishGame] = useState<boolean>(false);

  const [attempts, setAttempts] = useState<number>(0);

  const title_with_spaces = title.toUpperCase().split(" ");
  const titleLetters = title
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split(""); // Lo usamos para verificar si la letra esta en el titulo, sacamos los simbolos especiales.
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleUserGuess = (guess: string) => {
    setVisibleLetter(titleLetters);

    if (guess.toLowerCase() === title.toLowerCase()) {
      setIsCorrect(true);
      if (type_game === "daily") {
        updateStepInfo(4, 1);
        const stepinfoWithLastStep =
          stepinfo?.map((value, index) => (index === 4 ? 1 : value)) ?? [];
        if (type_stat) {
          updateStat(type_stat, true, 1, true, "game5_status");
        }
        if (
          stepinfoWithLastStep.length === 5 &&
          stepinfoWithLastStep.every((value) => value === 1)
        ) {
          updateStat("all_ok", true, 1, true, "game5_status");
        }
      }
    } else {
      setIsCorrect(false);
      if (type_game === "daily") {
        updateStepInfo(4, 0);
        if (type_stat) {
          updateStat(type_stat, false, 1, true, "game5_status");
        }
      }
    }
  };

  const handleLetterClick = (letter: string) => {
    if (!visibleLetter.includes(letter)) {
      if (attempts >= 10) {
        return;
      }
      const newAttempts = attempts + 1;
      setVisibleLetter((prev) => [...prev, letter]);
      setAttempts(newAttempts);
      if (newAttempts >= 10) {
      }
    }
  };

  const handleFinishOrContinue = () => {
    if (isCorrect === "no_respondido") return;
    if (type_game === "daily") {
      setFinishGame(true);
      return;
    }
    if (type_game === "infinite") {
      setAttempts(1);
      setIsCorrect("no_respondido");
      setVisibleLetter([
        "|",
        "?",
        "!",
        "#",
        "$",
        "%",
        "&",
        "/",
        "(",
        ")",
        "¡",
        "¿",
        "^",
        "~",
      ]);
      fnChangeAnimeAnimeOnInfiniteMode?.();
      return;
    }
  };
  if (finishGame) {
    return (
      <section className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          <p>Completaste el juego diario, volve pronto para volver a jugar.</p>
        </h2>
      </section>
    );
  }

  return (
    <section>
      <h2 className=" my-4 text-2xl font-bold text-white mb-4 text-center">
        Adivina el anime por las letras {"(Ahorcadito)"}
      </h2>
      <div className="flex flex-row justify-center items-center gap-4 bg-[#1E293B] h-48 flex-wrap">
        {title_with_spaces.map((word) => (
          <div key={word} className="flex flex-row items-center gap-1  mx-1">
            {word.split("").map((letter) => (
              <span key={letter} className="text-xl font-bold text-white">
                {visibleLetter.includes(letter) ? letter : "_"}
              </span>
            ))}
          </div>
        ))}
        {isCorrect !== "no_respondido" && type_game === "daily" && (
          <button
            onClick={() => handleFinishOrContinue()}
            className="bg-[#1c5cc4] cursor-pointer text-white font-bold px-4 py-2 rounded-md hover:bg-[#1e4583]"
          >
            Continuar
          </button>
        )}
      </div>
      {/** Menu para elegir la letra, tiene 5 intentos. Aca haremos un teclado virtual para que sea mas bonito. */}
      <div className="flex justify-center items-center gap-2 flex-wrap my-4">
        {allLetters.map((letter) => {
          const isUsed = visibleLetter.includes(letter);
          const isInTitle = titleLetters.includes(letter) && isUsed;
          const isDisabled =
            isUsed || attempts >= 10 || isCorrect !== "no_respondido";
          return (
            <button
              key={letter}
              className={`w-8 h-8 font-bold rounded-md cursor-pointer ${
                isInTitle
                  ? "bg-green-500 text-black hover:bg-green-600"
                  : visibleLetter.includes(letter)
                  ? "bg-[#ca1717] text-white hover:bg-[#374151]"
                  : "bg-[#ffffff] text-black hover:bg-[#374151]"
              }`}
              disabled={isDisabled}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          );
        })}
      </div>
      {type_game === "infinite" && isCorrect !== "no_respondido" && (
        <button
          onClick={() => handleFinishOrContinue()}
          className="bg-[#1c5cc4] cursor-pointer text-white font-bold px-4 py-2 rounded-md hover:bg-[#1e4583]"
        >
          Continuar
        </button>
      )}

      <div className="text-white font-bold text-xl text-center">
        <span>
          Intentos: <span className="text-green-500">{attempts} / 10</span>
        </span>
      </div>
      {/* Adivinar el anime */}
      <AnimeAllTitlesMenu
        isTitleAvailable={true}
        onUserGuess={handleUserGuess}
        isCorrect={isCorrect}
      />
    </section>
  );
};

export default Stage5Daily;
