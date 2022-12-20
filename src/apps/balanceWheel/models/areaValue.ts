import { createEffect, createStore } from "effector";
import { AreaValue } from "BW_types";

// Effects & Events
export const fetchAreaValuesFx = createEffect<number | void, AreaValue[]>((wheelId) => fetch(
  `/api/balancewheel/areavalue/${wheelId}`, {
    method: "GET",
    body: null,
    headers: {},
  })
  .then(req => req.json())
);

// Stores
export const $areaValues = createStore<AreaValue[]>([]).on(
  fetchAreaValuesFx.doneData, (state, res) => res
);
