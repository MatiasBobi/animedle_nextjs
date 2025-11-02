"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDailyRandomAnime } from "@/server/getDailyRandomAnime";
import { AnimeDaily } from "@/types/daily_types";
import { AnimeThemesData } from "@/types/video_animetheme_types";

import { QUERY_VIDEO_ANIMETHEMES } from "@/graphql/query_daily_anilist_gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import Stage1Daily from "./stages/stage1";
import Stage2Daily from "./stages/stage2";
import Stage3Daily from "./stages/stage3";
import Stage4Daily from "./stages/stage4";
import Stage5Daily from "./stages/stage5";
import { useDailyStore } from "@/store/daily-store";

const DailyGame = ({ animes }: { animes: AnimeDaily[] }) => {
  const { GameNumber } = useDailyStore();

  //STAGE 1
  const stage1_img_url = animes[0].image_url;
  const stage1_title = animes[0].title;

  console.log(stage1_img_url);

  // STAGE 2
  const stage2_sypnosis = animes[1].synopsis;
  const stage2_title = animes[1].title;

  const renderStage = () => {
    switch (GameNumber) {
      case 1:
        return <Stage1Daily title={stage1_title} images={stage1_img_url} />;
      case 2:
        return (
          <Stage2Daily
            description={stage2_sypnosis || ""}
            title={stage2_title}
          />
        );
      case 3:
        return <Stage3Daily />;
      case 4:
        return <Stage4Daily />;
      case 5:
        return <Stage5Daily />;
      default:
        return null;
    }
  };
  return (
    <>
      <section className="flex gap-4 flex-wrap justify-center p-2">
        <div>
          <p className="bg-[#1E293B] p-4 md:px-12 rounded-bl-2xl rounded-tl-2xl ">
            Juego 1
          </p>
        </div>
        <div>
          <p className="bg-[#1E293B] p-4 md:px-12">Juego 2</p>
        </div>
        <div>
          <p className="bg-[#1E293B] p-4 md:px-12">Juego 3</p>
        </div>
        <div>
          <p className="bg-[#1E293B] p-4 md:px-12">Juego 4</p>
        </div>
        <div>
          <p className="bg-[#1E293B] p-4 md:px-12 rounded-br-2xl rounded-tr-2xl">
            Juego 5
          </p>
        </div>
      </section>

      {/* Seccion de los renders de los stages. */}
      <section className="flex justify-center items-center">
        <div className="w-72 h-64 md:w-180 md:h-96 ">{renderStage()}</div>
      </section>
    </>
  );
};

export default DailyGame;
