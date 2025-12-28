import DailyCompletedSVG from "@/components/imagesSVG/daily_completed";
import React from "react";
import CountdownDaily from "./CountdownDaily";

const DailyCompleted = ({ dailyAnimeTime }: { dailyAnimeTime: number }) => {
  const timeNOW = Date.now();
  const nextReset =
    dailyAnimeTime > timeNOW
      ? dailyAnimeTime
      : dailyAnimeTime + 24 * 60 * 60 * 1000;
  const timeLeft = nextReset - timeNOW;
  return (
    <main className="flex flex-col gap-4 h-screen">
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <DailyCompletedSVG />
        <p className="text-2xl text-red-500">Ya jugaste el juego diario.</p>
        <p>
          <CountdownDaily miliseconds={timeLeft} />
        </p>
      </div>
    </main>
  );
};

export default DailyCompleted;
