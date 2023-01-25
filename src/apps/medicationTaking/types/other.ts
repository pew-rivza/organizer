import { Obj } from "types/other";

export type DBOption = {
  key: string;
  id: number;
  value: string;
  one: string;
  few: string;
  many: string;
  feminine: string;
  masculine: string;
  neuter: string;
};

export type GroupedOptions = Record<string, DBOption[]>;

export type CastMode = "DECLINATION" | "GENDER" | "DEFAULT";

export type CastConfig = {
  count?: number;
  wordGendersConfig?: Obj & {
    feminine: string | void;
    masculine: string | void;
    neuter: string | void;
  };
};

export type WordForms = {
  one: string;
  few: string;
  many: string;
};

export type WordFormType = "one" | "few" | "many";
export type WordGenderType = "masculine" | "feminine" | "neuter";
export type NullableNumber = number | null;

export type InBeforeComplianceKey = "до" | "после";
export type InBeforeComplianceValue = "за" | "через";

export type InBeforeCompliance = Record<
  InBeforeComplianceKey,
  InBeforeComplianceValue
>;

export interface PreparedMedication {
  name: string;
  count: NullableNumber;
  countMeasureId: NullableNumber;
  routeOfAdministrationId?: NullableNumber;
  inWhichId?: NullableNumber;
  inId?: NullableNumber;
  frequency: NullableNumber;
  frequencyCount: NullableNumber;
  frequencyMeasureId: NullableNumber;
  timesOfDayId?: NullableNumber;
  mealTimeId?: NullableNumber;
  inBeforeCount?: NullableNumber;
  inBeforeMeasureId?: NullableNumber;
  periodCount?: NullableNumber;
  periodMeasureId?: NullableNumber;
  periodDateStart?: Date | null;
  periodDateEnd?: Date | null;
  comment?: string;
  [key: string]: any;
}

export type GroupedObjects<ObjType> = {
  [key: string]: (ObjType & Obj)[];
};
