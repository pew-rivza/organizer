import { NullableNumber } from "MT_types/other";

export interface Medication {
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

export interface Course {
  id?: number;
  start: Date | null;
  doctor: string;
  diagnosis: string;
}

export type UpdateHandlerArgs = {
  field: string;
  value: any;
  index?: number;
};
