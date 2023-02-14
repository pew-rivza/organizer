import { createStore } from "effector";

import { findObject, mergeDeep } from "utils/objects";

import { $medications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { Periods } from "MT_types/other";
import { Option } from "MT_types/stores";

import { CalendarData } from "CR_types/stores";
import {
  fillCalendarData,
  getMedicationEnd,
  getMedicationStart,
  getTakingDates,
} from "CR_utils/medication";

export const $calendarData = createStore<CalendarData>({}).on(
  $medications,
  (prevState, medications) => {
    let newState: CalendarData = {};

    medications.forEach((medication) => {
      const start: Date | void = getMedicationStart(medication);
      const end: Date | void = getMedicationEnd(medication, start);
      const count: number | null = medication.frequencyCount;
      const measure = findObject<number, Option>(
        $options.getState().frequency,
        "id",
        medication.frequencyMeasureId || 0,
      )?.many as Periods;

      const takingDates: Date[] = getTakingDates(
        count || 0,
        measure,
        start,
        end,
      );

      takingDates.forEach((date) => {
        newState = fillCalendarData(newState, takingDates, date, "medications");
        newState[date.getFullYear()][date.getMonth()][
          date.getDate()
        ].medications.push(medication);
      });
    });

    return { ...mergeDeep(prevState, newState) };
  },
);
