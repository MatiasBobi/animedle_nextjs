
// Función para obtener N elementos random

import { animes } from "@/constants/animelist";
export function getRandomAnimes() {
    const shuffledAnimeList = [...animes].sort(() => 0.5 - Math.random()); 
    return shuffledAnimeList.slice(0, 1);
  }
  
  