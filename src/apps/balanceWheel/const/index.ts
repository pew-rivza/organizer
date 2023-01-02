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
export const FORMATTED_DEFAULT_DATE: string = `${(
  "0" +
  (DEFAULT_DATE.getMonth() + 1)
).slice(-2)}.${DEFAULT_DATE.getFullYear()}`;
export const DATE_REGEXP: RegExp = /^((0[1-9])|(1[1-2])).[1-9][0-9][0-9][0-9]$/;
export const ADD_TODO_MODE_ID: number = -50;
export const ESCAPE_CODE: string = "Escape";
export const ENTER_CODE: string = "Enter";
