import Link from "next/link";
import { IconType } from "react-icons";

const CardIndex = ({
  title,
  description,
  Icon,
  href,
}: {
  title: string;
  description: string;
  Icon: IconType;
  href: string;
}) => {
  return (
    <Link
      href={`./${href}`}
      className="w-80 h-100 md:w-128 md:h-80 bg-[#1E293B] flex justify-evenly flex-col items-center rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
    >
      <Icon className="text-6xl text-blue-400" />
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-center px-8 text-gray-300 leading-relaxed">
        {description}
      </p>
      <button className="px-8 py-4 bg-blue-400 text-white rounded-2xl font-semibold hover:bg-blue-500 transition-colors shadow-lg">
        Ir a jugar
      </button>
    </Link>
  );
};

export default CardIndex;
