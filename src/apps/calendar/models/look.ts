import { createEffect, createStore } from "effector";

import { API_FETCH_LOOKS } from "CR_api/look";
import { Look } from "CR_types/stores";

// Effects
export const fetchLooksFx = createEffect<void, Look[]>(async () => {
  const looks = await API_FETCH_LOOKS();
  return looks.map((look) => ({
    ...look,
    date: new Date(look.date),
  }));
});

// Stores
export const $looks = createStore<Look[]>([]).on(
  fetchLooksFx.doneData,
  (_, looks) => looks,
);
