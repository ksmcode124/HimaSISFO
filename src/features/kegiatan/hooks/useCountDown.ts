"use client"
export function useGetCountdown(targetDate: Date): string {
  const now = new Date();

  const diffMs = targetDate.getTime() - now.getTime();
  if (diffMs <= 0) return "00 Hari 00:00:00";

  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(days)}:${pad(hours)}:${pad(minutes)}`;
}
