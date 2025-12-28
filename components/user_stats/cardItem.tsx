type CardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  highlight?: boolean;
};

const CardItem = ({
  title,
  value,
  icon,
  color,
  highlight = false,
}: CardProps) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        p-6 flex flex-col gap-4
        transition-transform duration-300 hover:scale-[1.03] justify-center items-center
        ${highlight ? "ring-2 ring-emerald-500/50" : ""}
      `}
    >
      <div className={`text-3xl ${color}`}>{icon}</div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-4xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default CardItem;
