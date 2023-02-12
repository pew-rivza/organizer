import { Obj } from "types/other";

import { Medication } from "MT_types/stores";

export type DayData = { medications: Medication[] };
export type MedicationItem = {
  id: number;
  name: string;
  count: number;
  measure: string;
  frequency: number;
};
export type TimesOfDay = string &
  ("утро" | "день" | "вечер" | "ночь" | "перед сном" | "другое");

export type GroupedMedications = Obj & {
  [timesOfDay: string]: MedicationItem[];
};
