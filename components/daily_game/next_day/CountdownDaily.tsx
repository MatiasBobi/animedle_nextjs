"use client";

import { useEffect, useState } from "react";

const CountdownDaily = ({ miliseconds }: { miliseconds: number }) => {
  const [timeleft, setTimeLeft] = useState<number>(miliseconds);

  useEffect(() => {
    if (timeleft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeleft]);

  const formatDateWithHours = (miliseconds: number) => {
    if (miliseconds < 0) {
      return "0 horas";
    }

    const hours = Math.floor(miliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    return `${hours} horas, ${minutes} minutos y ${seconds} segundos`;
  };
  return (
    <section>
      <p>Podes volver a jugar en {formatDateWithHours(timeleft)}</p>
    </section>
  );
};

export default CountdownDaily;
