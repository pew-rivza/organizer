import {
  GroupedMedications,
  TimesOfDay,
  TimesOfDayNominative,
} from "CR_types/other";

export const MORNING: TimesOfDayNominative = "утро";
export const AFTERNOON: TimesOfDayNominative = "день";
export const EVENING: TimesOfDayNominative = "вечер";
export const NIGHT: TimesOfDayNominative = "ночь";
export const BEFORE_BEDTIME: TimesOfDayNominative = "перед сном";
export const ALL_DAY: TimesOfDayNominative = "в течение дня";

export const MORNING_KEY: TimesOfDay = "утром";
export const AFTERNOON_KEY: TimesOfDay = "днем";
export const EVENING_KEY: TimesOfDay = "вечером";
export const NIGHT_KEY: TimesOfDay = "ночью";
export const BEFORE_BEDTIME_KEY: TimesOfDay = "перед сном";

export const TIMES_OF_DAY_COMPLIANCE: Record<TimesOfDay, TimesOfDayNominative> =
  {
    [MORNING_KEY]: MORNING,
    [AFTERNOON_KEY]: AFTERNOON,
    [EVENING_KEY]: EVENING,
    [NIGHT_KEY]: NIGHT,
    [BEFORE_BEDTIME_KEY]: BEFORE_BEDTIME,
  };

export const TIMES_OF_DAY_ICONS_COMPLIANCE: Record<
  TimesOfDayNominative,
  string
> = {
  [MORNING]: "carbon:sunrise",
  [AFTERNOON]: "fluent-mdl2:sunny",
  [EVENING]: "carbon:sunset",
  [NIGHT]: "material-symbols:nights-stay-outline",
  [BEFORE_BEDTIME]: "mdi:bed-outline",
  [ALL_DAY]: "ic:baseline-access-time",
};

export const EMPTY_GROUPED_MEDICATIONS: GroupedMedications = {
  [MORNING]: [],
  [AFTERNOON]: [],
  [EVENING]: [],
  [NIGHT]: [],
  [BEFORE_BEDTIME]: [],
  [ALL_DAY]: [],
};

export const TIMES_OF_DAY_LIST: TimesOfDayNominative[] = [
  MORNING,
  EVENING,
  AFTERNOON,
  NIGHT,
];
