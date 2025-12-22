"use client";

import { AnimeDaily } from "@/types/daily_types";
import Stage1Daily from "./stages/stage1";
import Stage2Daily from "./stages/stage2";
import Stage3Daily from "./stages/stage3_4";

import Stage5Daily from "./stages/stage5";
import { useDailyStore } from "@/store/daily-store";
import { useAnimeTitles } from "@/hooks/useAnimeTitles";
import { useEffect } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import Stage3_4Daily from "./stages/stage3_4";
import DailyCompleted from "./next_day/dailyCompleted";

const DailyGame = ({
  animes,
  current_stage,
  stepsInfo,
}: {
  animes: AnimeDaily[];
  current_stage: number;
  stepsInfo: number[];
}) => {
  const {
    GameNumber,
    setGameNumber,
    setStepsInfo,
    stepsInfo: storeStepsInfo,
  } = useDailyStore();

  useAnimeTitles();

  useEffect(() => {
    setGameNumber(current_stage);
    setStepsInfo(stepsInfo);
  }, [current_stage, setGameNumber, setStepsInfo, stepsInfo]);

  //STAGE 1
  const stage1_img_url = animes[0].image_url;
  const stage1_title = animes[0].title;

  // STAGE 2
  const stage2_sypnosis = animes[1].synopsis;
  const stage2_title = animes[1].title;

  // STAGE 3

  const opening_url = animes[2].openings?.split("|")?.[0];
  const stage3_title = animes[2].title;

  // STAGE 4

  const ending_url = animes[3].endings?.split("|")?.[0];
  const stage4_title = animes[3].title;

  // STAGE 5
  const stage5_title = animes[4].title;

  const stepsToDisplay = storeStepsInfo.length > 0 ? storeStepsInfo : stepsInfo;

  const renderStage = () => {
    switch (GameNumber) {
      case 1:
        return (
          <Stage1Daily
            title={stage1_title}
            images={stage1_img_url}
            type_stat="image_ok"
            type_game="daily"
            game_status="game1_status"
          />
        );
      case 2:
        return (
          <Stage2Daily
            description={stage2_sypnosis || ""}
            title={stage2_title}
            type_stat="description_ok"
            gameCurrentStage_name={"game2_status"}
          />
        );
      case 3:
        return (
          <Stage3_4Daily
            title={stage3_title}
            type_stat={"opening_ok"}
            url_video={opening_url || ""}
            next_stage={4}
            game_status="game3_status"
            type_game="daily"
          />
        );
      case 4:
        return (
          <Stage3_4Daily
            title={stage4_title}
            type_stat={"ending_ok"}
            url_video={ending_url || ""}
            next_stage={5}
            game_status="game4_status"
            type_game="daily"
          />
        );
      case 5:
        return <Stage5Daily title={stage5_title} type_stat={"animedle_ok"} />;
      default:
        return null;
    }
  };
  return (
    <>
      <section className="flex flex-wrap justify-center p-2">
        <div>
          <p
            className={`p-4 md:px-12 ${
              stepsToDisplay[0] === 2
                ? " bg-[#1E293B]"
                : stepsToDisplay[0] === 1
                ? "bg-[#0e922f]"
                : "bg-[#ca1717]"
            }`}
          >
            Juego 1
          </p>
        </div>
        <div>
          <p
            className={`p-4 md:px-12 ${
              stepsToDisplay[1] === 2
                ? " bg-[#1E293B]"
                : stepsToDisplay[1] === 1
                ? "bg-[#0e922f]"
                : "bg-[#ca1717]"
            }`}
          >
            Juego 2
          </p>
        </div>
        <div>
          <p
            className={`p-4 md:px-12 ${
              stepsToDisplay[2] === 2
                ? " bg-[#1E293B]"
                : stepsToDisplay[2] === 1
                ? "bg-[#0e922f]"
                : "bg-[#ca1717]"
            }`}
          >
            Juego 3
          </p>
        </div>
        <div>
          <p
            className={`p-4 md:px-12 ${
              stepsToDisplay[3] === 2
                ? " bg-[#1E293B]"
                : stepsToDisplay[3] === 1
                ? "bg-[#0e922f]"
                : "bg-[#ca1717]"
            }`}
          >
            Juego 4
          </p>
        </div>
        <div>
          <p
            className={`p-4 md:px-12 ${
              stepsToDisplay[4] === 2
                ? " bg-[#1E293B]"
                : stepsToDisplay[4] === 1
                ? "bg-[#0e922f]"
                : "bg-[#ca1717]"
            } rounded-br-2xl rounded-tr-2xl`}
          >
            Juego 5
          </p>
        </div>
      </section>

      {/* Seccion de los renders de los stages. */}
      <section className="flex justify-center items-center">
        <div className="w-90 h-64 md:w-180 md:h-96 ">{renderStage()}</div>
      </section>
    </>
  );
};

export default DailyGame;
