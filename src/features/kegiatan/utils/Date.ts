export const stripTime = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const isSameDay = (a: Date, b: Date) =>
  stripTime(a).getTime() === stripTime(b).getTime();
