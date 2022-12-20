import { createEffect, createStore } from "effector";
import { Area } from "BW_types";

// Effects & Events
export const fetchAreasFx = createEffect<void, Area[]>(() => fetch(
  "/api/balancewheel/area/", {
    method: "GET",
    body: null,
    headers: {},
  })
  .then(req => req.json())
);

// Stores
export const $areas = createStore<Area[]>([]).on(
  fetchAreasFx.doneData, (state, result) => result,
);

// TODO: вынести АПИ в константы
