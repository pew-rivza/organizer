import { createEvent, createStore } from "effector";

import { findObject, mergeDeep } from "utils/objects";

import { $medications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { Periods } from "MT_types/other";
import { Medication, Option } from "MT_types/stores";

import { $looks } from "VW_models/look";
import { Look } from "VW_types/stores";

import { $calendarLooks } from "CR_models/look";
import { CalendarData } from "CR_types/stores";
import {
  fillCalendarData,
  getMedicationEnd,
  getMedicationStart,
  getTakingDates,
} from "CR_utils/medication";

// Events
export const updateCurrentDate = createEvent<Date | null>();

// Stores
export const $currentDate = createStore<Date | null>(null).on(
  updateCurrentDate,
  (_, currentDate) => currentDate,
);

export const $calendarData = createStore<CalendarData>({})
  .on($medications, (prevState, medications) => {
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
        newState = fillCalendarData<Medication>(newState, date, "medications");
        newState[date.getFullYear()][date.getMonth()][
          date.getDate()
        ].medications.push(medication);
      });
    });

    return { ...mergeDeep(prevState, newState) };
  })
  .on($calendarLooks, (prevState, looks) => {
    let newState: CalendarData = {};
    looks.forEach((look) => {
      const { date, VWLookId } = look;
      const lookInfo: Look = findObject<number, Look>(
        $looks.getState(),
        "id",
        VWLookId,
      ) as Look;

      newState = fillCalendarData<Look>(newState, date, "look");
      newState[date.getFullYear()][date.getMonth()][date.getDate()].look.push({
        ...lookInfo,
      });
    });

    return newState;
  });
