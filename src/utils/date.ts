export const convertUTCDate = (date: Date | null): Date | null => {
  if (date === null) return date;

  return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 3));
};
