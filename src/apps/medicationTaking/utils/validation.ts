import { ChangedCourse, ChangedMedication } from "MT_types/stores";

export const notNull = (...values: any[]): boolean => {
  return !values.some((value) => value === null);
};

export const isValidMedications = (
  medications: ChangedMedication[],
): boolean => {
  for (let medication of medications) {
    const {
      name,
      count,
      countMeasureId,
      routeOfAdministrationChecked,
      routeOfAdministrationId,
      inWhichId,
      inId,
      frequency,
      frequencyCount,
      frequencyMeasureId,
      withinChecked,
      periodCount,
      periodMeasureId,
      periodDateStart,
      periodDateEnd,
    } = medication;

    const isFilledRequiredFields = notNull(
      count,
      countMeasureId,
      frequency,
      frequencyCount,
      frequencyMeasureId,
    );

    if (
      !(
        name &&
        isFilledRequiredFields &&
        (routeOfAdministrationChecked
          ? notNull(routeOfAdministrationId)
          : notNull(inWhichId, inId)) &&
        (withinChecked
          ? notNull(periodCount, periodMeasureId)
          : notNull(periodDateStart, periodDateEnd))
      )
    ) {
      return false;
    }
  }

  return true;
};

export const isValidCourse = (changedCourse: ChangedCourse) => {
  const { start, doctor, diagnosis } = changedCourse;
  return start && doctor && diagnosis;
};
