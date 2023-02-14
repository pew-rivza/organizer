import { addToDate } from "utils/date";
import { findObject } from "utils/objects";

import { $courses } from "MT_models/course";
import { $options } from "MT_models/option";
import { MedicationInfo, Periods } from "MT_types/other";
import { Course, GroupedOptions, Medication, Option } from "MT_types/stores";
import { getMedicationInfo } from "MT_utils/getMedicationInfo";

import {
  AFTERNOON,
  ALL_DAY,
  BEFORE_BEDTIME,
  EVENING,
  MORNING,
  NIGHT,
  TIMES_OF_DAY_COMPLIANCE,
} from "CR_const/common";
import {
  DayDataKey,
  GroupedMedications,
  TimesOfDayNominative,
} from "CR_types/other";
import { CalendarData } from "CR_types/stores";

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
) => {
  const newGroupedMedications = { ...groupedMedications };

  fields.forEach((field) => {
    newGroupedMedications[field].push(medicationInfo);
  });

  return newGroupedMedications;
};

export const getGroupedMedications = (
  medications: Medication[],
  groupedOptions: GroupedOptions,
): GroupedMedications => {
  let groupedMedications: GroupedMedications = {
    [MORNING]: [],
    [AFTERNOON]: [],
    [EVENING]: [],
    [NIGHT]: [],
    [BEFORE_BEDTIME]: [],
    [ALL_DAY]: [],
  } as GroupedMedications;

  const timesOfDayList: TimesOfDayNominative[] = [
    MORNING,
    EVENING,
    AFTERNOON,
    NIGHT,
  ];

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
        case 1:
        case 2:
        case 3:
        case 4: {
          groupedMedications = pushMedicationInfo(
            groupedMedications,
            medicationInfo,
            timesOfDayList.slice(0, medication.frequency),
          );
          break;
        }
        default: {
          groupedMedications[ALL_DAY].push(medicationInfo);
          break;
        }
      }
    }
  });

  return groupedMedications;
};

export const fillCalendarData = (
  calendarData: CalendarData,
  takingDates: Date[],
  date: Date,
  field: DayDataKey,
): CalendarData => {
  const filledCalendarData = { ...calendarData };

  filledCalendarData[date.getFullYear()] =
    filledCalendarData[date.getFullYear()] || {};
  filledCalendarData[date.getFullYear()][date.getMonth()] =
    filledCalendarData[date.getFullYear()][date.getMonth()] || {};
  filledCalendarData[date.getFullYear()][date.getMonth()][date.getDate()] =
    filledCalendarData[date.getFullYear()][date.getMonth()][date.getDate()] ||
    {};
  filledCalendarData[date.getFullYear()][date.getMonth()][date.getDate()][
    field
  ] =
    filledCalendarData[date.getFullYear()][date.getMonth()][date.getDate()][
      field
    ] || [];

  return filledCalendarData;
};
