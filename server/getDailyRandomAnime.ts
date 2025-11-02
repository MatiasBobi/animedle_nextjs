import axios from "axios";
import { Anime } from "@/types/daily_types";
import { getRandomAnimes } from "@/lib/utils/getRandomAnimes";
export const getDailyRandomAnime = async () => {
    try {



        const AnimeRandom = getRandomAnimes();
        const nameAnime = AnimeRandom[0].name
        const animesRandoms = await axios.get<{data: Anime}>(`https://api.jikan.moe/v4/anime/${AnimeRandom[0].mal_id}/full`);
    

        return {
            anime: animesRandoms.data.data,
            nameAnime
        };

    } catch (error) {
        console.error("Error in getDailyRandomAnime:", error);
        throw error;
    }
}