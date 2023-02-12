import { TimesOfDay } from "CR_types/other";

export const MORNING: TimesOfDay = "утро";
export const AFTERNOON: TimesOfDay = "день";
export const EVENING: TimesOfDay = "вечер";
export const NIGHT: TimesOfDay = "ночь";
export const BEFORE_BEDTIME: TimesOfDay = "перед сном";
export const OTHER: TimesOfDay = "другое";

export const MORNING_KEY: string = "утром";
export const AFTERNOON_KEY: string = "днем";
export const EVENING_KEY: string = "вечером";
export const NIGHT_KEY: string = "ночью";
export const BEFORE_BEDTIME_KEY: string = "перед сном";

export const TIMES_OF_DAY_COMPLIANCE = {
  [MORNING_KEY]: MORNING,
  [AFTERNOON_KEY]: AFTERNOON_KEY,
  [EVENING_KEY]: EVENING,
  [NIGHT_KEY]: NIGHT,
  [BEFORE_BEDTIME_KEY]: BEFORE_BEDTIME,
};
