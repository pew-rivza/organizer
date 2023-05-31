import { addToDate } from "utils/date";
import { findObject } from "utils/objects";

import {
  ALL_DAY,
  EMPTY_GROUPED_MEDICATIONS,
  TIMES_OF_DAY_COMPLIANCE,
  TIMES_OF_DAY_LIST,
} from "CR_const/common";
import { GroupedMedications, TimesOfDayNominative } from "CR_types/other";
import { CheckedMedications } from "CR_types/stores";

import { $courses } from "MT_models/course";
import { $options } from "MT_models/option";
import { MedicationInfo, Periods } from "MT_types/other";
import { Course, GroupedOptions, Medication, Option } from "MT_types/stores";
import { getMedicationInfo } from "MT_utils/getMedicationInfo";

export const getMedicationStart = (medication: Medication): Date | void => {
  const courseStart = findObject<number, Course>(
    $courses.getState(),
    "id",
    medication.MTCourseId,
  )?.start;

  return medication.periodDateStart
    ? medication.periodDateStart
    : courseStart === undefined
    ? courseStart
    : new Date(courseStart);
};

export const getMedicationEnd = (
  medication: Medication,
  start: Date | void,
): Date | void => {
  const measure: Periods = findObject<number, Option>(
    $options.getState().period,
    "id",
    medication.periodMeasureId || 0,
  )?.many as Periods;

  return (
    start &&
    (medication.periodDateEnd
      ? medication.periodDateEnd
      : addToDate(start, medication.periodCount || 0, measure))
  );
};

export const getTakingDates = (
  count: number,
  measure: Periods,
  start?: Date | void,
  end?: Date | void,
): Date[] => {
  let currentDate: Date | void = start;
  const takingDates: Date[] = [];

  if (!(currentDate && end)) {
    return takingDates;
  }

  while (currentDate?.getTime() <= end?.getTime()) {
    takingDates.push(currentDate);
    currentDate = addToDate(currentDate, count, measure, false);
  }

  return takingDates;
};

const pushMedicationInfo = (
  groupedMedications: GroupedMedications,
  medicationInfo: MedicationInfo,
  fields: TimesOfDayNominative[],
  checkedMedications: CheckedMedications[],
  currentDate: Date | null,
): GroupedMedications => {
  const newGroupedMedications: GroupedMedications = { ...groupedMedications };

  fields.forEach((field) => {
    const checked = checkedMedications.find((checkedMedication) => {
      return (
        checkedMedication.medicationId === medicationInfo.id &&
        checkedMedication.timesOfDay === field &&
        checkedMedication.date.getFullYear() === currentDate?.getFullYear() &&
        checkedMedication.date.getMonth() === currentDate?.getMonth() &&
        checkedMedication.date.getDate() === currentDate?.getDate()
      );
    });
    newGroupedMedications[field].push({
      ...medicationInfo,
      checked: !!checked,
      checkedId: checked?.id,
    });
  });
  return newGroupedMedications;
};

export const getGroupedMedications = (
  medications: Medication[],
  groupedOptions: GroupedOptions,
  checkedMedications: CheckedMedications[],
  currentDate: Date | null,
): GroupedMedications => {
  let groupedMedications: GroupedMedications = JSON.parse(
    JSON.stringify(EMPTY_GROUPED_MEDICATIONS),
  );

  medications.forEach((medication: Medication) => {
    const medicationInfo: MedicationInfo = getMedicationInfo(
      medication,
      groupedOptions,
    );
    const { timesOfDay } = medicationInfo;

    if (timesOfDay) {
      groupedMedications = pushMedicationInfo(
        groupedMedications,
        medicationInfo,
        [TIMES_OF_DAY_COMPLIANCE[timesOfDay]],
        checkedMedications,
        currentDate,
      );
    } else {
      switch (medication.frequency) {
        case 1:
        case 2:
        case 3:
        case 4: {
          groupedMedications = pushMedicationInfo(
            groupedMedications,
            medicationInfo,
            TIMES_OF_DAY_LIST.slice(0, medication.frequency),
            checkedMedications,
            currentDate,
          );
          break;
        }
        default: {
          groupedMedications = pushMedicationInfo(
            groupedMedications,
            medicationInfo,
            [ALL_DAY],
            checkedMedications,
            currentDate,
          );
          break;
        }
      }
    }
  });

  return groupedMedications;
};
