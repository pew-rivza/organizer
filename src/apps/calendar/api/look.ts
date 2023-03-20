import { LOOK_URL } from "CR_const/api";
import { CalendarLook } from "CR_types/stores";

export const API_FETCH_LOOKS = (): Promise<CalendarLook[]> =>
  fetch(LOOK_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_PUT_ON_LOOK = (
  date: Date,
  lookId: number,
): Promise<CalendarLook> =>
  fetch(LOOK_URL, {
    method: "POST",
    body: JSON.stringify({ date, lookId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_DELETE_LOOK = (date: Date): Promise<void> =>
  fetch(LOOK_URL, {
    method: "DELETE",
    body: JSON.stringify({ date }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
