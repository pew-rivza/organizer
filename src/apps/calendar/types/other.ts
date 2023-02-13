import { Obj } from "types/other";

import { MedicationInfo } from "MT_types/other";
import { Medication } from "MT_types/stores";

export type DayData = { medications: Medication[] };
export type TimesOfDay = string &
  ("утро" | "день" | "вечер" | "ночь" | "перед сном" | "за весь день");

export type GroupedMedications = Obj & {
  [timesOfDay: string]: MedicationInfo[];
};
