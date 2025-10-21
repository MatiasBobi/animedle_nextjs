
// Función para obtener N elementos random
export function getRandomAnimes(animelist : string[], count: number) {
    const shuffledAnimeList = [...animelist].sort(() => 0.5 - Math.random()); 
    console.log(shuffledAnimeList.slice(0, count))
    return shuffledAnimeList.slice(0, count);
  }
  
  