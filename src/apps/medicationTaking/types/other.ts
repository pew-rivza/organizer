import { Obj } from "types/other";

import { Medication } from "MT_types/stores";

import { TimesOfDay } from "CR_types/other";

export type CastMode = "DECLINATION" | "GENDER" | "DEFAULT";

export type CastConfig = {
  count?: number;
  wordGendersConfig?: WordGenders;
};

export type WordForms = {
  one: string;
  few: string;
  many: string;
  nominativeOne: string;
};

export type WordGenders = Obj & {
  masculine: string | void;
  feminine: string | void;
  neuter: string | void;
};

export type WordFormType = "nominativeOne" | "one" | "few" | "many";
export type WordGenderType = "masculine" | "feminine" | "neuter";
export type NullableNumber = number | null;

export type InBeforeComplianceKey = "до" | "после";
export type InBeforeComplianceValue = "за" | "через";

export type InBeforeCompliance = Record<
  InBeforeComplianceKey,
  InBeforeComplianceValue
>;

export type GroupedObjects<ObjType> = {
  [key: string]: (ObjType & Obj)[];
};

export type VisibleChips = {
  timesOfDay: boolean;
  mealTime: boolean;
  comment: boolean;
};

export type CountWordFields = {
  [key: string]: {
    countField: string;
    optionGroup: string;
    measureField: string;
  };
};

export type WithoutPeriodKey = "WITHOUT_PERIOD_KEY";
export type WithPeriodKey = "WITH_PERIOD_KEY";
export type WithPeriodValue = {
  [key: string]: Medication[];
};
export type GroupedMedicationsByPeriod = {
  WITHOUT_PERIOD_KEY?: Medication[];
  WITH_PERIOD_KEY?: WithPeriodValue;
};

export type Periods = "дней" | "недель" | "месяцев" | "лет";
export type PeriodFunctions = "Date" | "Month" | "FullYear";
export type DateFunctionsCompliance = {
  [key in Periods]: {
    function: PeriodFunctions;
    coefficient: number;
    minus?: number;
  };
};
export type DateFunctions =
  | "setDate"
  | "setMonth"
  | "setFullYear"
  | "getDate"
  | "getMonth"
  | "getFullYear";

export type MedicationInfo = {
  id: number;
  name: string;
  count: string;
  countMeasure: string;
  nominativeCountMeasure: string;
  routeOfAdministration: string;
  frequency: string;
  times: string;
  frequencyCount: string;
  frequencyMeasure: string;
  timesOfDay: TimesOfDay;
  inBeforePreposition: string;
  inBefore: string;
  mealTime: string;
  period: string;
  comment: string;
  checked?: boolean;
  checkedId?: number;
};
