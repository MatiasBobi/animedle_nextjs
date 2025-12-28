import CardIndex from "@/components/cardIndex/cardIndex";
import { BsFillKeyboardFill, BsCardImage } from "react-icons/bs";
import { IoIosVideocam } from "react-icons/io";
import { FaGamepad } from "react-icons/fa6";

export default async function Home() {
  return (
    <main>
      <h1 className="h1_custom items-center justify-center text-center text-6xl py-8 text-stroke-animated">
        Anigame
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
          title="Openings"
          description="Adivina el anime por un opening."
          Icon={IoIosVideocam}
          href="openings"
        />
        <CardIndex
          title="Endings"
          description="Adivina el anime por un ending."
          Icon={IoIosVideocam}
          href="endings"
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
