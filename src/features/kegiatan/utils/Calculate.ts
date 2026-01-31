

export function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDayIndex = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  const days: {
    day: number;
    isCurrentMonth: boolean;
    dateObj: Date;
  }[] = [];

  let dayCounter = 1;
  let nextMonthDay = 1;

  for (let i = 0; i < 42; i++) {
    if (i < startDayIndex) {
      const day = prevLastDay - (startDayIndex - i - 1);
      days.push({
        day,
        isCurrentMonth: false,
        dateObj: new Date(year, month - 1, day),
      });
    } else if (dayCounter <= totalDays) {
      days.push({
        day: dayCounter,
        isCurrentMonth: true,
        dateObj: new Date(year, month, dayCounter),
      });
      dayCounter++;
    } else {
      days.push({
        day: nextMonthDay,
        isCurrentMonth: false,
        dateObj: new Date(year, month + 1, nextMonthDay),
      });
      nextMonthDay++;
    }
  }

  return days;
}



  




