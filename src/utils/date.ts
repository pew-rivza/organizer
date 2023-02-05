export const convertUTCDate = (date: Date | null): Date | null => {
  if (date === null) return date;

  const newDate = new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 3));
  newDate.setUTCHours(0);
  newDate.setUTCMinutes(0);
  newDate.setUTCSeconds(0);

  return newDate;
};
