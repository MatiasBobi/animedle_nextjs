import {
  FaPlay,
  FaMusic,
  FaImage,
  FaAlignLeft,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import { userStats } from "@/types/user_types";
import CardItem from "./cardItem";

type Props = {
  stats: userStats;
};

const StatsOverview = ({ stats }: Props) => {
  return (
    <section className="w-full max-w-6xl flex flex-col gap-8">
      <div className="flex items-center gap-4 text-white">
        <FaUser className="text-3xl text-blue-400" />
        <div>
          <h1 className="text-2xl font-bold">{stats.user_name}</h1>
          <p className="text-sm text-gray-400">Estadísticas generales</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardItem
          title="Openings acertados"
          value={stats.opening_ok}
          icon={<FaPlay />}
          color="text-green-400"
        />

        <CardItem
          title="Cuenta creada el:"
          value={
            stats.created_at
              ? new Date(stats.created_at).toLocaleDateString()
              : "N/A"
          }
          icon={<FaUser />}
          color="text-gray-400"
        />

        <CardItem
          title="Endings acertados"
          value={stats.ending_ok}
          icon={<FaMusic />}
          color="text-purple-400"
        />

        <CardItem
          title="Descripciones acertadas"
          value={stats.description_ok}
          icon={<FaAlignLeft />}
          color="text-yellow-400"
        />

        <CardItem
          title="Imágenes acertadas"
          value={stats.image_ok}
          icon={<FaImage />}
          color="text-blue-400"
        />

        <CardItem
          title="Ahorcados acertados"
          value={stats.animedle_ok}
          icon={<FaCheckCircle />}
          color="text-pink-400"
        />

        <CardItem
          title="Juegos diarios sin fallos"
          value={stats.all_ok}
          icon={<FaCheckCircle />}
          color="text-emerald-400"
          highlight
        />
      </div>
    </section>
  );
};

export default StatsOverview;
