import { DATE_FUNCTIONS_COMPLIANCE } from "MT_const/common";
import { DateFunctions, Periods } from "MT_types/other";

export const convertUTCDate = (date: Date | null): Date | null => {
  if (date === null) return date;

  const newDate = new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 3));
  newDate.setUTCHours(0);
  newDate.setUTCMinutes(0);
  newDate.setUTCSeconds(0);

  return newDate;
};

export const addToDate = (
  date: Date,
  count: number,
  measure: Periods,
  withMinus: boolean = true,
): Date => {
  const computedDate: Date = new Date(date.getTime());
  const dateSetFunction: DateFunctions = `set${DATE_FUNCTIONS_COMPLIANCE[measure].function}`;
  const dateGetFunction: DateFunctions = `get${DATE_FUNCTIONS_COMPLIANCE[measure].function}`;

  computedDate[dateSetFunction](
    computedDate[dateGetFunction]() +
      count * DATE_FUNCTIONS_COMPLIANCE[measure].coefficient -
      ((withMinus && DATE_FUNCTIONS_COMPLIANCE[measure].minus) || 0),
  );

  return computedDate;
};
