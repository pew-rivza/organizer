import { convertUTCDate } from "utils/date";

import { ChangedMedication, Medication } from "MT_types/stores";

const notNull = (...values: any[]): boolean => {
  return !values.some((value) => value === null);
};

export const prepareMedication = (
  medication: ChangedMedication,
): Medication => {
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
    timesOfDayId,
    mealTimeId,
    inBeforeCount,
    inBeforeMeasureId,
    withinChecked,
    periodCount,
    periodMeasureId,
    periodDateStart,
    periodDateEnd,
    comment,
  } = medication;

  const preparedMedication: Medication = {
    name,
    count,
    countMeasureId,
    frequency,
    frequencyCount,
    frequencyMeasureId,
  };

  if (routeOfAdministrationChecked) {
    preparedMedication.routeOfAdministrationId = routeOfAdministrationId;
  } else {
    preparedMedication.inWhichId = inWhichId;
    preparedMedication.inId = inId;
  }

  if (withinChecked) {
    preparedMedication.periodCount = periodCount;
    preparedMedication.periodMeasureId = periodMeasureId;
  } else {
    preparedMedication.periodDateStart = convertUTCDate(periodDateStart);
    preparedMedication.periodDateEnd = convertUTCDate(periodDateEnd);
  }

  if (timesOfDayId) preparedMedication.timesOfDayId = timesOfDayId;

  if (notNull(mealTimeId, inBeforeCount, inBeforeMeasureId)) {
    preparedMedication.mealTimeId = mealTimeId;
    preparedMedication.inBeforeCount = inBeforeCount;
    preparedMedication.inBeforeMeasureId = inBeforeMeasureId;
  }

  if (comment) {
    preparedMedication.comment = comment;
  }

  return preparedMedication;
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
