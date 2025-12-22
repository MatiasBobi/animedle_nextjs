import AuthButtonServer from "@/components/auth/auth-button-server";
import CardIndex from "@/components/cardIndex/cardIndex";
import NavBar from "@/components/navbar/navbar";
import { createClient } from "@/lib/supabase/server";
import { useDailyStore } from "@/store/daily-store";
import {
  BsFillKeyboardFill,
  BsInfinity,
  BsCardImage,
  BsCameraVideo,
} from "react-icons/bs";
import { FaGamepad } from "react-icons/fa6";

export default async function Home() {
  return (
    <main>
      <h1 className="h1_custom items-center justify-center text-center text-6xl py-8 text-stroke-animated">
        Animedle
      </h1>

      <section className="flex gap-8 flex-wrap justify-center py-8">
        <CardIndex
          title="Juego diario"
          description="Juego diario, todos los juegos disponibles del sitio en un solo lugar, aca cuentan las estadisticas de cada juego."
          Icon={FaGamepad}
          href="daily"
        />
        <CardIndex
          title="Images"
          description="Adivina el anime por una imagen."
          Icon={BsCardImage}
          href="animeimages"
        />

        <CardIndex
          title="Ahorcado"
          description="Juego donde adivinar el anime según las letras que vayas adivinando."
          Icon={BsFillKeyboardFill}
          href="ahorcado"
        />
      </section>
    </main>
  );
}
