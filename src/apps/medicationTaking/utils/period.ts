import { addToDate } from "utils/date";
import { findObject, getValuesByField } from "utils/objects";

import { Periods } from "MT_types/other";
import { Medication, Option } from "MT_types/stores";

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
