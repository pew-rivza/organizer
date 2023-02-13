import { addToDate } from "utils/date";
import { findObject } from "utils/objects";

import { $courses } from "MT_models/course";
import { $options } from "MT_models/option";
import { MedicationInfo, Periods } from "MT_types/other";
import { Course, GroupedOptions, Medication, Option } from "MT_types/stores";
import { getMedicationInfo } from "MT_utils/getMedicationInfo";

import {
  AFTERNOON,
  BEFORE_BEDTIME,
  EVENING,
  MORNING,
  NIGHT,
  OTHER,
  TIMES_OF_DAY_COMPLIANCE,
} from "CR_const/common";
import { GroupedMedications } from "CR_types/other";

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
  return (
    start &&
    (medication.periodDateEnd
      ? medication.periodDateEnd
      : addToDate(
          start,
          medication.periodCount || 0,
          findObject<number, Option>(
            $options.getState().period,
            "id",
            medication.periodMeasureId || 0,
          )?.many as Periods,
        ))
  );
};

export const getTakingDates = (
  count: number,
  measure: Periods,
  start: Date,
  end: Date,
): Date[] => {
  let currentDate = start;
  const takingDates = [start];

  while (currentDate.getTime() <= end.getTime()) {
    const newDate = addToDate(currentDate, count, measure, false);
    if (newDate.getTime() <= end.getTime()) {
      takingDates.push(newDate);
    }
    currentDate = newDate;
  }

  return takingDates;
};

export const getGroupedMedications = (
  medications: Medication[],
  groupedOptions: GroupedOptions,
): GroupedMedications => {
  const groupedMedications: GroupedMedications = {
    [MORNING]: [],
    [AFTERNOON]: [],
    [EVENING]: [],
    [NIGHT]: [],
    [BEFORE_BEDTIME]: [],
    [OTHER]: [],
  };

  medications.forEach((medication: Medication) => {
    const medicationInfo: MedicationInfo = getMedicationInfo(
      medication,
      groupedOptions,
    );
    const { timesOfDay } = medicationInfo;

    if (timesOfDay) {
      groupedMedications[TIMES_OF_DAY_COMPLIANCE[timesOfDay]].push(
        medicationInfo,
      );
    } else {
      switch (medication.frequency) {
        case 1: {
          groupedMedications[MORNING].push(medicationInfo);
          break;
        }
        case 2: {
          groupedMedications[MORNING].push(medicationInfo);
          groupedMedications[EVENING].push(medicationInfo);
          break;
        }
        case 3: {
          groupedMedications[MORNING].push(medicationInfo);
          groupedMedications[AFTERNOON].push(medicationInfo);
          groupedMedications[EVENING].push(medicationInfo);
          break;
        }
        case 4: {
          groupedMedications[MORNING].push(medicationInfo);
          groupedMedications[AFTERNOON].push(medicationInfo);
          groupedMedications[EVENING].push(medicationInfo);
          groupedMedications[NIGHT].push(medicationInfo);
          break;
        }
        default: {
          groupedMedications[OTHER].push(medicationInfo);
          break;
        }
      }
    }
  });

  return groupedMedications;
};
