"use client";
import { useEffect, useState } from "react";

export function useGetCountdown(targetDate: Date) {
  const [countdown, setCountdown] = useState("00:00:00");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();

      if (diffMs <= 0) {
        setCountdown("00:00:00");
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      const pad = (n: number) => n.toString().padStart(2, "0");
      setCountdown(`${pad(days)}:${pad(hours)}:${pad(minutes)}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
