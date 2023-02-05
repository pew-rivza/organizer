import { convertUTCDate } from "utils/date";

import { ChangedMedication, Medication } from "MT_types/stores";

export const prepareMedicationForBackend = (
  medication: ChangedMedication,
): Medication => {
  const {
    id,
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
    id,
    name,
    count,
    countMeasureId,
    frequency,
    frequencyCount,
    frequencyMeasureId,
    timesOfDayId,
    mealTimeId,
    inBeforeCount,
    inBeforeMeasureId,
    comment,
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

  return preparedMedication;
};

export const prepareMedicationToFrontend = (
  medication: Medication,
): ChangedMedication => {
  const {
    id,
    name,
    count,
    countMeasureId,
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
    periodCount,
    periodMeasureId,
    periodDateStart,
    periodDateEnd,
    comment,
  } = medication;

  return {
    id,
    name,
    count,
    countMeasureId,
    routeOfAdministrationChecked: !!routeOfAdministrationId,
    routeOfAdministrationId: routeOfAdministrationId || null,
    inWhichId: inWhichId || null,
    inId: inId || null,
    frequency,
    frequencyCount,
    frequencyMeasureId,
    timesOfDayId: timesOfDayId || null,
    mealTimeId: mealTimeId || null,
    inBeforeCount: inBeforeCount || null,
    inBeforeMeasureId: inBeforeMeasureId || null,
    withinChecked: !!periodCount,
    periodCount: periodCount || null,
    periodMeasureId: periodMeasureId || null,
    periodDateStart: periodDateStart || null,
    periodDateEnd: periodDateEnd || null,
    comment: comment || "",
  };
};
