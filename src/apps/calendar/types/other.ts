import { Obj } from "types/other";

import { MedicationInfo } from "MT_types/other";
import { Medication } from "MT_types/stores";

import { Look } from "VW_types/stores";

export type DayData = { medications: Medication[]; look: Look[] };
export type DayDataKey = "medications" | "look";

export type TimesOfDayNominative = string &
  ("утро" | "день" | "вечер" | "ночь" | "перед сном" | "в течение дня");
export type TimesOfDay = string &
  ("утром" | "днем" | "вечером" | "ночью" | "перед сном");

export type GroupedMedications = Obj & {
  [timesOfDay in TimesOfDayNominative]: MedicationInfo[];
};

export type DayParams = { timestamp: string };
