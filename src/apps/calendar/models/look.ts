import { createEffect, createStore } from "effector";

import { API_FETCH_LOOKS } from "CR_api/look";
import { CalendarLook } from "CR_types/stores";

// Effects
export const fetchLooksFx = createEffect<void, CalendarLook[]>(async () => {
  const looks = await API_FETCH_LOOKS();
  return looks.map((look) => ({
    ...look,
    date: new Date(look.date),
  }));
});

// Stores
export const $calendarLooks = createStore<CalendarLook[]>([]).on(
  fetchLooksFx.doneData,
  (_, looks) => looks,
);
