import { NullableNumber } from "MT_types/other";

export type Option = {
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

type OptionGroup =
  | "dosageForm"
  | "routeOfAdministration"
  | "inWhich"
  | "in"
  | "times"
  | "frequency"
  | "timesOfDay"
  | "mealTime"
  | "inBefore"
  | "period";

export type GroupedOptions = Record<string | OptionGroup, Option[]>;

export interface ChangedMedication {
  id?: number;
  name: string;
  count: NullableNumber;
  countMeasureId: NullableNumber;
  routeOfAdministrationChecked: boolean;
  routeOfAdministrationId: NullableNumber;
  inWhichId: NullableNumber;
  inId: NullableNumber;
  frequency: NullableNumber;
  frequencyCount: NullableNumber;
  frequencyMeasureId: NullableNumber;
  timesOfDayId: NullableNumber;
  mealTimeId: NullableNumber;
  inBeforeCount: NullableNumber;
  inBeforeMeasureId: NullableNumber;
  withinChecked: boolean;
  periodCount: NullableNumber;
  periodMeasureId: NullableNumber;
  periodDateStart: Date | null;
  periodDateEnd: Date | null;
  comment: string;
  [key: string]: any;
}

export interface Medication {
  id?: number;
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

export interface Course {
  id?: number;
  start: Date | null;
  doctor: string;
  diagnosis: string;
}

export interface ChangedCourse extends Course {}

export type UpdateHandlerArgs = {
  field: string;
  value: any;
  index?: number;
};

export interface CourseFullInfo extends Course {
  medications: Medication[];
}
