import { createClient } from "@/lib/supabase/server";
import AuthButtonServer from "@/components/auth/auth-button-server";
import { getRandomAnimesQuery } from "@/lib/utils/query_graphql";
import { useSuspenseQuery } from "@apollo/client/react/index.js";
import CardIndex from "@/components/cardIndex/cardIndex";
import {
  BsFillKeyboardFill,
  BsInfinity,
  BsCardImage,
  BsCameraVideo,
} from "react-icons/bs";
import { FaGamepad } from "react-icons/fa6";

export default async function Home() {
  //const supabase = await createClient();

  //const { data: posts, error } = await supabase.from("post").select("*");

  return (
    <div className="">
      <AuthButtonServer></AuthButtonServer>
      <main>
        <h1 className="items-center justify-center text-center text-6xl py-8 text-stroke-animated">
          Animedle
        </h1>

        <section className="flex gap-8 flex-wrap justify-center py-8">
          <CardIndex
            title="Juego diario"
            description="Juego diario, todos los juegos disponibles del sitio en un solo lugar, dentro de esta categoria hay un unico juego que no se puede jugar fuera del juego diario."
            Icon={FaGamepad}
            href="daily"
          />
          <CardIndex
            title="All In One Infinito"
            description="Es como el juego diario sin el juego especial que hay dentro de el, rondas infinitas."
            Icon={BsInfinity}
            href="allinone"
          />

          <CardIndex
            title="Images"
            description="Adivina el anime por una imagen."
            Icon={BsCardImage}
            href="animeimages"
          />
          <CardIndex
            title="Videos"
            description="Adivina el anime por un video."
            Icon={BsCameraVideo}
            href="animevideos"
          />
          <CardIndex
            title="Animedle"
            description="Wordle estilo anime, juego donde adivinar el anime según las letras que vayas adivinando."
            Icon={BsFillKeyboardFill}
            href="animedle"
          />
        </section>
      </main>
    </div>
  );
}
