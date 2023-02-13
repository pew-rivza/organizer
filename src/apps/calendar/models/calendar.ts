import { createStore } from "effector";

import { findObject } from "utils/objects";

import { $medications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { Periods } from "MT_types/other";

import { CalendarData } from "CR_types/stores";
import {
  getMedicationEnd,
  getMedicationStart,
  getTakingDates,
} from "CR_utils/medication";

export const $calendarData = createStore<CalendarData>({}).on(
  $medications,
  (_, medications) => {
    const newState: CalendarData = {};

    medications.forEach((medication) => {
      const start: Date | void = getMedicationStart(medication);
      const end: Date | void = getMedicationEnd(medication, start);
      const count: number | null = medication.frequencyCount;
      const measure = findObject(
        $options.getState().frequency,
        "id",
        medication.frequencyMeasureId,
      )?.many as Periods;

      const takingDates =
        (!!start &&
          !!end &&
          !!count &&
          getTakingDates(count, measure, start, end)) ||
        [];

      takingDates.forEach((date) => {
        // TODO: вынести в отдельную функцию
        newState[date.getFullYear()] = newState[date.getFullYear()] || {};
        newState[date.getFullYear()][date.getMonth()] =
          newState[date.getFullYear()][date.getMonth()] || {};
        newState[date.getFullYear()][date.getMonth()][date.getDate()] =
          newState[date.getFullYear()][date.getMonth()][date.getDate()] || {};
        newState[date.getFullYear()][date.getMonth()][
          date.getDate()
        ].medications =
          newState[date.getFullYear()][date.getMonth()][date.getDate()]
            .medications || [];

        newState[date.getFullYear()][date.getMonth()][
          date.getDate()
        ].medications.push(medication);
      });
    });
    return newState;
  },
);
