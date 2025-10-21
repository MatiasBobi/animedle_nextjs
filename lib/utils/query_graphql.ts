import { gql } from "@apollo/client";
import { getClient } from "../apollo/client";
import { getRandomAnimes } from "./getRandomAnimes";
import { animes } from "@/constants/animelist";

export const getRandomAnimesQuery = async () => {
  const client = getClient();
  const randomAnimes = getRandomAnimes(animes, 1);


  const queryAnime = gql`
    query ($search: String!) {
      Page {
        media(search: $search, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
        }
      }
    }
  `;



  try {
    const { data } = await client.query({
      query: queryAnime,
      variables: { search: randomAnimes[0] },
    });
    return data;
  } catch (error) {
    throw new Error(`Hubo un error al intentar consultar la query, error: ${error}`);
  }
};