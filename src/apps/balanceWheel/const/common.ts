import { getStringFromDate } from "BW_utils/date";

export const AREA_COUNT: number = 12;
export const DEFAULT_AREAS: string[] = [
  "Самооценка",
  "Финансы",
  "Образование",
  "Семья",
  "Хобби",
  "Здоровье",
  "Отношения",
  "Секс",
  "Альтруизм",
  "Работа",
  "Дружба",
  "Уединение",
];
const DEFAULT_DATE: Date = new Date(Date.now());
export const FORMATTED_DEFAULT_DATE: string = getStringFromDate(DEFAULT_DATE);
export const DATE_REGEXP: RegExp = /^((0[1-9])|(1[1-2])).[1-9][0-9][0-9][0-9]$/;
