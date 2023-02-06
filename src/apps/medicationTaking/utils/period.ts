import { Obj } from "types/other";
import { findObject } from "utils/objects";

import { DATE_FUNCTIONS_COMPLIANCE } from "MT_const/common";
import { DateFunctions, Periods } from "MT_types/other";
import { Medication, Option } from "MT_types/stores";

export function getValuesByField<ObjType, ValueType>(
  objectsArray: (Obj & ObjType)[],
  field: string,
): ValueType[] {
  return objectsArray.map((obj) => obj[field]).filter(Boolean);
}

export const addToDate = (
  date: Date,
  count: number,
  measure: Periods,
): Date => {
  const computedDate: Date = new Date(date.getTime());
  const dateSetFunction: DateFunctions = `set${DATE_FUNCTIONS_COMPLIANCE[measure].function}`;
  const dateGetFunction: DateFunctions = `get${DATE_FUNCTIONS_COMPLIANCE[measure].function}`;

  computedDate[dateSetFunction](
    computedDate[dateGetFunction]() +
      count * DATE_FUNCTIONS_COMPLIANCE[measure].coefficient -
      (DATE_FUNCTIONS_COMPLIANCE[measure].minus || 0),
  );

  return computedDate;
};

export const getCourseEndsWithoutPeriod = (
  courseStart: Date,
  medications: Medication[],
  periodOptions: Option[],
): Date[] => {
  const counts = getValuesByField<Medication, number>(
    medications,
    "periodCount",
  );
  return getValuesByField<Medication, number>(medications, "periodMeasureId")
    .map(
      (measureId) =>
        findObject<number, Option>(periodOptions, "id", measureId)
          ?.many as Periods,
    )
    .map((measure, index) => addToDate(courseStart, counts[index], measure));
};
