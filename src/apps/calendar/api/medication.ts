import { Todo } from "BW_types/stores";

import { MEDICATION_URL } from "CR_const/api";
import { TimesOfDayNominative } from "CR_types/other";
import { CheckedMedications } from "CR_types/stores";

export const API_FETCH_CHECKED_MEDICATIONS = (): Promise<
  CheckedMedications[]
> =>
  fetch(MEDICATION_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_CHECK_MEDICATION = (
  date: Date,
  timesOfDay: TimesOfDayNominative,
  medicationId: number,
): Promise<Todo> =>
  fetch(MEDICATION_URL, {
    method: "POST",
    body: JSON.stringify({ date, timesOfDay, medicationId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_UNCHECK_MEDICATION = (id: number): Promise<void> =>
  fetch(MEDICATION_URL, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
