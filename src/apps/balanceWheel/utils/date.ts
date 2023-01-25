export const getDateFromString = (dateString: string): Date => {
  const [selectedMonth, selectedYear] = dateString.split(".");
  return new Date(+selectedYear, +selectedMonth - 1, 1);
};

export const getStringFromDate = (date: Date): string => {
  return `${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`;
};
