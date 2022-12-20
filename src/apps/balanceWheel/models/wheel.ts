import { createEffect, createEvent, createStore } from 'effector';
import { Wheel } from "BW_types";

// Effects & Events
export const fetchWheelsFx = createEffect<void, Wheel[]>(() => fetch(
  "/api/balancewheel/wheel/",
  {
    method: "GET",
    body: null,
    headers: {},
  })
  .then(req => req.json())
);

export const updateCurrentWheel = createEvent<Wheel>();

// Stores
export const $wheels = createStore<Wheel[]>([]).on(
  fetchWheelsFx.doneData, (_, result) => result,
);

export const $currentWheel = createStore<Wheel>({})
  .on(fetchWheelsFx.doneData, (_, wheels) => wheels[wheels.length - 1])
  .on(updateCurrentWheel, (_, wheel) => wheel);
