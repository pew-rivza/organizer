import { DayDataKey } from "CR_types/other";
import { CalendarData } from "CR_types/stores";

export const removeCalendarField = (
  calendarData: CalendarData,
  field: DayDataKey,
) => {
  const newCalendarData = { ...calendarData };

  Object.keys(newCalendarData).forEach((year) => {
    Object.keys(newCalendarData[year]).forEach((month) => {
      Object.keys(newCalendarData[year][month]).forEach((day) => {
        delete newCalendarData[year][month][day][field];
      });
    });
  });

  return newCalendarData;
};

export function fillCalendarData<ValueType>(
  calendarData: CalendarData,
  date: Date,
  field: DayDataKey,
): CalendarData {
  const filledCalendarData: CalendarData = { ...calendarData };

  filledCalendarData[date.getFullYear()] =
    filledCalendarData[date.getFullYear()] || {};
  filledCalendarData[date.getFullYear()][date.getMonth()] =
    filledCalendarData[date.getFullYear()][date.getMonth()] || {};
  filledCalendarData[date.getFullYear()][date.getMonth()][date.getDate()] =
    filledCalendarData[date.getFullYear()][date.getMonth()][date.getDate()] ||
    {};

  (filledCalendarData[date.getFullYear()][date.getMonth()][date.getDate()][
    field
  ] as ValueType[]) = (filledCalendarData[date.getFullYear()][date.getMonth()][
    date.getDate()
  ][field] || []) as ValueType[];

  return filledCalendarData;
}
